import React, { Component } from 'react'
import {TextInput,TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native'
var {height,width} =  Dimensions.get('window');

export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      watch:100,
      charts:[{
        name:"小张",
        text:"好漂亮👏👏👏👏"
      },
      {
        name:"小张",
        text:"好漂亮👏👏👏👏"
      },
      {
        name:"小张",
        text:"好漂亮👏👏👏👏"
      }]
    };

  }
  videoError(e){
    console.log('verror',e);
  }
  renderDanmu(){
    let dms = []
    const {charts} = this.state
    charts.map((e,i)=>{
      dms.push(
        <View key={'dm'+i} style={styles.dmText}>
          <Text>{e.name + " : "}</Text>
          <Text>{e.text}</Text>
        </View>
      )
    })
    return dms
  }
  onBuffer(e){
    console.log('onBuffer',e);
  }
  onPressButton(e){
      console.log('clock');
  }
  render(){
    return(
      <View>
         <Video
            source={{
              uri: 'http://live6.plus.hebtv.com/cctv12/sd/live.m3u8',
            }}
            ref={(ref) => {
              this.player = ref
            }}  
            fullscreen={true}
              resizeMode={'none'}
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo}//组件样式
            />
                <View style = {styles.videoView}>
                  <View style={styles.topView}>
                    <View style={styles.zhubo}>
                      <View style={styles.avtor}>
                        <AntDesign name='user' size={30} color={'#fff'}/>
                      </View>
                      <Text style={styles.topText} >杭州公司直播</Text>
                    </View>
                    <View style={styles.videoInfo}>
                      <AntDesign name='user' size={20} color={'#f0f000'}/>
                      <AntDesign name='user' size={20} color={'#ff0000'}/>
                      <AntDesign name='user' size={20} color={'#0000ff'}/>

                      <Text>100人正在看直播</Text>
                      <AntDesign name='close' size={20} color={'#00ff00'}/>
                    </View>
                  </View>
                
                    
                    <View style = {styles.danmu}>
                      {this.renderDanmu()}
                    </View>
                    <View style={styles.forms}>
                      <View>
                        <TextInput
                        style={styles.input}
                              editable = {true}
                              maxLength = {40}
                            />
                      </View>
                      
                        <View style = {styles.btns}>
                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='sharealt' size={30} color={'#f1aaa6'}/>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='gift' size={30} color={'#f1aaa6'}/>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='wallet' size={30} color={'#f1aaa6'}/>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='heart' size={30} color={'#ff6e97'}/>
                        </TouchableHighlight>
                        </View>
                    </View>
                </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  topText:{
    marginLeft:10,
    lineHeight:45,
  },
  topView:{
    justifyContent:'space-between',
    flexDirection:'row',
    padding:20,
  },
  avtor:{
    justifyContent:'center',
    alignItems:'center',
    height:45,
    width:45,
    borderRadius:22,
    backgroundColor:'#000',
    borderColor:'#ccc',
    borderWidth:1,
  },
  btns:{
    width:100,
    flexDirection:"row",
    justifyContent:'center',
  },
  btmBtn:{
    marginRight:10
  },
  input:{
    flex:1,
    width:120,
    display:'flex',
    borderColor:'#fff',
    borderWidth:0,
    borderBottomWidth:1,
    fontSize:20,
  },
  dmText:{
    flexDirection:'row',
    marginTop:20,
    backgroundColor:"rgba(152, 152, 152, 0.8)",
    borderRadius:10
  },
  backgroundVideo:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    width:"100%",
    backgroundColor:"#ccc",
  },
  forms:{
    position:'absolute',
    flexDirection:"row",
    justifyContent:'space-between',
    height:30,
    left:30,
    right:30,
    bottom:55,
  },
  danmu:{
    flexDirection:'column-reverse',
    position:'absolute',
    height:300,
    left:30,
    right:200,
    bottom:100,
  },
  videoView:{
    top:30,
    left:0,
    height:"100%",
    width:"100%",
    flexDirection:"column"
  },
  videoInfo:{
    flexDirection:'row',
    lineHeight:45,
  },
  zhubo:{
    flexDirection:'row',
    justifyContent:"center"
  },
 
})