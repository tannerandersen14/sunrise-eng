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

import categoriesConfig from './../../config/categories.js';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.current_location = false;
        this.experiences = ['Main', 'FirmStats'];
        this.routeName = props.navigation.state.routeName;

        if (this.routeName) {
            this.current_location = this.routeName;
        }

        this.category = false;
        if (this.routeName === 'Overview') {
            this.category = props.navigation.state.params.category;
        }
    }
    static navigationOptions = {
        header: null,
    };
    leftPress = () => {
        if (this.current_location) {
            if (
                this.current_location === 'Overview' ||
                this.current_location === 'Projects'
            ) {
                var topCat = this.props.navigation.state.params.top_category;
                if (!topCat) {
                    var curCat = this.props.navigation.state.params.category;

                    var rCat = null;
                    for (
                        var i = 0;
                        i < global.apiController.ldata.categories.length;
                        i++
                    ) {
                        if (
                            global.apiController.ldata.categories[i].id ==
                            curCat
                        ) {
                            rCat = global.apiController.ldata.categories[i];
                            break;
                        }
                    }

                    if (parseInt(rCat.parent)) {
                        topCat = rCat.parent;
                    } else {
                        topCat = rCat.id;
                    }
                }

                if (!topCat) return false;
                this.props.navigation.navigate(
                    'Main',
                    categoriesConfig[topCat]
                );
            }
        } else {
            return false;
            this.props.navigation.navigate('Sections');
        }
    };

    render() {
		console.log('menu props', this.props);
        var color = 'rgba()';
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.leftPress();
                    }}
                >
                    <View style={styles.item}>
                        <View style={styles.IconContainer}>
                            <Image
                                style={{
                                    flex: 1,
                                    height: null,
                                    width: null,
                                    resizeMode: 'contain',
                                    tintColor:
                                        this.experiences.indexOf(
                                            this.current_location
                                        ) !== -1
                                            ? '#FFC900'
                                            : this.current_location ===
                                              'ProjectViewer'
                                            ? 'gray'
                                            : 'black',
                                }}
                                source={this.props.icon}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (this.props.menu && this.props.menu.projects) {
                        } else if (this.current_location === 'Overview') {
                        } else {
                            if (!this.props.navigation.state.params.category) {
                                console.log('no nav!');
                                console.log(this.props);
                                return false;
                            }

                            // console.log('props', this.props);

                            this.props.navigation.navigate('Projects', {
                                category: this.props.navigation.state.params
                                    .category,
                                title:
                                    this.props.navigation.state.params
                                        .section ||
                                    this.props.navigation.state.params.title,
                            });
                        }
                    }}
                >
                    <View style={styles.item}>
                        <View style={styles.IconContainer}>
                            <Image
                                style={{
                                    flex: 1,
                                    height: null,
                                    width: null,
                                    resizeMode: 'contain',
                                    tintColor:
                                        this.current_location == 'Projects'
                                            ? '#FFC900'
                                            : this.props.menu &&
                                              this.props.menu.projects
                                            ? 'gray'
                                            : (this.current_location ===
                                                  'Overview' || this,
                                              this.current_location === 'FirmStats')
                                            ? 'gray'
                                            : 'black',
                                }}
                                source={require('../../images/projectsIcon.png')}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                >
                    <View style={styles.backitem}>
                        <View style={styles.itemBar} />
                        <View style={styles.itemBar} />
                        <View style={styles.itemBar} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default withNavigation(Menu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
    },
    backitem: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 15,
    },
    IconContainer: {
        height: 30,
        width: 30,
    },
    IconImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'contain',
        tintColor: 'black',
    },
    itemBar: {
        height: 3,
        width: 25,
        marginBottom: 5,
        backgroundColor: 'black',
    },
});
