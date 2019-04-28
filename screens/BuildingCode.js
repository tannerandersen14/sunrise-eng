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

    var image_matcher = {
      ["41"]: {
        title: "Building Inespection",
        image: require("../images/buildingcodebuildinginspection.jpg"),
        sortorder: 1,
        overview: {
          title: "Building Code - Building Inespection",
          description:
            "Sunrise Engineering has been providing building inspection services for rural and urban communities throughout the Intermountain West for 30 years. Our personnel have performed and managed building code services for thousands of projects, ranging from residential and multiple-family homes to hospitals and municipal buildings. Our goal is to complete projects that are cost effective to our clients and are compliant with state, and regulatory agency requirements. Our building inspection services help everyone reach that goal.",
        }
      },
      ["43"]: {
        title: "Plan Review",
        image: require("../images/buildingcodeplanreview.jpg"),
        sortorder: 2,
        overview: {
          title: "Building Code - Plan Review",
          description:
            "Our personnel have performed and managed building code services for thousands of projects, ranging from residential and multiple-family homes to hospitals and municipal buildings. Our goal is to complete projects that are cost effective to our clients and are compliant with state, and regulatory agency requirements. Our plan review services help everyone reach that goal."
        }
      },
      ["44"]: {
        title: "3rd Party Inspection",
        image: require("../images/buildingcodethirdpartyinspection.jpg"),
        sortorder: 3,
        overview: {
          title: "Building Code - 3rd Party Inspection",
          description:
            "Our third-party inspection services are unbiased and clearly documented. These services include observing and inspecting assigned facilities to be in compliance to all relevant codes, policies, and procedures. Our professional inspectors immediately document and report any deficiencies to the appropriate point of contact. We help make every project safe and code compliant."
        }
      },
      ["42"]: {
        title: "Peer Reviews and Code Consulting",
        image: require("../images/buildingcoepeerreviews.jpg"),
        sortorder: 4,
        overview: {
          title: "Building Code - Peer Reviews and Code Consulting",
          description:
            "Sunrise Engineering provides peer review and code consulting services for any size of project. Clients reach out from various sources such as government agencies, municipalities, counties, and private entities. These clients request our review/consulting services for a vast range of projects, from residential single-family homes to commercial high-rise hotels, schools, hospitals, industrial facilities, and shopping complexes."
        }
    },
      ["38"]: {
        title: "Zoning and Land Use Management",
        image: require("../images/giszoningandlandusemanagement.jpg"),
        sortorder: 4,
        overview: {
          title: "Building Code - Zoning and Land Use Management",
          description:
            "Accessibility of Cloud SMART data is key to those who use it. Quickly search by name or address in a simple online application and understand the value of having this information presented in a manner that is easily interpreted. Cloud SMART GIS can display topographic data, share zoning maps, and host aerial imagery. City governments can conceptualize zoning district changes and link ordinance documentation to those districts in real-time. Empower communities with real world information."
        }
    },
      ["39"]: {
        title: "Water Resource Management",
        image: require("../images/giswaterresourcemanagement.jpg"),
        sortorder: 5,
        overview: {
          title: "Building Code - Water Resource Management",
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
      icon: require("../images/building_code.png"),
      background: require("../images/sunrise-engineering-services-experience-building-code-services-150x150.jpg")
    };
    var disable = {
      projects: true
    };

    var config = {
      images: {
        icon: require("../images/natural_gas_icon.png"),
        background: require("../images/sunrise-engineering-services-experience-building-code-services-150x150.jpg")
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
