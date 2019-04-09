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
        name:"刘备份-👑👑",
        text:"好漂亮👏👏👏👏"
      },
      {
        name:"关羽扇纶巾",
        text:"东西不错，贵不贵"
      },
      {
        name:"张飞机",
        text:"好吃再来"
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
          <Text style={styles.dmiText}>{e.name + ":"+e.text}</Text>
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
                      <View style={styles.avtorText}>
                        <Text style={styles.topText} >杭州公司直播</Text>
                        <Text style={styles.zaixian} >100人在线</Text>
                      </View>
                    </View>
                    <View style={styles.videoInfo}>
                      <AntDesign name='smile-circle' size={20} color={'#fff'}/>
                      <AntDesign name='smile-circle' size={20} color={'#fff'}/>
                      <AntDesign name='smile-circle' size={20} color={'#fff'}/>
                      <Text style={styles.watching}>100人正在看直播</Text>
                    </View>
                  </View>
                
                    
                    <View style = {styles.danmu}>
                      {this.renderDanmu()}
                    </View>
                    <View style={styles.forms}>
                      <View style={styles.inputView}>
                      <AntDesign name='message1' size={22} color={'#fff'}/>
                        <TextInput
                        style={styles.input}
                              editable = {true}
                              maxLength = {40}
                            />
                      </View>
                      
                        <View style = {styles.btns}>
                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='sharealt' size={22} color={'#fff'}/>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='gift' size={22} color={'#fff'}/>
                        </TouchableHighlight>


                        <TouchableHighlight style={styles.btmBtn} onPress={this.onPressButton()}>
                          <AntDesign name='heart' size={22} color={'#ec4e6b'}/>
                        </TouchableHighlight>
                        </View>
                    </View>
                </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inputView:{
    height:32,
    borderRadius:16,
    padding:5,
    backgroundColor:"rgba(100, 100, 100, 0.6)",
  },
  topText:{
    marginLeft:10,
    fontSize:15,
    color:'#fff'
  },
  watching:{
    color:'#fff'

  },
  zaixian:{
    fontSize:13,
    marginLeft:10,
    color:'#fff'
  },
  avtorText:{
    height:37,
    flexDirection:'column',
    justifyContent:'space-around',

  },
  topView:{
    justifyContent:'space-between',
    flexDirection:'row',
    height:37,
  },
  avtor:{
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    height:36,
    width:36,
    borderRadius:18,
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
    height:36,
    width:36,
    borderRadius:18,
    backgroundColor:"rgba(100, 100, 100, 0.6)",
    marginRight:8,
    padding:7,
    marginLeft:8
  },
  input:{
    flex:1,
    width:120,
    display:'flex',
    color:'#fff',
    borderWidth:0,
    fontSize:20,
  },
  dmiText:{
    color:'#fff'
  },
  dmText:{
    flexDirection:'row',
    marginTop:8,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    color:'#fff',
    paddingRight:10,
    backgroundColor:"rgba(100, 100, 100, 0.6)",
    borderRadius:10
  },
  backgroundVideo:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    width:"100%",
    backgroundColor:"#000",
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
    width:200,
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
    marginRight:20,
    justifyContent:"space-between",
    lineHeight:45,
  },
  zhubo:{
    flexDirection:'row',
    justifyContent:"center"
  },
 
})