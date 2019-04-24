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
import { withNavigation } from 'react-navigation';
import OverviewPage from '../shared/pages/Overview.js'

export default class Overview extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.props.navigation.state);
    return (
      <OverviewPage
        content={this.props.navigation.state.params}
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
