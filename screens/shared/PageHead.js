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

export default class PageHead extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        var image_component = null;
        var view_height = this.props.height ? this.props.height * 1 : 200;

        if (global.orientation === 'landscape') {
            view_height = '100%';
            styles.iconImage = styles.liconImage;
            styles.iconContainer = styles.liconContainer;
            styles.content = styles.lcontent;
            styles.icon = styles.licon;
            styles.sunriseContainer = styles.lsunriseContainer;
            styles.sunriseImage = styles.lsunriseImage;
        }

        if (this.props.images.featured_image) {
            image_component = (
                <ImageBackground
                    source={{ uri: this.props.images.featured_image }}
                    style={
                        global.orientation === 'landscape'
                            ? styles.limage
                            : { width: '100%', height: '100%' }
                    }
                    resizeMode="cover"
                >
                    <View
                        style={
                            global.orientation === 'landscape'
                                ? styles.lcontainer
                                : styles.container
                        }
                    >
                        <View style={styles.sunriseContainer}>
                            <Image
                                style={styles.sunriseImage}
                                source={require('../../images/sunrise_logo.png')}
                            />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.icon}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        style={styles.iconImage}
                                        source={this.props.images.icon}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.headText}>
                                        {this.props.section}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.sectionText}>
                                        {this.props.title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        } else {
            image_component = (
                <ImageBackground
                    source={this.props.images.background}
                    style={
                        global.orientation === 'landscape'
                            ? styles.limage
                            : { width: '100%', height: '100%' }
                    }
                >
                    <View
                        style={
                            global.orientation === 'landscape'
                                ? styles.lcontainer
                                : styles.container
                        }
                    >
                        <View style={styles.sunriseContainer}>
                            <Image
                                style={styles.sunriseImage}
                                source={require('../../images/sunrise_logo.png')}
                            />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.icon}>
                                <View style={styles.iconContainer}>
                                    <Image
                                        style={styles.iconImage}
                                        source={this.props.images.icon}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.headText}>
                                        {this.props.title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

        return (
            <View
                style={
                    (global.orientation === 'landcape' ? lshell : {},
                    { height: view_height })
                }
            >
                {image_component}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lshell: {
        width: 500,
    },
    container: {
        flex: 1,
        padding: 25,
        paddingTop: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: 200,
    },
    lcontainer: {
        display: 'flex',
        flexGrow: 1,
        width: 500,
        flex: 1,
        padding: 25,
        paddingTop: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '100%',
    },
    limage: {
        width: 500,
        height: '100%',
    },
    contentContainer: {
        height: 150,
    },
    head: {
        width: '100%',
    },
    sunriseContainer: {
        width: '30%',
        height: 50,
    },
    lsunriseContainer: {
        width: '30%',
        height: 150,
    },
    content: {
        width: '100%',
    },
    lcontent: {
        paddingTop: 200,
        flexGrow: 1,
        alignSelf: 'center',
        width: '100%',
    },
    headText: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        paddingTop: 10,
        fontWeight: '600',
    },
    sectionText: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        fontWeight: '400',
        borderColor: 'white',
        borderBottomWidth: 1,
    },
    sunriseImage: {
        // flex: 1,
        width: null,
        height: 20,
        resizeMode: 'contain',
    },
    lsunriseImage: {
        // flex: 1,
        width: null,
        height: 125,
        resizeMode: 'contain',
    },
    icon: {
        paddingTop: 5,
        paddingBottom: 20,
        width: '100%',
    },
    licon: {
        paddingTop: 150,
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 20,
        width: '100%',
    },
    iconContainer: {
        width: '100%',
        height: 50,
    },
    iconImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    liconContainer: {
        alignSelf: 'center',
        width: '100%',
        height: 100,
    },
    liconImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
});
