/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Icon, SearchBar, TabBar,Button,Carousel,SegmentedControl, WhiteSpace} from "@ant-design/react-native";
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
    };
  }
  renderContent(pageText) {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <SearchBar placeholder="Search" showCancelButton />
          <Text style={{ margin: 50 }}>{pageText}</Text>
        </View>
    );
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }
  render() {
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="#f5f5f5"
        >
          <TabBar.Item
              title="Life"
              icon={<Icon name="home" />}
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => this.onChangeTab('blueTab')}
          >
            <View style={{ paddingHorizontal: 15 }}>
              <Text>horizontal</Text>
              <Carousel
                  style={styles.wrapper}
                  selectedIndex={2}
                  autoplay
                  infinite
                  afterChange={this.onHorizontalSelectedIndexChange}
              >
                <View
                    style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
                >
                  <Text>Carousel 1</Text>
                </View>
                <View
                    style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
                >
                  <Text>Carousel 2</Text>
                </View>
                <View
                    style={[
                      styles.containerHorizontal,
                      { backgroundColor: 'yellow' },
                    ]}
                >
                  <Text>Carousel 3</Text>
                </View>
                <View
                    style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}
                >
                  <Text>Carousel 4</Text>
                </View>
                <View
                    style={[
                      styles.containerHorizontal,
                      { backgroundColor: 'fuchsia' },
                    ]}
                >
                  <Text>Carousel 5</Text>
                </View>
              </Carousel>
              <Text>Carousel will adjust height based on content</Text>
              <Text>{React.Children.count(this.props.children)}</Text>
            </View>
          </TabBar.Item>
          <TabBar.Item
              icon={<Icon name="ordered-list" />}
              title="Koubei"
              badge={2}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => this.onChangeTab('redTab')}
          >
            {this.renderContent('Koubei Tab')}
          </TabBar.Item>
          <TabBar.Item
              icon={<Icon name="like" />}
              title="Friend"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => this.onChangeTab('greenTab')}
          >
            {this.renderContent('Friend Tab')}
          </TabBar.Item>
          <TabBar.Item
              icon={<Icon name="user" />}
              title="My"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => this.onChangeTab('yellowTab')}
          >
            <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
              <Text>Disabled</Text>
              <SegmentedControl values={['Segment1', 'Segment2']} disabled />
              <WhiteSpace size="lg" />
              <Text>TintColor and Style</Text>
              <SegmentedControl
                  values={['Segment1', 'Segment2', 'Segment3']}
                  tintColor={'#ff0000'}
                  style={{ height: 40, width: 280 }}
              />
              <WhiteSpace size="lg" />
              <Text>SelectedIndex</Text>
              <SegmentedControl
                  selectedIndex={1}
                  values={['Segment1', 'Segment2', 'Segment3']}
              />
              <WhiteSpace size="lg" />
              <Text>onChange/onValueChange</Text>
              <SegmentedControl
                  values={['Segment1', 'Segment2', 'Segment3']}
                  onChange={this.onChange}
                  onValueChange={this.onValueChange}
              />
            </View>
          </TabBar.Item>
        </TabBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});
