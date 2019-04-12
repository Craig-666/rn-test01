import React, {Component} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import {Icon, SegmentedControl} from '@ant-design/react-native'
import MasonryList from '../../../components/MasonryList/index';
import VideoCard from '../../../components/videoItem/videoItem';
import {fetchData} from "../../../utils/fetch";

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

export default class ContentWaterfall extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
            },
            headerTitle: <SegmentedControl
                style={{width: 140}}
                tintColor={'#f4511e'}
                values={['发现', '附近']}
                onChange={navigation.getParam('_onSegChange')}
                onValueChange={navigation.getParam('_onValueChange')}
            />,
            headerLeft: (
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft: 10}} onPress={() => alert('关注')}>
                    <Text style={{color: '#f4511e'}}><Icon color={'#f4511e'} name={'heart'}/>关注</Text>
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
            play: 0,
            np: 0,
        }
    }

    componentDidMount = () => {
        this.onRefreshing();
    }

    _onSegChange = (v) => {
        alert(v)
    }
    _onValueChange = (v) => {
        alert(v)
    }

    _onMomentumScrollEnd = () => {
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
        let api = `http://d.api.budejie.com/topic/list/zuixin/41/bs0315-${Platform.OS}-4.5.9/${np}-20.json`
        // let api = `http://192.168.101.39:9001/server/backstage/admin/list`
        fetchData(api).then(res => {

            this.setState({
                refreshing: false,
                data: res.list,
                np: res.info.np,
            })
        }).catch(err => {
            alert(err)
        })
    }

    _onEndReached = () => {
        // const { api } = this.props;
        // fetch(api(this.state.np))
        const {np} = this.state
        let api = `http://d.api.budejie.com/topic/list/zuixin/41/bs0315-${Platform.OS}-4.5.9/${np}-20.json`
        fetchData(api).then(res => {
            this.setState({
                data: [...this.state.data, ...res.list],
                np: res.info.np,
            })
        }).catch(err => {
            alert(err)
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