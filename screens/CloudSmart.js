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
      category: 13,
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
      ["34"]: {
        title: "Utility Systems Management",
        image: require("../images/gis-utilitysystemsmanagement.jpg"),
        sortorder: 1,
        overview: {
          title: "GIS - Utility Systems Management",
          description:
            "Maintaining utilities has never been easier. SMART GIS easily transforms existing utility infrastructure into a transportable application; no more need for paper maps or back-at-the-office collaboration. Our Cloud SMART utility innovative options allow for easy operations optimization, report preparation, and interactive editing and sharing capabilities.",
        }
      },
      ["35"]: {
        title: "Arts, Parks, & Trails Management",
        image: require("../images/surveylandboundaryeasments.jpg"),
        sortorder: 2,
        overview: {
          title: "GIS - Arts, Parks, and Trails Management",
          description:
            "Sunrise Engineering has extensive experience in the determination of land boundaries on the ground. Our team of Professional Land Surveyors is well versed in land boundary matters and the representation of boundaries on plats, maps, exhibits, and in legal descriptions. We serve both public and private clients with their boundary, acquisition and development projects across the western United States."
        }
      },
      ["36"]: {
        title: "Transportation System Management",
        image: require("../images/gistransportationsystemmanagement.jpg"),
        sortorder: 3,
        overview: {
          title: "GIS - Transportation System Management",
          description:
            "SMART Transportation can save massive amounts of time when planning pavement maintenance or managing rights-of-way. Efficiently build bus routes and schedules that consider gas consumption and travel time. Create better records of accidents and accident frequency to better understand why they are occurring and how to fix the situation. Communicate public parking or plan roadway maintenance. Create heat maps of traffic counts to help determine proper traffic flow options to consider."
        }
      },
      ["37"]: {
        title: "Facility Asset Management",
        image: require("../images/gisfacilityassetmanagement.jpg"),
        sortorder: 4,
        overview: {
          title: "GIS - Facility Asset Management",
          description:
            "SMART mapping helps make sense of improvements to emergency planning, work orders, and energy usage by allowing users to visualize them geographically. Easily find solutions by linking operation and parts manuals to facility assets. Cloud SMART can also help optimize energy usage, map utility systems, and plan future expansion. Quickly search any building facility whether it be a City government building or School to interactively visualize floorplans and office spaces. Our SMART mapping of any facility type empowers any user with location and efficient relevant information."
        }
    },
      ["38"]: {
        title: "Zoning and Land Use Management",
        image: require("../images/giszoningandlandusemanagement.jpg"),
        sortorder: 4,
        overview: {
          title: "GIS - Zoning and Land Use Management",
          description:
            "Accessibility of Cloud SMART data is key to those who use it. Quickly search by name or address in a simple online application and understand the value of having this information presented in a manner that is easily interpreted. Cloud SMART GIS can display topographic data, share zoning maps, and host aerial imagery. City governments can conceptualize zoning district changes and link ordinance documentation to those districts in real-time. Empower communities with real world information."
        }
    },
      ["39"]: {
        title: "Water Resource Management",
        image: require("../images/giswaterresourcemanagement.jpg"),
        sortorder: 5,
        overview: {
          title: "GIS - Water Resource Management",
          description:
            "Demand for water is critical and water resource management can be daunting and time-consuming, but Cloud SMART GIS makes organizing water resources simple and affordable. Combining our sophisticated knowledge of water resource maintenance processes with a user-friendly visual platform, Cloud SMART GIS makes it easy to manage water rights, show demand trends, visualize watersheds, and record groundwater levels."
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
      background: require("../images/sunrise-engineering-services-experience-gis-150x150.jpg")
    };
    var disable = {
      projects: true
    };
    var config = {
      images: {
        icon: require("../images/natural_gas_icon.png"),
        background: require("../images/sunrise-engineering-services-experience-gis-150x150.jpg")
      },
      title: "Cloud Smart GIS",
      subSectionTitle: "GIS Subsection",
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
