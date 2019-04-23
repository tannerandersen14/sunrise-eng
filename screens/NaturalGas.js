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
import PageHead from "./shared/PageHead.js";
import Overview from "./shared/Overview.js";
import Menu from "./shared/Menu.js";

export default class naturalGas extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    var images = {
      icon: require("../images/natural_gas_icon.png"),
      background: require("../images/head_background.png")
    };
    var OverviewConfig = {
      p: [
        "Our name speaks to one of our main focuses--engineering. Big city or small town, public or private, it doesn't matter--we're here to plan or improve it. We'll take you from initial funding, study, and design all the way to permitting, administation and close out.",
        "While we've won awards in the past, the true reward is the lasting relationships we have built with our clients. Years of successful projects make client confidence in our expertise blossom. We are your advocate and will not stop until your project is a success."
      ]
    };
    return (
      <View
        style={styles.container}
      >
        <View>
          <PageHead images={images} title="Natural Gas Services" />
        </View>
        <ScrollView>
          <Overview title="Overview" config={OverviewConfig} />
        </ScrollView>
        <View style={styles.menu}>
          <Menu icon={images.icon} master={this.props}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: '100%'
  },
  menu: {
    height: 75,
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});
