import React, {Component} from 'react';
import {Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity,SegmentedControlIOS} from "react-native";
import {Icon,SegmentedControl} from '@ant-design/react-native'
import MasonryList from '../../../components/MasonryList/index';
import PlacehoderImage from '../../../components/MasonryList/PlaceholderImage';

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
    static navigationOptions = ({navigation}) =>{
        return {
            headerTitle: <SegmentedControl
                style={{width:140}}
                tintColor={'#f4511e'}
                values={['发现', '附近']}
                onChange={navigation.getParam('onSegChange')}
                onValueChange={navigation.getParam('onValueChange')}
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

    onSegChange =(v)=>{
        alert(v)
    }
    onValueChange = (v)=>{
        alert(v)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MasonryList
                    data={this.state.data}
                    numColumns={2}
                    renderItem={this._renderItem}
                    getHeightForItem={this._getHeightForItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    onEndReachedThreshold={0.5}
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
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this._onPressContent(item)}
                style={styles.item}>
                <PlacehoderImage
                    source={{uri: item.video.thumbnail[0]}}
                    placeholder={{uri: 'placeholder'}}
                    style={{width: itemWidth, height: itemHeight, borderRadius: 4}}
                />
                {/*<View style={styles.itemText}>*/}
                    {/*<Text style={{color: '#fff'}}>{secToTime(item.video.duration)}</Text>*/}
                    {/*<Text style={{color: '#fff'}}>{item.comment}</Text>*/}
                {/*</View>*/}
                <View style={styles.imgInfo}>
                    <Text>小姐姐的铺子</Text>
                    <Icon name={'heart'} size={14} color={'red'}>5678</Icon>
                </View>
            </TouchableOpacity>
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