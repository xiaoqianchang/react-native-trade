/**
 * 圈子评论列表页
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ListView,
  TouchableHighlight,
  Platform,
  RefreshControl,
  ToastAndroid
} from 'react-native';

export default class SocialCommentList extends Component {
  statics: {
    title: '<RefreshControl>',
    description: 'Adds pull-to-refresh support to a scrollview.'
  }

  constructor() {
    super();
    // ToastAndroid.show('欢迎来查看评论哟', ToastAndroid.SHORT);
    // 构造假数据(从网络获取、从前面页面传过来)
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      refreshing: false,
      loaded: 0,
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 10; ii++) {
        var pressedText = pressData[ii] ? ' (pressed)' : '';
        dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    return (
      <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={imgSource} />
          <Text style={styles.text}>
            {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
          </Text>
        </View>
      </View>
    );
  }

  // 渲染分割线
  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}/>
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});

    setTimeout(() => {
       this.setState({
         loaded: this.state.loaded + 10,
         refreshing: false,
         dataSource: this.state.dataSource.cloneWithRows(this._genRows({})),
       });
       console.log(this.state.loaded);
     }, 100);
  }

  render() {
    return (
      <View style = {styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeparator}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          style={styles.listView}
          initialListSize={10} // 指定在组件刚挂载的时候渲染多少行数据
          pageSize={10}  // 每次事件循环（每帧）渲染的行数。
          refreshControl={
          <RefreshControl refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
          />
      </View>
    );
  }
}

var THUMB_URLS = [
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
    require('../images/iconlogo.png'),
  ];
var LOREM_IPSUM = '我是一个SB！';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5E6',
    marginTop: Platform.OS === 'android' ? 0 : 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 32,
    height: 32,
  },
  text: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 10,
  },
});
