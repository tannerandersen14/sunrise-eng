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
import SectionsPage from '../shared/pages/Sections.js';
import categoriesConfig from './../../config/categories.js';
export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        var component_props = this.props.navigation.state.params;
        this.state = {
            projects: {},
            category: component_props.category,
            loadProjects: false,
            loadComplete: false,
        };

        this.category = null;
        for (var i = 0; i < global.apiController.ldata.categories.length; i++) {
            if (
                global.apiController.ldata.categories[i].id ==
                component_props.category
            ) {
                this.category = global.apiController.ldata.categories[i];
                break;
            }
        }

        var useId = this.category.parent || this.category.id;
        this.topcatconfig = categoriesConfig[useId];
    }
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.projects();
    }

    projects() {
        var state_data = {};
        var fields = [
            // "slug",
            'title',
            'id',
            'featured_media',
            'project_details',
            'project_details_project_client',
            'project_details_project_location',
            'project_details_project_services',
            'project_header_image',
            'project_highlights',
            'project_highlights_0_project_highlight',
            'project_highlights_1_project_highlight',
            'project_highlights_2_project_highlight',
            'project_highlights_3_project_highlight',
            'project_highlights_4_project_highlight',
            'project_highlights_5_project_highlight',
            'project_highlights_6_project_highlight',
            'project_highlights_7_project_highlight',
            'project_highlights_8_project_highlight',
            'project_images',
            // "project_testimonials",
            // "slug"
        ];

        var allProjects = global.apiController.ldata.projects;
        for (var pKey in allProjects) {
            if (!allProjects.hasOwnProperty(pKey)) continue;
            if (
                allProjects[pKey].categories.indexOf(this.state.category) === -1
            )
                continue;

            var item = allProjects[pKey];
            var new_i = {
                featured_image: false,
            };
            var categories = allProjects[pKey].categories;
            for (var i = 0; i < fields.length; i++) {
                var k = fields[i];
                if (item[k]) new_i[k] = item[k];
            }
            state_data[allProjects[pKey].id] = new_i;
        }

        var nState_Data = state_data;
        state_data = [];

        for (var sKey in nState_Data) {
            if (!nState_Data.hasOwnProperty(sKey)) continue;

            state_data.push(nState_Data[sKey]);
        }

        state_data = state_data.reverse();

        this.setState({
            loadProjects: true,
            projects: state_data,
        });

        var mappedMedia = {};
        for (var i = 0; i < global.apiController.ldata.media.length; i++) {
            mappedMedia[global.apiController.ldata.media[i].id] =
                global.apiController.ldata.media[i];
        }

        for (var i = 0; i < state_data.length; i++) {
            var media = state_data[i].featured_media;
            state_data[i].featured_image = mappedMedia[media]
                ? mappedMedia[media].local_uri
                : false;
        }

        this.setState({
            projects: state_data,
        });

        return state_data;
    }

    project_rows = () => {
        var cats = this.state.projects;
        var cat_items = [
            // {
            //     title: 'Overview',
            //     images: {
            //         icon: require('../../images/natural_gas_icon.png'),
            //         background: require('../../images/head_background.png'),
            //         link: 'Overview',
            //         // featured_image: p.featured_image,
            //     },
            // },
        ];

        for (var i = 0; i < cats.length; i++) {
            var p = cats[i];
            if (p.featured_image) {
                cat_items.push({
                    images: {
                        icon: require('../../images/natural_gas_icon.png'),
                        background: require('../../images/head_background.png'),
                        featured_image: p.featured_image,
                    },
                    // title: this.props.navigation.state.params.cat_title,
                    title: p.title.rendered,
                    section: this.props.navigation.state.params.title,
                    project: cats[i].id,
                    link: 'Project',
                    linkprops: {
                        top_category: this.category.parent || this.category.id,
                        category: this.state.category,
                    },
                });
            }
        }

        return cat_items;
    };

    render() {
        var sections = this.project_rows();
        var component_props = this.props.navigation.state.params;
        var config = {
            images: {
                icon: this.topcatconfig.config_icon,
                background: this.topcatconfig.config_background,
            },
            title: component_props.title,
            list_title: this.category.name,
            subSectionTitle: this.category.name,
            sections: sections,
        };
        return <SectionsPage content={config} master={this.props} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overviewContainer: {
        padding: 25,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 15,
    },
    para: {
        fontSize: 16,
        marginBottom: 10,
    },
});
