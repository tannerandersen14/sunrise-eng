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
        this.state.category +
        "&per_page=50"
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
        pic: require("../images/sunrise_logo.png"),
        title: "Overview",
        link: "Overview"
      }
    ];

    var image_matcher = {
      ["18"]: {
        title: "Water",
        image: require("../images/engineeringwater.jpg"),
        sortorder: 1,
        overview: {
          title: "Engineering - Water",
          description:
            "Water is a critical, life sustaining need for everyone. At Sunrise Engineering, we have the resources, technical know-how and first-class customer service to create ideal solutions for our clients’ water-related projects. From water rights, source, treatment, storage and distribution through state and federal regulations, our expertise is deep and our knowledge is top-notch."
        }
      },
      ["19"]: {
        title: "Wastewater",
        image: require("../images/engineeringwastewater.jpg"),
        sortorder: 2,
        overview: {
          title: "Engineering - Wastewater",
          description:
            "Wastewater engineering results are often hidden from view—buried and unnoticed. Sunrise Engineering understands the needs of municipal and utility owners requiring a new, upgraded or expanded wastewater systems or treatment plants. Our extensive experience helps us avoid common pitfalls and identify the best design, processes and equipment for each project."
        }
      },
      ["20"]: {
        title: "Drainage/Flood Control",
        image: require("../images/egineeringdrainingfloodcontrol.jpg"),
        sortorder: 3,
        overview: {
          title: "Engineering - Drainage/Flood Control",
          description:
            "We work closely with our clients to solve a variety of drainage and flood control issues for a wide range of projects. We understand that proper drainage is a critical aspect in the design of most civil engineering projects; we know that meeting local and federal regulations is vital to a project’s success. Through our work, we support safe and sustainable development for clients specifically and for the community at large."
        }
      },
      ["22"]: {
        title: "Irrigation",
        image: require("../images/engineeringirrigation.jpg"),
        sortorder: 4,
        overview: {
          title: "Engineering - Irrigation",
          description:
            "Irrigation water is a precious commodity in the western United States. Both agricultural and municipal irrigation water are vital in maintaining the livelihood of our clients and the communities in which we live and work. We work closely with our clients to help them utilize their water to its most beneficial and economical advantage."
        }
      },
      ["23"]: {
        title: "Land Development",
        image: require("../images/engineeringlanddevelopment.jpg"),
        sortorder: 5,
        overview: {
          title: "Engineering - Land Development",
          description:
            "Sunrise Engineering understands the needs of land developers. While each client and project is different, for land development, time is money. Because a shorter schedule equates to dollars, we work closely with our clients to optimize scheduling, aiming for quick project turnaround. Our clients appreciate our focus on relationships and our keen understanding of development processes and regulations."
        }
      },
      ["24"]: {
        title: "Renewable Energy",
        image: require("../images/engineeringrenewableenergy.jpg"),
        sortorder: 6,
        overview: {
          title: "Engineering - Renewable Energy",
          description:
            "As a client-driven company, Sunrise Engineering recognizes the value of renewable power sources for our clients. Because we are committed to our communities for the long haul, we appreciate that clean energy is their present and future. From wind and solar energy to hydro-electric power, we have a deep understanding of the industry."
        }
      },
      ["25"]: {
        title: "Electrical",
        image: require("../images/engineeringelectrical.jpg"),
        sortorder: 7,
        overview: {
          title: "Engineering - Electrical",
          description:
            "At Sunrise Engineering, we design energy delivery solutions for utilities and end users across many industries, and we employ tailored methodologies for an optimum project. Whether designing electrical power and control systems for a single pump or for an entire mining operation, we are committed to providing solutions that will best meet the needs of our clients."
        }
      },
      ["26"]: {
        title: "Structural",
        image: require("../images/engineeringstructural.jpg"),
        sortorder: 8,
        overview: {
          title: "Engineering - Structural",
          description:
            "Our highly capable team of structural engineers work on a wide variety projects – none is too large or too small. Our clients appreciate the quality of workmanship put into our structural engineering design and commonly invite us back again and again for future projects."
        }
      },
      ["27"]: {
        title: "Transportation/Transit",
        image: require("../images/engineeringtransportationtransit.jpg"),
        sortorder: 9,
        overview: {
          title: "Engineering - Transportation/Transit",
          description:
            "We understand the impact that transportation and transit projects have on people’s daily lives. Whether its street widening, intersection improvements or highways, one of the greatest rewards we get from working on roadway and transportation projects is driving through a city to see the positive effect our work has on that community."
        }
      },
      ["28"]: {
        title: "Construction Engineering",
        image: require("../images/engineeringconstruction.jpg"),
        sortorder: 10,
        overview: {
          title: "Engineering - Construction Engineering",
          description:
            "We have a reputation for assisting our clients with their construction engineering, observation and administration needs for outcomes that include high-quality projects that stay within established budgets and timelines. Our clients include municipalities and privately-owned or investor-owned companies, and our work ranges from small-scale projects to massive city government infrastructure."
        }
      },
      ["29"]: {
        title: "Environmental",
        image: require("../images/engineeringenvironmental.jpg"),
        sortorder: 11,
        overview: {
          title: "Engineering - Environmental",
          description:
            "At Sunrise, we value the opportunity to help our clients navigate environmental requirements for their new projects and ongoing operations. Our team is able to interpret complex regulatory requirements and develop sensible and cost-effective compliance solutions. Our ability to communicate with stakeholders and government agencies is an important resource available within Sunrise Engineering. We identify and evaluate potentially adverse environmental impacts that may result from a proposed action. If impacts are expected, we develop mitigation measures to limit or prevent such impacts. We care about the environment and the effect our work has on our communities; we continuously seek to find sustainable solutions to help reduce our clients’ environmental footprint."
        }
      },
      ["45"]: {
        title: "City Engineering",
        image: require("../images/engineeringcityengineering.jpg"),
        sortorder: 12,
        overview: {
          title: "Engineering - City Engineering",
          description:
            "We often work as an extension to City staff to evaluate the needs of a community’s infrastructure and make cost-effective recommendations for improvements and funding opportunities. This allows the community to provide services to its citizens that maintain and enhance their quality of life. Our municipality clients appreciate our long-term approach and top-notch customer service."
        }
    },
      ["46"]: {
        title: "Community Facilities",
        image: require("../images/engineeringcommunictifyfacilities.jpg"),
        sortorder: 13,
        overview: {
          title: "Engineering - Community Facilities",
          description:
            "In the past 15 years, the Sunrise team has completed up-front planning, design and construction on over 50 park, trail, and recreational facility projects. With extensive experience and singular perspective, our team delivers recreational master plans, recreational designs, landscape designs, engineering, and all the amenities that go with them."
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
      icon: require("../images/engineering.png"),
      background: require("../images/sunrise-engineering-services-experience-engineering-150x150.jpg")
    };
    var disable = {
      projects: true
    };
    var config = {
      images: {
        icon: require("../images/natural_gas_icon.png"),
        background: require("../images/sunrise-engineering-services-experience-engineering-150x150.jpg")
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
