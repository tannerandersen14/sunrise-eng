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
    TouchableWithoutFeedback,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import PageHead from '../PageHead.js';
import Menu from '../Menu.js';

var Entities = require('html-entities').XmlEntities;

class SectionsPage extends React.Component {
    static navigationOptions = {
        header: null,
    };
    convertUnicode(input) {
        var entities = new Entities();
        return entities.decode(input);
    }

    render() {
        if (global.orientation === 'landscape') {
            // styles.subSectionList = styles.lsubSectionList;
            styles.subSection = styles.lsubSection;
            styles.subImage = styles.lsubImage;
        }

        var sections = this.props.content.sections.map((e, i) => {
            var imageComponent = null;
            if (e.images && e.images.featured_image) {
                imageComponent = (
                    <Image
                        style={styles.subImage}
                        source={{ uri: e.images.featured_image }}
                    />
                );
            } else if (e.top) {
                imageComponent = (
                    <Image style={styles.topImage} source={e.pic} />
                );
            } else {
                imageComponent = (
                    <Image style={styles.subImage} source={e.pic} />
                );
            }

            return (
                <TouchableWithoutFeedback
                    style={
                        global.orientation === 'landscape' ? styles.lsub : {}
                    }
                    key={i}
                    onPress={() => {
                        if (e.link === 'Projects') {
                            this.props.navigation.navigate('Projects', {
                                images: this.props.content.images,
                                title: this.props.content.title,
                                cat_title: e.title,
                                category: e.category,
                                top_category: e.top_category,
                            });
                        } else if (e.link === 'Project') {
                            var eProps = {};
                            if (e.linkprops) eProps = { ...e.linkprops };

                            eProps.images = e.images;
                            eProps.title = e.title;
                            eProps.project = e.project;
                            if (!eProps.top_category)
                                eProps.top_category = e.top_category;
                            eProps.section = e.section;

                            this.props.navigation.navigate({
                                routeName: 'ProjectViewer',
                                params: eProps,
                                key: 'project_' + e.project,
                            });
                        } else {
                            var eProps = {};
                            if (e.linkprops) eProps = { ...e.linkprops };

                            eProps.images = this.props.content.images;
                            eProps.title = this.props.content.title;

                            this.props.navigation.navigate(e.link, eProps);
                        }
                    }}
                >
                    <View key={i} style={styles.subSection}>
                        <View style={styles.subImageContainer}>
                            {imageComponent}
                        </View>
                        <Text style={styles.subImageTitle}>
                            {this.convertUnicode(e.title)}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        });

        return (
            <View style={styles.container}>
                <View
                    style={
                        global.orientation === 'landscape'
                            ? styles.lview
                            : styles.view
                    }
                >
                    <PageHead
                        images={this.props.content.images}
                        title={this.props.content.title}
                    />

                    <View
                        style={
                            global.orientation === 'landscape'
                                ? styles.lsections
                                : styles.sections
                        }
                    >
                        <View>
                            <Text style={styles.subSectionTitle}>
                                {this.convertUnicode(
                                    this.props.content.subSectionTitle
                                )}
                            </Text>
                        </View>
                        <ScrollView style={styles.subSectionList}>
                            {global.orientation === 'landscape' ? (
                                <View style={styles.lsubSectionList}>{sections}</View>
                            ) : (
                                sections
                            )}
                        </ScrollView>
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

export default withNavigation(SectionsPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lsections: {
        display: 'flex',
        flex: 1,
    },
    sections: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
    },
    view: {
        flex: 1,
    },
    lview: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 15,
    },
    subSectionTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        padding: 20,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    subSectionList: {
        // flex: 1,
        marginBottom: 75,
    },
    lsubSectionList: {
		width: '100%',
        flex: 1,
		flexShrink: 0,
        marginBottom: 75,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    subSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        flexGrow: 1,
        height: 200,
        paddingBottom: 20,
    },
    lsubSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        flexGrow: 0,
        height: 300,
		width: '33%',
        paddingBottom: 20,
    },
    subImageContainer: {
        height: '80%',
        width: '100%',
    },
    subImage: {
        maxWidth: '100%',
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        marginRight: 50,
        marginLeft: 50,
    },
    lsubImage: {
        maxWidth: '100%',
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        marginRight: 10,
        marginLeft: 10,
    },
    topImage: {
        maxWidth: '100%',
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        marginRight: 50,
        marginLeft: 50,
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
});
