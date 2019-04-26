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
  Button
} from "react-native";

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    var props = this.props.navigation.state.params;
    console.log(props);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={props.backgroundImage}
          style={styles.header}
          resizeMode="cover"
          opacity=".6"
        >
          <View
            style={styles.logo}
          >
            <Image
              source={require("../images/sunrise_logo.png")}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain"
              }}
            />
          </View>
          <View style={styles.header_content}>
            <Image source={props.icon} style={styles.header_content_icon} />
            <Text style={styles.header_content_title}>{props.title}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  },
  header: {
    height: 400,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  logo: {
    flex: 1,
    paddingLeft: 20,
    width: '30%',
    height: 50
  },
  header_content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  header_content_icon: {
    resizeMode: 'contain',
    width: '20%',
    height: 50
  },
  header_content_title: {
    fontSize: 36,
    fontWeight: "900",
    color: "white"
  }
});
