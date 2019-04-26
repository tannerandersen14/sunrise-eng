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
import PageHead from "../PageHead.js";
import Menu from "../Menu.js";
export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      project: this.props.content.project,
      loadProjects: false,
      loadComplete: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.project();
  }

  project() {
    var state_data = {};
    var fields = [
      // "slug",
      "title",
      "id",
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
      "project_images"
      // "project_testimonials",
      // "slug"
    ];

    fetch(
      "https://sunrise-eng.com/wp-json/wp/v2/projects/" +
        this.props.content.project
    )
      .then(res => res.json())
      .then(data => {
        state_data = data;
      })
      .then(() => {
        this.setState({
          data: state_data
        });
      })
      .catch(err => {
        console.log(err);
      });

    return state_data;
  }

  render() {
    var infoComponents = [];
    var servicesComponents = [];
    var highlightComponents = [];
    var data = this.state.data;
    var info_component = null;
    var services_component = null;
    var highlight_component = null;

    if (data.project_details_project_client) {
      infoComponents.push(
        <View key="client" style={styles.listItem}>
          <Text style={styles.header}>Client</Text>
          <Text>{data.project_details_project_client}</Text>
        </View>
      );
    }

    if (data.project_details_project_location) {
      infoComponents.push(
        <View key="location" style={styles.listItem}>
          <Text style={styles.header}>Location</Text>
          <Text>{data.project_details_project_location}</Text>
        </View>
      );
    }

    if (infoComponents.length > 0) {
      info_component = (
        <View key="info_component_section" style={styles.section}>
          {infoComponents}
        </View>
      );
    }

    if (data.services) {
      servicesComponents.push(
        <View key="services_title">
          <Text style={styles.header}>Services</Text>
        </View>
      );
      servicesComponents.push(
        <View key="services_description">
          <Text>{data.project_details_project_services}</Text>
        </View>
      );
      services_component = (
        <View key="services_section" style={styles.section}>
          {servicesComponents}
        </View>
      );
    }

    if (data.project_highlights_0_project_highlight) {
      highlightComponents.push(
        <View key="hightlights_title">
          <Text style={styles.header}>Project Highlights</Text>
        </View>
      );
      for (var i = 0; i < 9; i++) {
        if (data["project_highlights_" + i + "_project_highlight"]) {
          highlightComponents.push(
            <View key={i} class={styles.highlights_section}>
              <Text>
                {data["project_highlights_" + i + "_project_highlight"]})
              </Text>
            </View>
          );
        }
      }
      highlight_component = (
        <View key="project_hightlights_section" style={styles.section}>
          {highlightComponents}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <PageHead
            height="400"
            images={this.props.content.images}
            title={this.props.content.title}
            section={this.props.content.section}
          />
        </View>

        <ScrollView contentContainerStyle={styles.overviewContainer}>
          <View>
            <Text style={styles.clientTitle}>
              {data.project_details_project_client}
            </Text>
          </View>
          {info_component}
          {services_component}
          {highlight_component}
        </ScrollView>
        <View style={styles.controls}>
          <View>
            <Text style={styles.controls_control}>prev</Text>
          </View>
          <View>
            <Text style={styles.controls_control}>next</Text>
          </View>
        </View>
        <View style={styles.menu}>
          <Menu icon={this.props.content.images.icon} menu={this.props.menu} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  overviewContainer: {
    padding: 20
  },
  clientTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 15
  },
  header: {
    fontWeight: "600",
    fontSize: 16,
    marginRight: 20
  },
  subSectionTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    padding: 20,
    textTransform: "uppercase",
    fontWeight: "600"
  },
  subSectionList: {
    marginBottom: 75
  },
  subSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingBottom: 10
  },
  section: {
    flex: 1,
    flexShrink: 0,
    fontSize: 16,
    flexDirection: "column",
    marginTop:20,
    marginBottom:5,
    alignItems: "flex-start"
  },
  highlights_section: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column"
  },
  subImageContainer: {
    height: "80%",
    width: "100%"
  },
  subImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  subImageTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "500"
  },
  menu: {
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  controls: {
    width: '100%',
    height: 50
  },
  controls_control: {
    marginRight: 10,
    marginLeft: 10
  }
});
