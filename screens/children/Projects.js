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
import SectionsPage from '../shared/pages/Sections.js'

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    var component_props = this.props.navigation.state.params;
    this.state = {
      projects: {},
      category: component_props.cat,
      loadProjects: false,
      loadComplete: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.projects();
  }

  projects(){
    var state_data = {};
    var fields = [
      // "slug",
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
      // "project_testimonials",
      // "slug"
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
          loadProjects: true,
          projects: state_data
        });
      })
      .then(() => {
        for (var sK in state_data) {
          if (state_data.hasOwnProperty(sK)) {
            var media = state_data[sK].featured_media;
            var source_url = this.getFeaturedImage(sK,media);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

    return state_data;
  };

  getFeaturedImage(project, id) {
    var image = null;
    fetch("https://sunrise-eng.com/wp-json/wp/v2/media/" + id +"?_embed")
      .then(res => res.json())
      .then(data => {
        image = data.source_url;
      })
      .then( () => {
        var ps = this.state.projects;
        ps[project].featured_image = image;
        this.setState({
          projects: ps
        })
     });
  }

  project_rows = () => {
    var cats = this.state.projects;
    var cat_items = [
      {
        title: 'Overview',
        images: {
          icon: require("../../images/natural_gas_icon.png"),
          background: require("../../images/head_background.png"),
          // featured_image: p.featured_image,
        }
      }
    ];

    for (var pK in cats) {
      if (cats.hasOwnProperty(pK)) {
        var p = cats[pK];
        if(p.featured_image) {
          cat_items.push({
            images: {
              icon: require("../../images/natural_gas_icon.png"),
              background: require("../../images/head_background.png"),
              featured_image: p.featured_image,
            },
            // title: this.props.navigation.state.params.cat_title,
            title: p.title.rendered,
            section: this.props.navigation.state.params.title,
            project: pK,
            link: 'Project'
          });
        }
      }
    }

    return cat_items;
  };

  render() {
    var sections = this.project_rows();
    var component_props = this.props.navigation.state.params;
    var config = {
        images: {
          icon: require("../../images/natural_gas_icon.png"),
          background: require("../../images/head_background.png")
        },
        title: component_props.title,
        subSectionTitle: component_props.cat_title,
        sections: sections
    }
    return (
      <SectionsPage
        content={config}
        master={this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overviewContainer: {
    padding: 25
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15
  },
  para: {
    fontSize: 16,
    marginBottom: 10
  }
});
