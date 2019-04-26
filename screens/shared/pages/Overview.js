import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import PageHead from '../PageHead.js';
import Menu from '../Menu.js';

export default class Overview extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <PageHead images={this.props.content.images} title={this.props.content.title+' Overview'} />
        </View>
        <View>
          <Text style={styles.subSectionTitle}>Overview </Text>
        </View>
        <View style={styles.menu}>
          <Menu icon={this.props.content.images.icon} master={this.props.master}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15
  },
  subSectionTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  subSectionList: {
    marginBottom: 75
  },
  subSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    paddingBottom: 10
  },
  subImageContainer: {
    height: '80%',
    width: '100%'
  },
  subImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  subImageTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
    fontWeight: '500'
  },
  menu: {
    height: 75,
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});
