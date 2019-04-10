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
        this.state = {
            refreshing: false,
            data: [],
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MasonryList
                    ref={'list'}
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
        let api = `http://d.api.budejie.com/topic/list/zuixin/41/bs0315-ios-4.5.9/${np}-20.json`
        fetch(api)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    refreshing: false,
                    data: jsonData.list,
                    np: jsonData.info.np || 0,

                })
            });
    }

    _onEndReached = () => {
        // const { api } = this.props;
        // fetch(api(this.state.np))
        const {np} = this.state
        let api = `http://d.api.budejie.com/topic/list/zuixin/41/bs0315-ios-4.5.9/${np}-20.json`
        fetch(api)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    data: [...this.state.data, ...jsonData.list],
                    np: jsonData.info.np,
                })
            });
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
          onPress = {()=>{this._onPressContent(item)}}
          item = {item}
          height={itemHeight}
          />
        )
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