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

export default class PageHead extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {

    var image_component = null;;
    var view_height = this.props.height ? this.props.height*1 : 300;

    if(this.props.images.featured_image) {
      image_component = <ImageBackground
        source={{uri: this.props.images.featured_image}}
        style={{ width: "100%", height: "100%"}}
        resizeMode= "cover" 
      >
        <View style={styles.container}>
          <View style={styles.sunriseContainer}>
            <Image
              style={styles.sunriseImage}
              source={require("../../images/sunrise_logo.png")}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.icon}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.iconImage}
                  source={this.props.images.icon}
                />
              </View>
              <View>
              <Text style={styles.headText}>{this.props.section}</Text>
              </View>
              <View>
                <Text style={styles.sectionText}>{this.props.title}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    } else {
      image_component = <ImageBackground
        source={this.props.images.background}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.sunriseContainer}>
            <Image
              style={styles.sunriseImage}
              source={require("../../images/sunrise_logo.png")}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.icon}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.iconImage}
                  source={this.props.images.icon}
                />
              </View>
              <View>
                <Text style={styles.headText}>{this.props.title}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    }

    return (
      <View style={{height: view_height}}>
        {image_component}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: 300
  },
  contentContainer: {
    height: 150
  },
  head: {
    width: "100%"
  },
  sunriseContainer: {
    width: "30%",
    height: 50
  },
  content: {
    width: "100%"
  },
  headText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    paddingTop: 20,
    fontWeight: '600'
  },
  sectionText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    paddingTop: 10,
    fontWeight: '400',
    borderColor: 'white',
    borderBottomWidth: 1
  },
  sunriseImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  icon: {
    paddingTop: 40,
    paddingBottom: 20,
    width: "100%"
  },
  iconContainer: {
    width: "100%",
    height: 75
  },
  iconImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  }
});
