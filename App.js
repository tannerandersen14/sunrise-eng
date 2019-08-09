import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import { AppLoading, Asset, Font, Icon, ScreenOrientation } from 'expo';
import { ProgressBar, Colors } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';

import Api from './api/index.js';
export default class App extends React.Component {
    constructor(props) {
        super(props);

        global.dimensions = Dimensions.get('window');

        Dimensions.addEventListener(
            'change',
            function() {
                global.dimesions = Dimensions.get('window');
                this.checkDimensions();
            }.bind(this)
        );

        this.state = {
            failed: false,
            progress: 0,
            apiStatus: '',
            network_version: 0,
            data_finished: false,
            isLoadingComplete: false,
        };
        this.api = new Api(this);
        this.api.fetchAll();

        global.apiController = this.api;
        this.checkDimensions();
    }
    checkDimensions() {
        if (
            global.dimensions.width > 600 &&
            global.dimensions.width > global.dimensions.height
        ) {
            ScreenOrientation.allowAsync(
                ScreenOrientation.Orientation.LANDSCAPE,
                ScreenOrientation.Orientation.PORTRAIT
            );
        }

        if (
            global.dimensions.width > 600 &&
            global.dimensions.width > global.dimensions.height
        ) {
            global.orientation = 'landscape';
        } else {
            global.orientation = 'portrait';
        }

        console.log(global.orientation);
        this.setState({
            network_version: this.state.network_version + 1,
        });
    }
    render() {
        if (!this.api.fetched) this.api.fetchAll();
        console.log('my progress', this.state.progress);
        if (
            (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) ||
            !global.apiController
        ) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else if (!this.state.data_finished || this.state.failed) {
            return (
                <View style={styles.datacontainer}>
                    <ImageBackground
                        source={require('./images/sunrise_home_photo.jpg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {this.state.failed ? (
                            <View style={styles.dataoverlay}>
                                <Text style={styles.dataWaitText}>Error</Text>
                                <Text style={styles.dataWaitStatus2}>
                                    Failed to retrieve all API data. Please try
                                    again in a few minutes.
                                </Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.api.fetchAll();
                                    }}
                                    style={styles.dataRefreshButton}
                                >
                                    <Text style={styles.dataRefreshButtonText}>
                                        Try Again
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        ) : (
                            <View style={styles.dataoverlay}>
                                <Text style={styles.dataWaitText}>
                                    Loading New Data
                                </Text>
                                <Text style={styles.dataWaitStatus}>
                                    {this.state.apiStatus}
                                </Text>
                                <ProgressBar
                                    style={{ marginTop: 40, width: '90%', maxWidth: 400, height: 15 }}
                                    progress={this.state.progress}
                                    color="#ffffff"
                                />
                                <ActivityIndicator
                                    animating={true}
                                    color="#fff"
                                    size="large"
                                    style={styles.activityIndicator}
                                />
                            </View>
                        )}
                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && (
                        <StatusBar barStyle="light-content" />
                    )}
                    <AppNavigator />
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        var assets = [
            require('./images/cemetery_management.jpg'),
            require('./images/cloud_smart_gis.jpg'),
            require('./images/field_inspections.jpg'),
            require('./images/industrial_mining.jpg'),
            require('./images/mapping_management_analytic.jpg'),
            require('./images/planning_studies.jpg'),
            require('./images/training_qualifications.jpg'),
            require('./images/refresh_content.png'),
            require('./images/3rdpartyinspectionandaudit.jpg'),
            require('./images/3rdpartyinspectionandaudit.jpg'),
            require('./images/3rdpartyinspectionandaudit.jpg'),
            require('./images/asbuiltmapping.jpg'),
            require('./images/building_code.png'),
            require('./images/building_code_icon.png'),
            require('./images/buildingcodebuildinginspection.jpg'),
            require('./images/buildingcodeplanreview.jpg'),
            require('./images/buildingcodethirdpartyinspection.jpg'),
            require('./images/buildingcoepeerreviews.jpg'),
            require('./images/cloud_smart.png'),
            require('./images/cloud_smart_icon.png'),
            require('./images/complianceandstudies.jpg'),
            require('./images/egineeringdrainingfloodcontrol.jpg'),
            require('./images/engineering_icon.png'),
            require('./images/engineering.png'),
            require('./images/engineeringcityengineering.jpg'),
            require('./images/engineeringcommunictifyfacilities.jpg'),
            require('./images/engineeringconstruction.jpg'),
            require('./images/engineeringelectrical.jpg'),
            require('./images/engineeringenvironmental.jpg'),
            require('./images/engineeringirrigation.jpg'),
            require('./images/engineeringlanddevelopment.jpg'),
            require('./images/engineeringrenewableenergy.jpg'),
            require('./images/engineeringstructural.jpg'),
            require('./images/engineeringtransportationtransit.jpg'),
            require('./images/engineeringwastewater.jpg'),
            require('./images/engineeringwater.jpg'),
            require('./images/firmstats_background.png'),
            require('./images/firm_stats.png'),
            require('./images/firm_stats_icon.png'),
            require('./images/gis-utilitysystemsmanagement.jpg'),
            require('./images/gisfacilityassetmanagement.jpg'),
            require('./images/gistransportationsystemmanagement.jpg'),
            require('./images/giswaterresourcemanagement.jpg'),
            require('./images/giszoningandlandusemanagement.jpg'),
            require('./images/head_background.png'),
            require('./images/natural_gas_icon.png'),
            require('./images/natural_gas.png'),
            require('./images/pipelineengineernig.jpg'),
            require('./images/projectsIcon.png'),
            require('./images/section_image.png'),
            require('./images/sunrise_home_photo.jpg'),
            require('./images/sunrise_home_photo.png'),
            require('./images/sunrise_logo_black.png'),
            require('./images/sunrise_logo.png'),
            require('./images/Sunrise-Engineering-Experience-Natural-Gas-Pipeline-Design-Service-150x150.jpg'),
            require('./images/sunrise-engineering-services-experience-building-code-services-150x150.jpg'),
            require('./images/sunrise-engineering-services-experience-engineering-150x150.jpg'),
            require('./images/sunrise-engineering-services-experience-gis-150x150.jpg'),
            require('./images/sunrise-engineering-services-experience-survey-150x150.jpg'),
            require('./images/survey-3DImaging.jpg'),
            require('./images/survey.png'),
            require('./images/survey_icon.png'),
            require('./images/surveylandboundaryeasments.jpg'),
            require('./images/surveyprecisionconstructionlayout.jpg'),
            require('./images/surveytopographic.jpg'),
            require('./images/virtual_toolbox.png'),
        ];

        return Promise.all([Asset.loadAsync(assets)]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
    },
    datacontainer: {
        flex: 1,
        // position: 'relative',
        backgroundColor: '#fff',
        // paddingTop: '30%',
    },
    status: {
        zIndex: 15,
        position: 'absolute',
        textAlign: 'center',
        fontSize: 24,
        top: '20%',
        color: '#fff',
    },
    dataWaitText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    dataWaitStatus: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
    dataWaitStatus2: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
    },
    activityIndicator: {
        height: 30,
        marginTop: 50,
        marginBottom: '50%',
    },
    dataoverlay: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // opacity: 0.5,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    dataRefreshButton: {
        backgroundColor: '#fff',
        opacity: 1,
        padding: 10,
        borderRadius: 3,
        width: 150,
        marginTop: 10,
    },
    dataRefreshButtonText: {
        textAlign: 'center',
        color: '#333',
    },
});
