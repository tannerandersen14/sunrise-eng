import { AsyncStorage, NetInfo } from 'react-native';
import { FileSystem } from 'expo';

const apiConfig = {
    media: 'https://sunrise-eng.com/wp-json/wp/v2/media',
    categories: 'https://sunrise-eng.com/wp-json/wp/v2/categories',
    projects: 'https://sunrise-eng.com/wp-json/wp/v2/projects',
    posts: 'https://sunrise-eng.com/wp-json/wp/v2/posts',
};

class Api {
    constructor(context) {
        this.context = context;
    }
    fetched: false;
    status = 'Checking Network';
    ready = false;
    config = apiConfig;
    did = {};
    data = {};
    connected = false;
    ldata = false;
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
        if (!this.data || !this.data.media) return false;
        var directoryString = FileSystem.documentDirectory + '/media';

        try {
            FileSystem.deleteAsync(directoryString);
        } catch (e) {}

        var directoryExists = true;
        try {
            await FileSystem.readDirectoryAsync(directoryString);
        } catch (e) {
            if (e) directoryExists = false;
        }

        if (!directoryExists) {
            await FileSystem.makeDirectoryAsync(directoryString);
        }

        // var promises = [];
        var promises = this.data.media.map(async (item, index) => {
            var res = await this.saveMediaToLocal(
                this.data.media[index].source_url
            );
            if (res.status == 200) {
                this.data.media[index]['local_uri'] = res.uri;
            } else {
                this.context.setState({
                    failed: 1,
                });
            }
            return res;
        });

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
            this.context.setState({
                failed: 1,
            });
        }

        return res;
    };
    fetchAll = async () => {
        this.ready = false;
        this.context.setState(
            {
                data_finished: false,
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
        this.statusChange('Retrieving API data...');

        this.setUnready();

        // Grab all the new stuff if we have internet
        for (var cKey in this.config) {
            if (!this.config.hasOwnProperty(cKey)) continue;
            this.fetchSpecific(cKey);
        }
    };
    fetchSpecific = async (key, page) => {
        page = page || 1;

        fetch(
            'https://sunrise-eng.com/wp-json/wp/v2/' +
                key +
                '?per_page=100&page=' +
                page
        ).then(res => {
            // console.log(res);
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
                        this.statusChange('Downloading media images...');

                        this.saveAllMedia().then(() => {
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
                console.log('this failed', res);
                this.context.setState({
                    failed: 1,
                });
            }
        });
    };
    setReady() {
        console.log('set ready');
        this.ready = true;
        this.context.setState({
            data_finished: true,
        });
    }
    setUnready() {
        this.ready = false;
        this.context.setState({
            data_finished: false,
        });
    }
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
