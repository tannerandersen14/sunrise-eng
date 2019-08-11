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
    TouchableHighlight,
    Alert,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import categoriesConfig from '../config/categories.js';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <ImageBackground
                        source={require('../images/sunrise_home_photo.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        {global.orientation === 'landscape' ? (
                            <View style={styles.ltop}>
                                <View style={styles.lsunriseContainer}>
                                    <Image
                                        style={styles.sunriseImage}
                                        source={require('../images/sunrise_logo.png')}
                                    />
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.bottom}>
                            {global.orientation === 'landscape' ? (
                                <View style={styles.linnerContent}>
                                    <View style={styles.topContainer}>
                                        <View style={styles.lvirtualContainer}>
                                            <Image
                                                style={styles.lvirtualImage}
                                                source={require('../images/virtual_toolbox.png')}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ) : null}
                            <View
                                style={
                                    global.orientation === 'landscape'
                                        ? styles.linnerContent
                                        : styles.innerContent
                                }
                            >
                                {global.orientation === 'portrait' ? (
                                    <View style={styles.topContainer}>
                                        <View style={styles.sunriseContainer}>
                                            <Image
                                                style={styles.sunriseImage}
                                                source={require('../images/sunrise_logo.png')}
                                            />
                                        </View>
                                        <View style={styles.virtualContainer}>
                                            <Image
                                                style={styles.virtualImage}
                                                source={require('../images/virtual_toolbox.png')}
                                            />
                                        </View>
                                    </View>
                                ) : null}
                                <View style={styles.menuHome}>
                                    <View
                                        style={
                                            global.orientation === 'landscape'
                                                ? styles.lmenuContainer
                                                : styles.menuContainer
                                        }
                                    >
                                        <TouchableHighlight
                                            style={
                                                global.orientation ===
                                                'landcape'
                                                    ? styles.lmenuContainerHighlight
                                                    : styles.menuContainerHighlight
                                            }
                                            onPress={() => {
                                                if (
                                                    !global.apiController.ldata
                                                        .categories
                                                )
                                                    return false;
                                                this.props.navigation.navigate(
                                                    'Main',
                                                    categoriesConfig[9]
                                                );
                                            }}
                                        >
                                            <Image
                                                style={
                                                    global.orientation ===
                                                    'landscape'
                                                        ? styles.lmenuImage
                                                        : styles.menuImage
                                                }
                                                source={require('../images/natural_gas.png')}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View
                                        style={
                                            global.orientation === 'landscape'
                                                ? styles.lmenuContainer
                                                : styles.menuContainer
                                        }
                                    >
                                        <TouchableHighlight
                                            style={
                                                global.orientation ===
                                                'landcape'
                                                    ? styles.lmenuContainerHighlight
                                                    : styles.menuContainerHighlight
                                            }
                                            onPress={() => {
                                                if (
                                                    !global.apiController.ldata
                                                        .categories
                                                )
                                                    return false;
                                                this.props.navigation.navigate(
                                                    'Main',
                                                    categoriesConfig[11]
                                                );
                                            }}
                                        >
                                            <Image
                                                style={
                                                    global.orientation ===
                                                    'landscape'
                                                        ? styles.lmenuImage
                                                        : styles.menuImage
                                                }
                                                source={require('../images/engineering.png')}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View
                                        style={
                                            global.orientation === 'landscape'
                                                ? styles.lmenuContainer
                                                : styles.menuContainer
                                        }
                                    >
                                        <TouchableHighlight
                                            style={
                                                global.orientation ===
                                                'landcape'
                                                    ? styles.lmenuContainerHighlight
                                                    : styles.menuContainerHighlight
                                            }
                                            onPress={() => {
                                                if (
                                                    !global.apiController.ldata
                                                        .categories
                                                )
                                                    return false;
                                                this.props.navigation.navigate(
                                                    'Main',
                                                    categoriesConfig[12]
                                                );
                                            }}
                                        >
                                            <Image
                                                style={
                                                    global.orientation ===
                                                    'landscape'
                                                        ? styles.lmenuImage
                                                        : styles.menuImage
                                                }
                                                source={require('../images/survey.png')}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View
                                        style={
                                            global.orientation === 'landscape'
                                                ? styles.lmenuContainer
                                                : styles.menuContainer
                                        }
                                    >
                                        <TouchableHighlight
                                            style={
                                                global.orientation ===
                                                'landcape'
                                                    ? styles.lmenuContainerHighlight
                                                    : styles.menuContainerHighlight
                                            }
                                            onPress={() => {
                                                if (
                                                    !global.apiController.ldata
                                                        .categories
                                                )
                                                    return false;
                                                this.props.navigation.navigate(
                                                    'Main',
                                                    categoriesConfig[13]
                                                );
                                            }}
                                        >
                                            <Image
                                                style={
                                                    global.orientation ===
                                                    'landscape'
                                                        ? styles.lmenuImage
                                                        : styles.menuImage
                                                }
                                                source={require('../images/cloud_smart.png')}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View
                                        style={
                                            global.orientation === 'landscape'
                                                ? styles.lmenuContainer
                                                : styles.menuContainer
                                        }
                                    >
                                        <TouchableHighlight
                                            style={
                                                global.orientation ===
                                                'landcape'
                                                    ? styles.lmenuContainerHighlight
                                                    : styles.menuContainerHighlight
                                            }
                                            onPress={() => {
                                                if (
                                                    !global.apiController.ldata
                                                        .categories
                                                )
                                                    return false;
                                                this.props.navigation.navigate(
                                                    'Main',
                                                    categoriesConfig[14]
                                                );
                                            }}
                                        >
                                            <Image
                                                style={
                                                    global.orientation ===
                                                    'landscape'
                                                        ? styles.lmenuImage
                                                        : styles.menuImage
                                                }
                                                source={require('../images/building_code.png')}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    {true ? (
                                        <View
                                            style={
                                                global.orientation ===
                                                'landscape'
                                                    ? styles.lmenuContainer
                                                    : styles.menuContainer
                                            }
                                        >
                                            <TouchableHighlight
                                                style={
                                                    global.orientation ===
                                                    'landcape'
                                                        ? styles.lmenuContainerHighlight
                                                        : styles.menuContainerHighlight
                                                }
                                                onPress={() =>
                                                    this.props.navigation.navigate(
                                                        'FirmStats',
                                                        categoriesConfig[
                                                            'firmstats'
                                                        ]
                                                    )
                                                }
                                            >
                                                <Image
                                                    style={
                                                        global.orientation ===
                                                        'landscape'
                                                            ? styles.lmenuImage
                                                            : styles.menuImage
                                                    }
                                                    source={require('../images/firm_stats.png')}
                                                />
                                            </TouchableHighlight>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <View style={styles.versionContainer}>
                            <TouchableHighlight
                                style={styles.refreshMenuContainerHighlight}
                                onPress={() => {
                                    // Works on both iOS and Android
                                    Alert.alert(
                                        'Are you sure?',
                                        'Refreshing content will take several minutes.',
                                        [
                                            {
                                                text: 'Confirm',
                                                onPress: () => {
                                                    global.apiController.retrieveNewData();
                                                },
                                            },
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                        ],
                                        { cancelable: true }
                                    );
                                }}
                            >
                                <View style={styles.refreshItem}>
                                    <Image
                                        style={[
                                            global.orientation === 'landscape'
                                                ? styles.lmenuRefreshImage
                                                : styles.menuRefreshImage,
                                        ]}
                                        source={require('../images/refresh_content.png')}
                                    />
                                </View>
                            </TouchableHighlight>
                            <Text style={styles.versionContainerText}>
                                Version 1.0.9
                            </Text>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    versionContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 15,
    },
    versionContainerText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
        color: '#fff',
    },
    ltop: {
        display: 'flex',
        width: '100%',
        height: 150,
        paddingTop: 90,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
    },
    innerContent: {
        flex: 1,
        paddingBottom: 60,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
    },
    linnerContent: {
        flex: 1,
        paddingBottom: 150,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sunriseContainer: {
        height: '50%',
        width: '50%',
    },
    lsunriseContainer: {
        height: '100%',
        width: '100%',
    },
    sunriseImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    virtualContainer: {
        marginLeft: 50,
        height: 100,
        width: 100,
    },
    virtualImage: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    lvirtualContainer: {
        marginLeft: 50,
        height: 250,
        width: 250,
    },
    lvirtualImage: {
        flex: 1,
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    refreshButton: {
        margin: 'auto',
        alignSelf: 'center',
    },
    refreshButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    menuHome: {
        width: '90%',
        marginTop: '3%',
    },
    menuContainer: {
        width: '100%',
    },
    refreshMenuContainer: {
        width: '100%',
        display: 'flex',
    },
    lmenuContainer: {
        width: '100%',
        marginBottom: 10,
    },
    menuContainerHighlight: {
        height: 50,
        width: '100%',
        marginTop: 0,
        marginBottom: 10,
    },
    refreshMenuContainerHighlight: {
        position: 'absolute',
        bottom: 20,
        right: 25,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 40,
        width: 40,
        alignSelf: 'center',
    },
    menuImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'contain',
    },
    lmenuImage: {
        alignSelf: 'center',
        margin: 'auto',
        width: '70%',
        maxWidth: 400,
        resizeMode: 'contain',
    },
    menuRefreshImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    lmenuRefreshImage: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
    },
    refreshItem: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    refreshItemText: {
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 14,
        color: '#fff',
    },
    lRefreshItemText: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 24,
        color: '#fff',
    },
});
