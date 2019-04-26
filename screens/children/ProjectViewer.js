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
import ProjectPage from '../shared/pages/Project.js';
import Menu from '../shared/Menu.js';

export default class ProjectViewer extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    var params = this.props.navigation.state.params;
    return (
        <ProjectPage
          master={this.props}
          content={params}
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
