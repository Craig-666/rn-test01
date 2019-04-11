import React, {Component} from 'react'
import {TouchableOpacity, Icon, Text, Dimensions, View, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import PlacehoderImage from '../MasonryList/PlaceholderImage'
import Video from "react-native-video";

const {width, height} = Dimensions.get('window');

const itemWidth = (width - 16) / 2;

export default class VideoItem extends Component {
    constructor() {
        super();
        this.state = {
            contentDidLoad: false,
            play:false
        }
    }
    componentWillReceiveProps(np){
      if (np.play == this.props.play) {

      this.getLayout()
      }
    }
    getLayout(){
      let self = this
      this.refs.chatView.measure((x,y,width,height,pageX, pageY) => {
        const {play} = this.state
        if (pageY >0 && 500>pageY) {
          let shouldPlay = this.props.askPlay()
          console.log('aisss',shouldPlay);
          // 1 如果在屏幕内而且在播放
          if (shouldPlay) {
            console.log('playyyyy');
            this.setState({
              play:true
            })
          }
        }else if(play){
          // 3 如果不在屏幕内但是在播放
          this.setState({
            play:false
          })
        }

      })
    }
  
    render() {
        const {item, height} = this.props
        const {id} = item
        const {play} = this.state
        return (
            <TouchableOpacity
                ref = {'chatView'}
                activeOpacity={0.7}
                onPress={() => this.props.onPress()}
                style={styles.item}>
                {play
                    // ? <Video style={{width: itemWidth, height: height, borderRadius: 4}} source={{uri:item.video.video[1]}}/>
                    ? <View style={{width: itemWidth, height: height, borderRadius: 4}} source={{uri:item.video.video[1]}}></View>
                    : <PlacehoderImage
                        source={{uri: item.video.thumbnail[0]}}
                        style={{width: itemWidth, height: height, borderRadius: 4}}
                    />
                }

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
    imgInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 40,
        paddingHorizontal: 10,
    }
})
