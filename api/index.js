import { AsyncStorage, NetInfo } from 'react-native';
import { FileSystem } from 'expo';

import addCats from './../config/add_categories.js';

const apiConfig = {
    media: 'https://sunrise-eng.com/wp-json/wp/v2/media',
    categories: 'https://sunrise-eng.com/wp-json/wp/v2/categories',
    projects: 'https://sunrise-eng.com/wp-json/wp/v2/projects',
    // posts: 'https://sunrise-eng.com/wp-json/wp/v2/posts',
};

const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

class Api {
    constructor(context) {
        this.context = context;
    }
    sleepInc: 100;
    fetched: false;
    status = 'Checking Network';
    ready = false;
    config = apiConfig;
    did = {};
    data = {};
    connected = false;
    ldata = false;
    maxProgress = 0;
    setLocalData = async ready => {
        this.statusChange('Retrieving local data...');
        var localData = await AsyncStorage.getItem('localData');
        if (localData) {
            localData = JSON.parse(localData);
            this.statusChange('Done!');

            this.ldata = localData;
            if (ready) this.setReady();
        }

        return localData;
    };
    saveAllMedia = async () => {
        if (!this.data || !this.data.media) {
            this.context.setState({
                failed: true
            });
            return false;
        }

        this.statusChange('Preparing file system...');
        var directoryString = FileSystem.documentDirectory + '/media';

        try {
            await FileSystem.deleteAsync(directoryString, { idempotent: true });
        } catch (e) {}

        var directoryExists = true;
        try {
            await FileSystem.readDirectoryAsync(directoryString);
        } catch (e) {
            if (e) directoryExists = false;
        }

        if (!directoryExists) {
            await FileSystem.makeDirectoryAsync(directoryString, {
                intermediates: true,
            });
        }

        this.maxProgress = (this.data.media.length + 50);
        this.context.setState({
            progress: (50 / this.maxProgress)
        });

        // Create promise array to retrieve all images
        var promises = this.data.media.map(async (item, index) => {
            if (typeof this.sleepInc === 'undefined') this.sleepInc = 0;

            // Wait a random amount of time before moving to the next image - need to prevent server from imploding (it's pretty small)
            var incThis = Math.floor(Math.random() * (350 - 50 + 1)) + 50;

            this.sleepInc += incThis;
            var mySleep = this.sleepInc;
            await sleep(mySleep);

            // Update progress in interface component - progress bar
            this.context.setState({
                progress: ((index + 50) / this.maxProgress)
            });

            // # Remove this for now - shows the name of the image being downloaded
            // if (
            //     this.data.media[index].title &&
            //     this.data.media[index].title.rendered
            // ) {
            //     this.statusChange(
            //         'Downloading media image: ' +
            //             this.data.media[index].title.rendered
            //     );
            // } else if (this.data.media[index].slug) {
            //     this.statusChange(
            //         'Downloading media image: ' + this.data.media[index].slug
            //     );
            // } else {
            //     this.statusChange('Downloading media images...');
            // }

            var useUrl = this.data.media[index].source_url;
            if (
                this.data.media[index].media_details &&
                this.data.media[index].media_details.sizes
            ) {
                if (this.data.media[index].media_details.sizes.medium_large) {
                    useUrl = this.data.media[index].media_details.sizes
                        .medium_large.source_url;
                } else if (this.data.media[index].media_details.sizes.medium) {
                    useUrl = this.data.media[index].media_details.sizes.medium
                        .source_url;
                } else if (this.data.media[index].media_details.sizes.large) {
                    useUrl = this.data.media[index].media_details.sizes.large
                        .source_url;
                }
            }
            var res = await this.saveMediaToLocal(useUrl);
            if (typeof res !== 'undefined' && res) {
                if (res.status == 200) {
                    this.data.media[index]['local_uri'] = res.uri;
                } else if (res) {
                    // console.log('failed res', res);
                    this.failed = true;
                    this.context.setState({
                        failed: 1,
                    });
                }
                return res;
            } else {
                this.failed = true;
                this.context.setState({
                    failed: 1,
                });
            }
            return null;
        });

        this.statusChange('Downloading media images...');
        await Promise.all(promises);
    };
    saveMediaToLocal = async url => {
        var directoryString = FileSystem.documentDirectory + '/media';

        var safeUrl = url.replace(/[^\w.]+/g, '_').toLowerCase();
        var res;
        try {
            res = await FileSystem.downloadAsync(
                url,
                directoryString + '/' + safeUrl
            );
        } catch (e) {
            // this.context.setState({
            //     failed: 1,
            // });
        }

        return res;
    };
    fetchAll = async () => {
        this.ready = false;
        this.context.setState(
            {
                data_finished: false,
                progress: 0,
            },
            () => {
                this.context.setState({
                    failed: 0,
                });
            }
        );
        this.fetched = true;
        NetInfo.addEventListener(
            'connectionChange',
            this.networkUpdate.bind(this)
        );

        await this.networkUpdate();
        await this.setLocalData();

        // If no internet just say we are ready
        if (
            !this.connected ||
            (this.ldata &&
                Object.keys(this.ldata).length &&
                this.ldata.categories)
        ) {
            this.setReady();
        } else {
            this.retrieveNewData();
        }
    };
    retrieveNewData = async () => {
        await AsyncStorage.removeItem('localData');
        this.data = {};
        this.did = {};
        this.ldata = false;
        this.sleepInc = 0;

        this.statusChange('Retrieving API data...');
        await this.setUnready();

        // Grab all the new stuff if we have internet
        for (var cKey in this.config) {
            if (!this.config.hasOwnProperty(cKey)) continue;
            this.fetchSpecific(cKey);
        }
    };
    fetchSpecific = async (key, page) => {
        page = page || 1;
        this.failed = false;

        fetch(
            'https://sunrise-eng.com/wp-json/wp/v2/' +
                key +
                '?per_page=100&page=' +
                page
        ).then(res => {
            if (res.status == 200 || res.status == 400) {
                res.json().then(data => {
                    if (!this.data[key]) this.data[key] = [];

                    for (var i = 0; i < data.length; i++) {
                        this.data[key].push(data[i]);
                    }

                    if (data.length) {
                        this.fetchSpecific(key, page + 1);
                    } else {
                        this.did[key] = 1;
                    }

                    var done = true;
                    for (var cKey in this.config) {
                        if (!this.config.hasOwnProperty(cKey)) continue;
                        if (!this.did[cKey]) done = false;
                    }

                    if (done) {
                        // Add custom categories
                        for (var i = 0; i < addCats.length; i++) {
                            this.data.categories.push(addCats[i]);
                        }

                        this.saveAllMedia().then(() => {
                            if (this.failed) {
                                this.context.setState({
                                    failed: 1,
                                });
                                return false;
                            }
                            this.statusChange('Setting data on device...');
                            AsyncStorage.setItem(
                                'localData',
                                JSON.stringify(this.data)
                            ).then(() => {
                                this.setLocalData(true);
                            });
                        });
                    }
                });
            } else {
                this.context.setState({
                    failed: 1,
                });
            }
        });
    };
    setReady() {
        this.ready = true;
        this.context.setState({
            data_finished: true,
            progress: 1,
        });
    }
    setUnready = async () => {
        this.ready = false;
        await this.context.setState({
            data_finished: false,
            progress: 0,
        });
    };
    statusChange(state) {
        this.status = state;
        this.context.setState({
            apiStatus: state,
        });
    }
    networkUpdate = async () => {
        var isConnected = await NetInfo.isConnected.fetch();
        this.connected = isConnected;
        this.context.setState({
            network_version: this.context.state.network_version + 1,
        });
    };
}

export default Api;
