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

export default class Project extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {

    var content = this.props.config.p.map((e, i) => {
        return <Text key={i} style={styles.para}>{e}</Text>
    });

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.overviewContainer}
      >
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View>
          {content}
        </View>
      </ScrollView>
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
