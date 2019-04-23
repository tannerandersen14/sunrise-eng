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
  TouchableHighlight
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ImageBackground
            source={require("../images/sunrise_home_photo.jpg")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.innerContent}>
              <View style={styles.topContainer}>
                <View style={styles.sunriseContainer}>
                  <Image
                    style={styles.sunriseImage}
                    source={require("../images/sunrise_logo.png")}
                  />
                </View>
                <View style={styles.virtualContainer}>
                  <Image
                    style={styles.virtualImage}
                    source={require("../images/virtual_toolbox.png")}
                  />
                </View>
              </View>
              <View style={styles.menuHome}>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('NaturalGas')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/natural_gas.png")}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('Engineering')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/engineering.png")}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('Survey')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/survey.png")}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('CloudSmart')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/cloud_smart.png")}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('BuildingCode')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/building_code.png")}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.menuContainer}>
                  <TouchableHighlight
                    style={styles.menuContainerHighlight}
                    onPress={() => this.props.navigation.navigate('FirmStats')}
                  >
                    <Image
                      style={styles.menuImage}
                      source={require("../images/firm_stats.png")}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  innerContent: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sunriseContainer: {
    height: "50%",
    width: "50%"
  },
  sunriseImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  virtualContainer: {
    height: 100,
    width: 100
  },
  virtualImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  menuHome: {
    width: "90%",
    marginTop: "15%"
  },
  menuContainer: {
    width: '100%'
  },
  menuContainerHighlight: {
    height: 50,
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  menuImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain"
  }
});
