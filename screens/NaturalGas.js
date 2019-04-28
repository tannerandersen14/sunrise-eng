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

export default class NaturalGas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sub_catagories: {},
      category: 9,
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
      "https://sunrise-eng.com/wp-json/wp/v2/projects?per_page=50&categories=" +
        this.state.category
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
    var cat_items = [
      {
        pic: require("../images/section_image.png"),
        title: "Overview",
        link: "Overview"
      }
    ];

    var image_matcher = {
      ["10"]: {
        title: "Pipeline Engineering",
        image: require("../images/pipelineengineernig.jpg"),
        sortorder: 1,
        overview: {
          title: "Natural Gas - Pipeline Engineering",
          description:
            "With 30 years of experience working with transmission pipeline and distribution companies in both the public and private spheres, we are leaders in natural gas pipeline design and engineering. We are designing new systems, improving or replacing existing systems and making sure permitting and environmental concerns are addressed properly. From start to finish, Sunrise is capable of handling your pipeline engineering and design project.",
          list: [
            "Transmission and Distribution",
            "Regulation and Metering",
            "LNG and Propane Distribution",
            "Pipeline Safety Compliance",
            "Material Specification & Procurement",
            "Contract Documents & Negotiations",
            "System Start-up",
            "System Modeling"
          ]
        }
      },
      ["17"]: {
        title: "3rd Party Inspection and Audit",
        image: require("../images/3rdpartyinspectionandaudit.jpg"),
        sortorder: 2,
        overview: {
          title: "Natural Gas - 3rd Part INspection and Audit",
          description:
            "When the shovels dig in and pipe starts going in the ground it’s critical that your designs and specifications are implemented safely and correctly. Our 3rd-Party Inspectors have the knowledge and experience to be your eyes and ears to monitor construction and safety standards on your steel and plastic pipeline projects."
        }
      },
      ["16"]: {
        title: "Compliance Documentation",
        image: require("../images/complianceandstudies.jpg"),
        sortorder: 3,
        overview: {
          title: "Natural Gas - Compliance Documentation",
          description:
            "The work doesn’t end when the pipeline is buried. Sunrise is helping operators to stay in compliance and to keep things safely and efficiently flowing to their customers during and after startup. We can help you develop, maintain and stay in compliance with required documentation.",
          list: [
            "Procedure Manuals",
            "Operation and Maintenance Manuals",
            "Emergency Response Plans",
            "Operator Qualification Plans"
          ]
        }
      },
      ["15"]: {
        title: "As-Built/Mapping",
        image: require("../images/asbuiltmapping.jpg"),
        sortorder: 4,
        overview: {
          title: "Natural Gas - As Built Mapping",
          description:
            "Whether you require paper or electronic submission of project as-builts, Sunrise can help you document and manage your project close outs. We utilize the latest technologies to prepare and manage as-built drawings and GIS mapped systems. We recognize the value of knowing where your assets lie, and can help you keep that knowledge safe and accessible."
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
      icon: require("../images/building_code.png"),
      background: require("../images/Sunrise-Engineering-Experience-Natural-Gas-Pipeline-Design-Service-150x150.jpg")
    };
    var disable = {
      projects: true
    };
    var config = {
      images: {
        icon: require("../images/natural_gas_icon.png"),
        background: require("../images/Sunrise-Engineering-Experience-Natural-Gas-Pipeline-Design-Service-150x150.jpg")
      },
      title: "Natural Gas",
      subSectionTitle: "Natural Gas Subsection",
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
