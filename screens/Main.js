import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import PageHead from './shared/PageHead.js';
import Overview from './shared/Overview.js';
import Sections from './children/Sections.js';
import Menu from './shared/Menu.js';

import imageMatcher from './../config/image_matcher.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            sub_catagories: {},
            loadComplete: false,
        };

        this.navProps = this.props.navigation.state.params;
        this.category = null;
        for (var i = 0; i < global.apiController.ldata.categories.length; i++) {
            if (
                global.apiController.ldata.categories[i].id ==
                this.navProps.category
            ) {
                this.category = global.apiController.ldata.categories[i];
                break;
            }
        }
    }
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.get_sub_catagories();
    }

    get_sub_catagories = () => {
        var subs = {};

        var allCategories = global.apiController.ldata.categories;

        for (var cKey in allCategories) {
            if (!allCategories.hasOwnProperty(cKey)) continue;
            if (allCategories[cKey].parent != this.navProps.category) continue;

            subs[allCategories[cKey].id] = {
                category: allCategories[cKey].id,
                title: allCategories[cKey].name,
                slug: allCategories[cKey].slug,
            };
        }

        this.setState({
            sub_catagories: subs,
        });
    };
    sub_category_rows = () => {
        var cats = this.state.sub_catagories;
        var cat_items = [
            {
                pic: require('../images/sunrise_logo_black.png'),
                top: 1,
                title: 'Overview',
                link: 'Overview',
                linkprops: {
                    category: this.navProps.category,
                    top_category: this.navProps.category,
                },
            },
        ];

        var image_matcher = imageMatcher;

        for (var pK in cats) {
            if (cats.hasOwnProperty(pK)) {
                var p = cats[pK];
                var p_image = require('../images/section_image.png');
                var p_title = p.title;

                if (image_matcher[p.category]) {
                    if (image_matcher[p.category].image)
                        p_image = image_matcher[p.category].image;
                    if (image_matcher[p.category].title)
                        p_title = image_matcher[p.category].title;
                }

                cat_items.push({
                    pic: p_image,
                    title: p_title,
                    link: 'Projects',
                    category: p.category,
                    top_category: this.navProps.category,
                });
            }
        }

        return cat_items;
    };

    render() {
        var sections = this.sub_category_rows();

        var images = {
            icon: this.navProps.icon,
            background: this.navProps.background,
        };
        var disable = {
            projects: true,
        };
        var config = {
            images: {
                icon: this.navProps.config_icon,
                background: this.navProps.config_background,
            },
            title: this.navProps.title,
            subSectionTitle: this.navProps.subtitle,
            sections: sections,
        };
        return (
            <View
                style={
                    global.orientation === 'landscape'
                        ? styles.lcontainer
                        : styles.container
                }
            >
                <Sections config={config} menu={disable} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
    },
    lcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
    },
});
