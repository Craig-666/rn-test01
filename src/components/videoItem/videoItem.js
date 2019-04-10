import React, { Component } from 'react'
import { TouchableOpacity, Icon, Text, Dimensions, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import PlacehoderImage from '../MasonryList/PlaceholderImage'
const {width, height} = Dimensions.get('window');

const itemWidth = (width - 16) / 2;

export default class VideoItem extends Component {
    constructor() {
        super();
        this.state = {
            contentDidLoad: false,
        }
    }
    render() {
      const {item,height} = this.props
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.onPress()}
            style={styles.item}>
                <PlacehoderImage
                    source={{uri: item.video.thumbnail[0]}}
                    style={{width: itemWidth, height: height, borderRadius: 4}}
                />
                <View style={styles.imgInfo}>
                    <Text>{item.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  item: {
      margin: 4,
  },
  itemText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 30,
      backgroundColor: '#0002',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4
  },
  imgInfo:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      height:40,
      paddingHorizontal: 10,
  }
})
