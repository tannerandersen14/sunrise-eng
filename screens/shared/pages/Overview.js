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
import PageHead from '../PageHead.js';
import Menu from '../Menu.js';

import overview from './../../../config/overviews.js';
import imageMatcher from './../../../config/image_matcher.js';

export default class Overview extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        console.log('my props', this.props);
        var overviewItem = overview[this.props.content.category];
        if (
            !overviewItem &&
            imageMatcher &&
            imageMatcher[this.props.content.category] &&
            imageMatcher[this.props.content.category].overview
        ) {
            overviewItem =
                imageMatcher[this.props.content.category].overview.description;
        }
        return (
            <View
                style={
                    global.orientation === 'landscape'
                        ? styles.lcontainer
                        : styles.container
                }
            >
                {!this.props.inline ? (
                    <View>
                        <PageHead
                            images={this.props.content.images}
                            title={this.props.content.title}
                        />
                    </View>
                ) : null}
                {overviewItem ? (
                    <ScrollView
                        style={
                            this.props.content.type == 'projects'
                                ? styles.pSubcontainer
                                : styles.subcontainer
                        }
                    >
                        {this.props.content.type == 'projects' ? null : (
                            <Text style={styles.subSectionTitle}>Overview</Text>
                        )}
                        <Text style={styles.overviewText}>{overviewItem}</Text>
                    </ScrollView>
                ) : null}
                {!this.props.inline ? (
                    <View style={styles.menu}>
                        <Menu
                            icon={this.props.content.images.icon}
                            master={this.props.master}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lcontainer: {
        flex: 1,
        flexDirection: 'row',
    },
    pSubcontainer: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
    },
    subcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
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
        fontSize: 24,
        padding: 20,
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
        height: 75,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    overviewText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
