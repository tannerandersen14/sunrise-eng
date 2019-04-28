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

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sub_catagories: {},
      category: 12,
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

    var image_matcher = {
      ["32"]: {
        title: "Precision Construction Layout",
        image: require("../images/surveyprecisionconstructionlayout.jpg"),
        sortorder: 1,
        overview: {
          title: "Survey - Precision Construction Layout",
          description:
            "Sunrise Engineering works closely with our clients, the general contractor and field superintendents to provide the staking required for heavy civil, roadway, pipeline and industrial projects. Our surveyors have the expertise, equipment and software to adapt to the construction site’s ever changing conditions. Our surveying team focuses on providing timely and accurate stakes and references for your projects.",
        }
      },
      ["112"]: {
        title: "Land Boundary, Easements, Right-of-way",
        image: require("../images/surveylandboundaryeasments.jpg"),
        sortorder: 2,
        overview: {
          title: "Survey - Land Boundary, Easements, Right-of-way",
          description:
            "Sunrise Engineering has extensive experience in the determination of land boundaries on the ground. Our team of Professional Land Surveyors is well versed in land boundary matters and the representation of boundaries on plats, maps, exhibits, and in legal descriptions. We serve both public and private clients with their boundary, acquisition and development projects across the western United States."
        }
      },
      ["115"]: {
        title: "Topographic and ALTA Survey",
        image: require("../images/surveytopographic.jpg"),
        sortorder: 3,
        overview: {
          title: "Survey - Topographic and ALTA Survey",
          description:
            "Topography is an important first task for many improvement and development projects. Our team of surveyors utilizes the GPS, UAV’s, aerial photography, and Laser Scanners to collection, model and represent the existing conditions of your site. Additionally, the land boundary, easements and other information provided by title report is reviewed, analyzed and depicted both in CAD and by plat. We attend to the details and accuracy of the mapping that we prepare."
        }
      },
      ["33"]: {
        title: "3D Imaging",
        image: require("../images/survey-3DImaging.jpg"),
        sortorder: 4,
        overview: {
          title: "Survey - As Built Mapping",
          description:
            "Sunrise Engineering is a regional leader for surveying and professional engineering services. We implement High Definition Scanning (HDS), which gathers precise laser scan information, allowing our engineers to evaluate any project site. These advanced tools capture tremendous amounts of detailed data, unattainable by other methods. Our extensive experience demonstrates our capabilities in every surveying need that you have."
        }
      }
    };

    for (var pK in cats) {
      if (cats.hasOwnProperty(pK)) {
          var p = cats[pK];
          var p_image = require("../images/section_image.png");
          var p_title = p.title;

          if (image_matcher[p.cat]) {
            if (image_matcher[p.cat].image) p_image = image_matcher[p.cat].image;
            if (image_matcher[p.cat].title) p_title = image_matcher[p.cat].title;
          }

          cat_items.push({
            pic: p_image,
            title: p_title,
            link: "Projects",
            cat: p.cat
          });
      }
    }

    return cat_items;
  };

  render() {
    var sections = this.sub_category_rows();

    var images = {
      icon: require("../images/survey.png"),
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
      title: "Survey",
      subSectionTitle: "Survey Subsection",
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
