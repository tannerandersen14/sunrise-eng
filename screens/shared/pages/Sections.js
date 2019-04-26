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
import { withNavigation } from 'react-navigation';
import PageHead from '../PageHead.js';
import Menu from '../Menu.js';

class SectionsPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {

    var sections = this.props.content.sections.map((e,i) => {
        var imageComponent = null;
        if(e.images && e.images.featured_image) {
          imageComponent = <Image
            style={styles.subImage}
            source={{uri: e.images.featured_image}}
          />
        } else {
          imageComponent = <Image
            style={styles.subImage}
            source={e.pic}
          />
        }


        return <TouchableWithoutFeedback
          key={i}
          onPress={() => {
              if(e.link === 'Projects'){
                this.props.navigation.navigate('Projects', {
                    images: this.props.content.images,
                    title: this.props.content.title,
                    cat_title: e.title,
                    cat: e.cat
                })
              } else if (e.link === 'Project') {
                this.props.navigation.navigate('ProjectViewer', {
                    images: e.images,
                    title: e.title,
                    project: e.project,
                    section: e.section
                })
              } else {
                this.props.navigation.navigate(e.link, {
                    images: this.props.content.images,
                    title: this.props.content.title
                })
              }
          }}
        >
        <View key={i} style={styles.subSection}>
            <View style={styles.subImageContainer}>
              {imageComponent}
            </View>
            <Text style={styles.subImageTitle}>{e.title}</Text>
        </View>
        </TouchableWithoutFeedback>
    })

    return (
      <View style={styles.container}>
        <View>
          <PageHead images={this.props.content.images} title={this.props.content.title} />
        </View>
        <View>
          <Text style={styles.subSectionTitle}>{this.props.content.subSectionTitle}</Text>
        </View>
        <ScrollView style={styles.subSectionList}>
          {sections}
        </ScrollView>
        <View style={styles.menu}>
          <Menu icon={this.props.content.images.icon} menu={this.props.menu}/>
        </View>
      </View>
    );
  }
}

export default withNavigation(SectionsPage)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15
  },
  subSectionTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  subSectionList: {
    marginBottom: 75
  },
  subSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 1,
    height: 200,
    paddingBottom: 20
  },
  subImageContainer: {
    height: '80%',
    width: '100%'
  },
  subImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    marginRight: 50,
    marginLeft: 50
  },
  subImageTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
    fontWeight: '500'
  },
  menu: {
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0
  }
});
