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

export default class Engineering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sub_catagories: {},
      category: 11,
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
        this.state.category+'&per_page=50'
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

  projects = () => {
    var state_data = {};
    var fields = [
      "slug",
      "title",
      "id",
      "featured_media",
      "project_details",
      "project_details_project_client",
      "project_details_project_location",
      "project_details_project_services",
      "project_header_image",
      "project_highlights",
      "project_highlights_0_project_highlight",
      "project_highlights_1_project_highlight",
      "project_highlights_2_project_highlight",
      "project_highlights_3_project_highlight",
      "project_highlights_4_project_highlight",
      "project_highlights_5_project_highlight",
      "project_highlights_6_project_highlight",
      "project_highlights_7_project_highlight",
      "project_highlights_8_project_highlight",
      "project_images",
      "project_testimonials",
      "slug",
      "categories"
    ];

    fetch(
      "https://sunrise-eng.com/wp-json/wp/v2/projects?per_page=50&categories="+this.state.category
    )
      .then(res => res.json())
      .then(data => {
        for (var dK in data) {
          if (data.hasOwnProperty(dK)) {
            var item = data[dK];

            var new_i = {
              featured_image: false
            };

            var categories = data[dK].categories;
            for (var i = 0; i < fields.length; i++) {
              var k = fields[i];
              if (item[k]) new_i[k] = item[k];
            }
            state_data[data[dK].id] = new_i;
          }
        }
      })
      .then(() => {
        this.setState({
          loadComplete: true,
          data: state_data
        });
      })
      .catch(err => {
        console.log(err);
      });

    return state_data;
  };

  getFeaturedImage(id) {
    fetch("https://sunrise-eng.com/wp-json/wp/v2/media/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    return false;
  }

  sub_category_rows = () => {
    var cats = this.state.sub_catagories;
    var cat_items = [{
      pic: require("../images/section_image.png"),
      title: 'Overview',
      link: 'Overview'
    }];

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
      icon: require("../images/engineering.png"),
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
      title: "Engineering",
      subSectionTitle: "Engineering Subsection",
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
