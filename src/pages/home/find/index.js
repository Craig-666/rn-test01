import React, {Component} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity,Platform} from "react-native";
import {Icon,SegmentedControl} from '@ant-design/react-native'
import MasonryList from '../../../components/MasonryList/index';
import VideoCard from '../../../components/videoItem/videoItem';

const {width, height} = Dimensions.get('window');

const itemWidth = (width - 16) / 2;

const secToTime = (s) => {
    let h = 0, m = 0;
    if (s > 60) {
        m = parseInt(s / 60);
        s = parseInt(s % 60);
        if (m > 60) {
            h = parseInt(i / 60);
            m = parseInt(i % 60);
        }
    }
    // 补零
    const zero = (v) => {
        return (v >> 0) < 10 ? ("0" + v) : v;
    };
    return (h === 0 ? [zero(m), zero(s)].join(":") : [zero(h), zero(m), zero(s)].join(":"));
}

const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
export default class ContentWaterfall extends React.Component {
    static navigationOptions = ({navigation}) =>{
        return {
            headerTitleStyle:{
                alignSelf:'center',
                textAlign: 'center',
                flex:1,
            },
            headerTitleContainerStyle:{
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
            headerTitle: <SegmentedControl
                style={{width:140}}
                tintColor={'#f4511e'}
                values={['发现', '附近']}
                onChange={navigation.getParam('_onSegChange')}
                onValueChange={navigation.getParam('_onValueChange')}
            />,
            headerLeft: (
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft: 10}} onPress={() => alert('关注')}>
                    <Text style={{color:'#f4511e'}}><Icon color={'#f4511e'} name={'heart'}/>关注</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity activeOpacity={0.7} style={{width: 30}} onPress={() => alert('search')}>
                    <Icon color={'#f4511e'} name={'search'}/>
                </TouchableOpacity>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.hasPlayed = false
        this.state = {
            refreshing: false,
            data: [],
            play:0,
            np: 0,
        }
    }

    componentDidMount = () => {
        this.onRefreshing();
    }

    _onSegChange =(v)=>{
        alert(v)
    }
    _onValueChange = (v)=>{
        alert(v)
    }

    _onMomentumScrollEnd = ()=>{
        // alert()
    }
    _playItemVideo(id){
      const {play} = this.state
      console.log('play-',play,id);

      id == play
      ?null
      :this.setState({
        play:id
      })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MasonryList
                    ref={'list'}
                    playItemVideo={(id)=>{this._playItemVideo(id)}}
                    data={this.state.data}
                    numColumns={2}
                    renderItem={this._renderItem}
                    getHeightForItem={this._getHeightForItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onEndReached={this._onEndReached}
                    keyExtractor={this._keyExtractor}
                />
            </SafeAreaView>
        )
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        })
        // const { api } = this.props;
        const {np} = this.state
      let fakeData = {
        "status": 9,
        "rating": "4",
        "cate": "",
        "tags": [{
          "post_number": 1322896,
          "image_list": "http://img.spriteapp.cn/ugc/2017/06/b85ce2344a7d11e791b6842b2b4c75ab.png",
          "forum_sort": 0,
          "forum_status": 2,
          "id": 55163,
          "info": "",
          "name": "\u4e3b\u7248\u5757",
          "colum_set": 2,
          "tail": "\u59d0\u592b(\u4e71\u9009\u5206\u7c7b\u4f1a\u88ab\u7248\u4e3b\u5220\u5e16\u54e6)",
          "sub_number": 93490,
          "display_level": 0
        }],
        "bookmark": "0",
        "text": "没有借口就是最好借口",
        "is_best": 0,
        "video_signs": 0,
        "share_url": "http://a.f.budejie.com/share/29381184.html?wx.qq.com",
        "up": "58",
        "down": 4,
        "forward": 0,
        "u": {
          "header": ["https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg", 
          "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"],
          "relationship": 0,
          "uid": "23017420",
          "is_vip": false,
          "is_v": false,
          "room_url": "",
          "room_name": "",
          "room_role": "",
          "room_icon": "",
          "name": "\u989c\u738b\u7237"
        },
        "passtime": "2019-04-11 09:26:45",
        "video": {
          "playfcount": 1,
          "height": 480,
          "width": 852,
          "video": ["http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"
          , "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
           "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"],
          "download": ["http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
           "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
            "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"],
          "duration": 64,
          "playcount": 83,
          "thumbnail": ["https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg", 
          "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"],
          "thumbnail_small": ["http://wimg.spriteapp.cn/crop/150x150/picture/2019/0411/a302257e-5bf7-11e9-b3f2-1866daeb0df1_wpd.jpg", 
          "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"]
        },
        "type": "video",
        "id": "29381184",
        "comment": "0"
      }
      let fakeList = []
      for (let i = 0; i < 10; i++) {
        fakeData.video.thumbnailpic = 'https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock'+i+'.jpg'
        fakeList.push(fakeData)
      }
      this.setState({
        refreshing: false,
        data: fakeList,
        np: 0,
    })
       
    }

    _onEndReached = () => {
        // const { api } = this.props;
        // fetch(api(this.state.np))
        const {np} = this.state
        let fakeData = {
          "status": 9,
          "rating": "4",
          "cate": "",
          "tags": [{
            "post_number": 1322896,
            "image_list": "http://img.spriteapp.cn/ugc/2017/06/b85ce2344a7d11e791b6842b2b4c75ab.png",
            "forum_sort": 0,
            "forum_status": 2,
            "id": 55163,
            "info": "",
            "name": "\u4e3b\u7248\u5757",
            "colum_set": 2,
            "tail": "\u59d0\u592b(\u4e71\u9009\u5206\u7c7b\u4f1a\u88ab\u7248\u4e3b\u5220\u5e16\u54e6)",
            "sub_number": 93490,
            "display_level": 0
          }],
          "bookmark": "0",
          "text": "没有借口就是最好借口",
          "is_best": 0,
          "video_signs": 0,
          "share_url": "http://a.f.budejie.com/share/29381184.html?wx.qq.com",
          "up": "58",
          "down": 4,
          "forward": 0,
          "u": {
            "header": ["https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg", 
            "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"],
            "relationship": 0,
            "uid": "23017420",
            "is_vip": false,
            "is_v": false,
            "room_url": "",
            "room_name": "",
            "room_role": "",
            "room_icon": "",
            "name": "\u989c\u738b\u7237"
          },
          "passtime": "2019-04-11 09:26:45",
          "video": {
            "playfcount": 1,
            "height": 480,
            "width": 852,
            "video": ["http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"
            , "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
             "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"],
            "download": ["http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
             "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4",
              "http://1256579377.vod2.myqcloud.com/86762676vodcq1256579377/25eb9dd65285890787760980017/ibapZCxqNa8A.mp4"],
            "duration": 64,
            "playcount": 83,
            "thumbnail": ["https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg", 
            "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"],
            "thumbnail_small": ["http://wimg.spriteapp.cn/crop/150x150/picture/2019/0411/a302257e-5bf7-11e9-b3f2-1866daeb0df1_wpd.jpg", 
            "https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock0.jpg"]
          },
          "type": "video",
          "id": "29381184",
          "comment": "0"
        }
        let fakeList = []
        for (let i = 0; i < 10; i++) {
        fakeData.video.thumbnail[0] = 'https://linshang2018-1256579377.cos.ap-guangzhou.myqcloud.com/live/cock'+i+'.jpg'

          fakeList.push(fakeData)
        }
        this.setState({
          data: [...this.state.data, ...fakeList],
          np: 12,
      })
       
    }

    _keyExtractor = (item, index) => {
        return item.text + index;
    }

    _getHeightForItem = ({item}) => {
        return Math.max(itemWidth, itemWidth / item.video.width * item.video.height);
    }

    _renderItem = ({item}) => {
        const itemHeight = this._getHeightForItem({item});
        return (
          <VideoCard 
          play={this.state.play}
          askPlay={()=>this.askPlay()}
          onNeedPlay={this._onNeedPlay}
          onPress = {()=>{this._onPressContent(item)}}
          item = {item}
          height={itemHeight}
          />
        )
    }
    _onNeedPlay=()=>{
      if (this.hasPlayed) {
        
      }
    }
    askPlay = () =>{
      if (this.hasPlayed) {
        return false  
      }
      this.hasPlayed = true
      setTimeout(() => {
        this.hasPlayed = false
      }, 100);
      return true
    }
    _onPressContent = (item) => {
        this.props.navigation.navigate('Detail', {item: item});
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