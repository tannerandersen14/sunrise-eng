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
import SectionsPage from '../shared/pages/Sections.js';
import Menu from '../shared/Menu.js';

export default class Sections extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <SectionsPage
          menu={this.props.menu}
          content={this.props.config}
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
