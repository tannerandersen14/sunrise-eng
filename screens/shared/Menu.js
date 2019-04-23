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

export default class Menu extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.master.navigation.navigate('Sections')
          }}
        >
          <View style={styles.item}>
            <View style={styles.IconContainer}>
              <Image style={styles.IconImage} source={this.props.icon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.master.navigation.navigate('Projects')
          }}
        >
          <View style={styles.item}>
            <View style={styles.IconContainer}>
              <Image
                style={styles.IconImage}
                source={require("../../images/projectsIcon.png")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.master.navigation.navigate('Home')
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
