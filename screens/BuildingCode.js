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
import Sections from "./children/Sections.js";
import Menu from "./shared/Menu.js";

export default class BuildingCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sub_catagories: {},
      category: 14,
      loadComplete: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.get_sub_catagories();
  }

  get_sub_catagories = () => {
    var subs = {};

    fetch(
      "https://sunrise-eng.com/wp-json/wp/v2/categories?parent=" +
        this.state.category
    )
      .then(res => res.json())
      .then(data => {
        for (var dK in data) {
          if (data.hasOwnProperty(dK)) {
            subs[data[dK].id] = {
              cat: data[dK].id,
              title: data[dK].name
            };
          }
        }
      })
      .then(() => {
        this.setState({
          sub_catagories: subs
        });
      });
  };

  sub_category_rows = () => {
    var cats = this.state.sub_catagories;
    var cat_items = [
      {

        pic: require("../images/section_image.png"),
        title: 'Overview',
        link: 'Overview'
      }
    ];

    for (var pK in cats) {
      if (cats.hasOwnProperty(pK)) {
        var p = cats[pK];
        cat_items.push({
          pic: require("../images/section_image.png"),
          title: p.title,
          link: 'Projects',
          cat: p.cat
        });
      }
    }

    return cat_items;
  };

  render() {
    var sections = this.sub_category_rows();

    var images = {
      icon: require("../images/building_code.png"),
      background: require("../images/head_background.png")
    };
    var disable = {
      projects: true
    };

    var config = {
      images: {
        icon: require("../images/natural_gas_icon.png"),
        background: require("../images/head_background.png")
      },
      title: "Building Code",
      subSectionTitle: "Building Code Subsection",
      sections: sections
    };

    return (
      <View style={styles.container}>
        <Sections config={config} menu={disable} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%"
  }
});
