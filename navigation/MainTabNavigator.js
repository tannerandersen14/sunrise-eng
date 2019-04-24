import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import NaturalGas from "../screens/NaturalGas";
import NaturalGasSections from "../screens/naturalGas/Sections";
import NaturalGasProjects from "../screens/naturalGas/Projects";
import Engineering from "../screens/Engineering";
import Survey from "../screens/Survey";
import CloudSmart from "../screens/CloudSmart";
import BuildingCode from "../screens/BuildingCode";
import FirmStats from "../screens/FirmStats";

import OverviewScreen from "../screens/children/Overview";
import SectionsScreen from "../screens/children/Sections";
import ProjectsScreen from "../screens/children/Projects";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarVisible: false
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const OverviewStack = createStackNavigator({
  Overview: OverviewScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Overview"
};

const SectionsStack = createStackNavigator({
  Sections: SectionsScreen
});

SectionsStack.navigationOptions = {
  tabBarLabel: "Sections"
};

const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen
});

ProjectsStack.navigationOptions = {
  tabBarLabel: "Projects"
};

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
const NaturalGasStacks = createStackNavigator({
  NaturalGas: NaturalGas
});

NaturalGasStacks.navigationOptions = {
  tabBarLabel: "Natural Gas"
};

const NaturalGasSectionsStacks = createStackNavigator({
  NaturalGasSections: NaturalGasSections
});

NaturalGasSectionsStacks.navigationOptions = {
  tabBarLabel: "Natural Gas Sections"
};

const NaturalGasProjectsStacks = createStackNavigator({
  NaturalGasProjects: NaturalGasProjects
});

NaturalGasProjectsStacks.navigationOptions = {
  tabBarLabel: "Natural Gas Projects"
};

const EngineeringStacks = createStackNavigator({
  Engineering: Engineering
});

EngineeringStacks.navigationOptions = {
  tabBarLabel: "Engineering"
};

const SurveyStacks = createStackNavigator({
  Survey: Survey
});

SurveyStacks.navigationOptions = {
  tabBarLabel: "Survey"
};

const CloudSmartStacks = createStackNavigator({
  CloudSmart: CloudSmart
});

CloudSmartStacks.navigationOptions = {
  tabBarLabel: "Cloud Smart GIS"
};

const BuildingCodeStacks = createStackNavigator({
  BuildingCode: BuildingCode
});

BuildingCodeStacks.navigationOptions = {
  tabBarLabel: "Building Code Services"
};

const FirmStatsStack = createStackNavigator({
  FirmStats: FirmStats
});

FirmStatsStack.navigationOptions = {
  tabBarLabel: "Firm Statistics"
};

export default createSwitchNavigator({
  HomeStack,
  SectionsStack,
  OverviewStack,
  ProjectsStack,

  NaturalGasStacks,
  NaturalGasSections,
  NaturalGasProjects,
  EngineeringStacks,
  SurveyStacks,
  CloudSmartStacks,
  BuildingCodeStacks,
  FirmStatsStack
});
