import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ImageBackground,
} from 'react-native';
import PageHead from '../PageHead.js';
import Menu from '../Menu.js';
import { NavigationActions } from 'react-navigation';

var Entities = require('html-entities').XmlEntities;

import categoryConfig from './../../../config/categories.js';

export default class Project extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            data: {},
            project: props.content.project,
            category: props.content.category,
        };
    }
    static navigationOptions = {
        header: null,
    };
    componentWillReceiveProps(props) {
        this.setState({
            data: {},
            project: props.content.project,
            category: props.content.category,
        });
    }
    componentDidMount() {
        // this.project();
    }
    categoryProjects() {
        var catProjects = [];
        var allProjects = global.apiController.ldata.projects;
        for (var pKey in allProjects) {
            if (!allProjects.hasOwnProperty(pKey)) continue;
            if (
                allProjects[pKey].categories.indexOf(this.state.category) === -1
            )
                continue;

            catProjects.push(allProjects[pKey].id);
        }
        return catProjects;
    }
    currentProjIndex() {
        var aProjects = this.categoryProjects();
        var currentIndex = null;

        for (var i = 0; i < aProjects.length; i++) {
            if (aProjects[i] == this.state.project) {
                currentIndex = i;
                break;
            }
        }

        return currentIndex;
    }
    nextProjIndex() {
        var aProjects = this.categoryProjects();
        var current = this.currentProjIndex();

        var next = current + 1;
        if (next >= aProjects.length) next = 0;

        return next;
    }
    prevProjIndex() {
        var aProjects = this.categoryProjects();
        var current = this.currentProjIndex();

        var next = current - 1;
        if (next - 1 < 0) next = aProjects.length - 1;

        return next;
    }
    convertUnicode(input) {
        var entities = new Entities();
        return entities.decode(input);
    }

    render() {
        var projectData = {};
        var fields = [
            // "slug",
            'title',
            'id',
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
            if (allProjects[pKey].id != this.state.project) continue;

            projectData = allProjects[pKey];
        }

        var infoComponents = [];
        var servicesComponents = [];
        var highlightComponents = [];
        var data = projectData;
        var info_component = null;
        var services_component = null;
        var highlight_component = null;

        if (data.project_details_project_client) {
            infoComponents.push(
                <View key="client" style={styles.listItem}>
                    <Text style={styles.header}>Client</Text>
                    <Text>{data.project_details_project_client}</Text>
                </View>
            );
        }

        if (data.project_details_project_location) {
            infoComponents.push(
                <View key="location" style={styles.listItem}>
                    <Text style={styles.header}>Location</Text>
                    <Text>{data.project_details_project_location}</Text>
                </View>
            );
        }

        if (infoComponents.length > 0) {
            info_component = (
                <View key="info_component_section" style={styles.section}>
                    {infoComponents}
                </View>
            );
        }

        if (data.services) {
            servicesComponents.push(
                <View key="services_title">
                    <Text style={styles.header}>Services</Text>
                </View>
            );
            servicesComponents.push(
                <View key="services_description">
                    <Text>{data.project_details_project_services}</Text>
                </View>
            );
            services_component = (
                <View key="services_section" style={styles.section}>
                    {servicesComponents}
                </View>
            );
        }

        if (data.project_highlights_0_project_highlight) {
            highlightComponents.push(
                <View key="hightlights_title">
                    <Text style={styles.header}>Project Highlights</Text>
                </View>
            );
            for (var i = 0; i < 9; i++) {
                if (data['project_highlights_' + i + '_project_highlight']) {
                    highlightComponents.push(
                        <View key={i} class={styles.highlights_section}>
                            <Text>
                                {
                                    data[
                                        'project_highlights_' +
                                            i +
                                            '_project_highlight'
                                    ]
                                }
                                )
                            </Text>
                        </View>
                    );
                }
            }
            highlight_component = (
                <View key="project_hightlights_section" style={styles.section}>
                    {highlightComponents}
                </View>
            );
        }

        // return null;
        // if (!categoryConfig[this.props.content.top_category]) {
        // }

        var categoryImages = {
            icon: categoryConfig[this.props.content.top_category]
                ? categoryConfig[this.props.content.top_category].config_icon
                : '',
            background: categoryConfig[this.props.content.top_category]
                ? categoryConfig[this.props.content.top_category]
                      .config_background
                : '',
        };

        return (
            <View
                style={
                    global.orientation === 'landscape'
                        ? styles.lcontainer
                        : styles.container
                }
            >
                <View>
                    <PageHead
                        height="250"
                        images={categoryImages}
                        title={this.convertUnicode(data.title.rendered)}
                        section={this.props.content.section}
                    />
                </View>

                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.overviewContainer}
                    >
                        <View>
                            <Text style={styles.clientTitle}>
                                {data.project_details_project_client}
                            </Text>
                        </View>
                        {info_component}
                        {services_component}
                        {highlight_component}
                    </ScrollView>
                    <View style={styles.controls}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    var nextProject = this.categoryProjects()[
                                        this.prevProjIndex()
                                    ];
                                    var nextProps = { ...this.props.content };
                                    nextProps.project = nextProject;

                                    this.props.master.navigation.navigate({
                                        routeName: 'ProjectViewer',
                                        params: nextProps,
                                        key: 'project_' + nextProject,
                                    });
                                }}
                                style={styles.controls_control}
                            >
                                <Text style={styles.controls_control_text}>
                                    {'< Prev'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    var nextProject = this.categoryProjects()[
                                        this.nextProjIndex()
                                    ];
                                    var nextProps = { ...this.props.content };
                                    nextProps.project = nextProject;

                                    this.props.master.navigation.navigate({
                                        routeName: 'ProjectViewer',
                                        params: nextProps,
                                        key: 'project_' + nextProject,
                                    });
                                }}
                                style={styles.controls_control}
                            >
                                <Text style={styles.controls_control_text}>
                                    {'Next >'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.menu}>
                    <Menu
                        icon={this.props.content.images.icon}
                        menu={this.props.menu}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lcontainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    overviewContainer: {
        padding: 20,
    },
    clientTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 15,
    },
    header: {
        fontWeight: '600',
        fontSize: 16,
        marginRight: 20,
    },
    subSectionTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        padding: 20,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    subSectionList: {
        marginBottom: 75,
    },
    subSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        paddingBottom: 10,
    },
    section: {
        flex: 1,
        flexShrink: 0,
        fontSize: 16,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    highlights_section: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
    },
    subImageContainer: {
        height: '80%',
        width: '100%',
    },
    subImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    subImageTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15,
        fontWeight: '500',
    },
    menu: {
        height: 60,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    controls: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 60,
        display: 'flex',
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controls_control: {
        // marginRight: 10,// marginLeft: 10,
    },
    controls_control_text: {
        fontSize: 16,
    },
});
