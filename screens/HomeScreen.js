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
} from 'react-native';
import { WebBrowser } from 'expo';

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
                                                        // {
                                                        //     title: 'Firm Stats',
                                                        //     subtitle:
                                                        //         'Firm Stats Subsection',
                                                        //     category: 11,
                                                        //     icon: require('../images/firm_stats.png'),
                                                        //     background: require('../images/head_background.png'),
                                                        //     config_icon: require('../images/natural_gas_icon.png'),
                                                        //     config_background: require('../images/head_background.png'),
                                                        // }
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
                                    {global.apiController.connected ? (
                                        <View
                                            style={
                                                global.orientation ===
                                                'landscape'
                                                    ? styles.lmenuContainer
                                                    : styles.refreshMenuContainer
                                            }
                                        >
                                            <TouchableHighlight
                                                style={
                                                    global.orientation ===
                                                    'landcape'
                                                        ? styles.lmenuContainerHighlight
                                                        : styles.refreshMenuContainerHighlight
                                                }
                                                onPress={() => {
                                                    global.apiController.retrieveNewData();
                                                }}
                                            >
                                                <View
                                                    style={
                                                        global.orientation ===
                                                        'landcape'
                                                            ? styles.lRefreshItem
                                                            : styles.refreshItem
                                                    }
                                                >
                                                    <Image
                                                        style={[
                                                            global.orientation ===
                                                            'landscape'
                                                                ? styles.lmenuRefreshImage
                                                                : styles.menuRefreshImage,
                                                        ]}
                                                        source={require('../images/refresh_content.png')}
                                                    />
                                                    <Text
                                                        style={
                                                            global.orientation ===
                                                            'landcape'
                                                                ? styles.lRefreshItemText
                                                                : styles.refreshItemText
                                                        }
                                                    >
                                                        REFRESH CONTENT
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
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
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        // paddingBottom: 90,
        // alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.2)',
        // justifyContent: 'center',
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
        // paddingBottom: 10,
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
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 30,
        width: '100%',
        marginTop: 4,
        maxWidth: 400,
        alignSelf: 'center',

        // marginBottom: '1%',
    },
    lmenuContainerHighlight: {
        height: 200,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    menuImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'contain',
    },
    lmenuImage: {
        // flex: 1,
        // flexShrink: 0,
        alignSelf: 'center',
        margin: 'auto',
        width: '70%',
        maxWidth: 400,
        resizeMode: 'contain',
        // marginBottom: 10,
    },
    menuRefreshImage: {
        // width: '20%',
        width: 30,
        height: 30,
        // width: 52,
        // height: 52,
        resizeMode: 'contain',
    },
    lmenuRefreshImage: {
        height: 35,
        width: 35,
        marginRight: 0,
        alignSelf: 'center',
        // width: 52,
        // height: 52,
        resizeMode: 'contain',
    },
    refreshItem: {
        alignSelf: 'center',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    lRefreshItem: {
        // marginBottom: 10,
        alignSelf: 'center',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    refreshItemText: {
        // flex: 1,
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
