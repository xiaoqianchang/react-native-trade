/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Platform,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import Main from './midas/main';

class TradeApp extends Component {
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  // Android平台返回键处理返回栈
  onBackAndroid = () => { //把方法直接作为一个arrow function的属性来定义，初始化的时候就绑定好了this指针
    var _this = this;
    const nav = _this.props.navigator;
    const routers = 5// nav.getCurrentRoutes(); // 这里有待改进，当前伟岸取不到navigator
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  };

  render() {
    return (
		<Main />
    );
  }
}

AppRegistry.registerComponent('TradeApp', () => TradeApp);
