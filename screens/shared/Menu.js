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
import { withNavigation } from "react-navigation";

class Menu extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    var current_location = this.props.navigation.state.routeName;

    if (this.props.navigation.state.routeName) {
      if (this.props.navigation.state.routeName.routeName) {
        current_location = this.props.navigation.state.routeName.routeName;
      }
    }

    console.log(current_location);
    var color = 'rgba()'
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate("Sections");
          }}
        >
          <View style={styles.item}>
            <View style={styles.IconContainer}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "contain",
                  tintColor:
                    current_location == 'NaturalGas'
                      ? "#FFC900"
                      : "black"
                }}
                source={this.props.icon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.menu && this.props.menu.projects) {
            } else {
              this.props.navigation.navigate("Projects");
            }
          }}
        >
          <View style={styles.item}>
            <View style={styles.IconContainer}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "contain",
                  tintColor:
                    current_location == 'Projects' ? '#FFC900' : (this.props.menu && this.props.menu.projects
                      ? "gray"
                      : "black")
                }}
                source={require("../../images/projectsIcon.png")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <View style={styles.item}>
            <View style={styles.itemBar} />
            <View style={styles.itemBar} />
            <View style={styles.itemBar} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default withNavigation(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: "black",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    marginTop: 10
  },
  IconContainer: {
    height: 20,
    width: 20
  },
  IconImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
    tintColor: "black"
  },
  itemBar: {
    height: 3,
    width: 25,
    marginBottom: 5,
    backgroundColor: "black"
  }
});
