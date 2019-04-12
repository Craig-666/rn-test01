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
        this.picurl=this.randomNum(0,40)
    }
    componentWillReceiveProps(np){
      if (np.play !== this.props.play) {
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
    randomNum(minNum,maxNum){ 
      switch(arguments.length){ 
          case 1: 
              return parseInt(Math.random()*minNum+1,10); 
          break; 
          case 2: 
              return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
          break; 
              default: 
                  return 0; 
              break; 
      } 
  } 
    render() {
        const {item, height} = this.props
        const {id} = item
        const {play} = this.state
      let urls = [
      'http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4',
      'http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25a3cd595285890787760941185/zrHmydLH3F0A.mp4',
      'http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25de7d615285890787760979227/ES7m2U0ZIJYA.mp4',
      'http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25a34d745285890787760940460/V7ACRlqwZeQA.mp4',
      ]
      let url = urls[this.randomNum(0,3)]
      const {picurl} = this
      
      console.log('rdmmmm',picurl);
        return (
            <TouchableOpacity
                ref = {'chatView'}
                activeOpacity={0.7}
                onPress={() => this.props.onPress()}
                style={styles.item}>
                {play
                    ? <Video muted={true} style={{width: itemWidth, height: height, borderRadius: 4}} source={{uri:url}}/>
                    // ? <View style={{width: itemWidth, height: height, borderRadius: 4}} source={{uri:item.video.video[1]}}></View>
                    : <PlacehoderImage
                        source={{uri: `https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock${picurl}.jpg`}}
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
