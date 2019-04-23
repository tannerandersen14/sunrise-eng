import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import SectionsPage from '../shared/pages/Sections.js'

export default class Sections extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    var config = {
        images: {
          icon: require("../../images/natural_gas_icon.png"),
          background: require("../../images/head_background.png")
        },
        title: 'Natural Gas Services',
        subSectionTitle: 'Natural Gas Subsection',
        sections: [
            {
                pic: require("../../images/section_image.png"),
                title: 'Pipeline Engineering'
            },
            {
                pic: require("../../images/section_image.png"),
                title: '3rd Party'
            },
            {
                pic: require("../../images/section_image.png"),
                title: 'Compliance'
            }
        ]
    }
    return (
      <SectionsPage
        content={config}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overviewContainer: {
    padding: 25
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15
  },
  para: {
    fontSize: 16,
    marginBottom: 10
  }
});
