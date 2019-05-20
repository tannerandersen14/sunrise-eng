import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ImageBackground,
} from 'react-native';
import Menu from './shared//Menu.js';
import PageHead from './/shared/PageHead.js';
import { NavigationActions } from 'react-navigation';

var Entities = require('html-entities').XmlEntities;

import firmConfig from './../config/firm.js';

export default class FirmStats extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
    };
    convertUnicode(input) {
        var entities = new Entities();
        return entities.decode(input);
    }

    render() {
        var locationEls = [];
        for (var i = 0; i < firmConfig.locations.length; i++) {
            locationEls.push(
                <View style={styles.locationItem}>
                    <Text
                        style={
                            global.orientation === 'landscape'
                                ? styles.llocationItemText
                                : styles.locationItemText
                        }
                    >
                        {'\u2022 ' + firmConfig.locations[i]}
                    </Text>
                </View>
            );
        }

        var contactEls = [];
        for (var i = 0; i < firmConfig.contacts.length; i++) {
            var contactData = firmConfig.contacts[i];
            var contactSubEls = [];

            for (var x = 0; x < contactData.content.length; x++) {
                contactSubEls.push(
                    <Text
                        style={
                            global.orientation === 'landscape'
                                ? styles.lcontactItemContentItem
                                : styles.contactItemContentItem
                        }
                    >
                        {contactData.content[x]}
                    </Text>
                );
            }

            contactEls.push(
                <View style={styles.contactItem}>
                    <View>
                        <Text
                            style={
                                global.orientation === 'landscape'
                                    ? styles.lcontactItemTitle
                                    : styles.contactItemTitle
                            }
                        >
                            {'\u2022 ' + contactData.title}
                        </Text>
                    </View>
                    <View style={styles.contactItemContent}>
                        {contactSubEls}
                    </View>
                </View>
            );
        }

        return (
            <View
                style={
                    global.orientation === 'landscape'
                        ? styles.lcontainer
                        : styles.container
                }
            >
                <PageHead
                    images={this.props.navigation.state.params}
                    title="Firm Stats"
                />

                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.overviewContainer}
                    >
                        <View style={styles.locationList}>{locationEls}</View>
                        <View style={styles.contactList}>{contactEls}</View>
                    </ScrollView>
                </View>
                <View style={styles.menu}>
                    <Menu
                        icon={this.props.navigation.state.params.icon}
                        menu={false}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sunriseContainer: {
        width: '30%',
        height: 50,
    },
    lsunriseContainer: {
        width: '30%',
        height: 150,
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
    lshell: {
        width: 500,
    },
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
        paddingBottom: 50,
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
    locationList: {
        width: '100%',
        display: 'flex',
        // flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    contactList: {
        borderTopColor: '#ccc',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
        borderBottomColor: '#fff',
        borderWidth: 1,
        paddingTop: 20,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    locationItem: {
        width: '50%',
        marginBottom: 20,
    },
    contactItem: {
        width: '50%',
        marginBottom: 20,
    },
    contactItemTitle: {
        fontWeight: '700',
    },
    lcontactItemTitle: {
        textAlign: 'center',
        fontWeight: '700',
    },
    locationItemText: {},
    llocationItemText: {
        textAlign: 'center',
    },
    contactItemContentItem: {
        fontSize: 12,
        paddingLeft: 10,
    },
    lcontactItemContentItem: {
        textAlign: 'center',
        fontSize: 12,
        paddingLeft: 10,
    },
});
