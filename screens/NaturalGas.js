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
import Sections from './children/Sections.js';
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
    var disable = {
        projects: true
    }
    var config = {
        images: {
          icon: require("../images/natural_gas_icon.png"),
          background: require("../images/head_background.png")
        },
        title: 'Natural Gas Services',
        subSectionTitle: 'Natural Gas Subsection',
        sections: [
            {
                pic: require("../images/section_image.png"),
                title: 'Pipeline Engineering',
                link: 'Overview'
            },
            {
                pic: require("../images/section_image.png"),
                title: '3rd Party'
            },
            {
                pic: require("../images/section_image.png"),
                title: 'Compliance'
            }
        ]
    }
    return (
      <View
        style={styles.container}
      >
        <Sections
          config={config}
          menu={disable}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: '100%'
  }
});
