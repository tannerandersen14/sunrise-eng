import React from 'react';
import { Platform } from 'react-native';
// import { createStackNavigator, createAppContainer } from "react-navigation";
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Main from '../screens/Main';
import FirmStats from '../screens/FirmStats';

import OverviewScreen from '../screens/children/Overview';
import SectionsScreen from '../screens/children/Sections';
import ProjectsScreen from '../screens/children/Projects';
import ProjectViewer from '../screens/children/ProjectViewer';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarVisible: false,
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const OverviewStack = createStackNavigator({
    Overview: OverviewScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Overview',
};

const SectionsStack = createStackNavigator({
    Sections: SectionsScreen,
});

SectionsStack.navigationOptions = {
    tabBarLabel: 'Sections',
};

const ProjectsStack = createStackNavigator({
    Projects: ProjectsScreen,
});

ProjectsStack.navigationOptions = {
    tabBarLabel: 'Projects',
};

const ProjectViewerStack = createStackNavigator({
    ProjectViewer: ProjectViewer,
});

ProjectViewerStack.navigationOptions = {
    tabBarLabel: 'ProjectViewer',
};

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const MainStacks = createStackNavigator({
    Main: Main,
});

MainStacks.navigationOptions = {
    tabBarLabel: 'Main',
};

const FirmStatsStacks = createStackNavigator({
    FirmStats: FirmStats,
});

FirmStatsStacks.navigationOptions = {
    tabBarLabel: 'FirmStats',
};

export default createSwitchNavigator({
    HomeStack,
    SectionsStack,
    ProjectsStack,
    ProjectViewer,
    OverviewStack,
    MainStacks,
    FirmStats,
});

// tonys different approach
// import Experience from "../screens/Experience.js";
//
//
// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Experience: { screen: Experience }
// });
//
// const App = createSwitchNavigator({MainNavigator});
//
// export default App;
