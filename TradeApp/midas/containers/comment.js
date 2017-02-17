/**
 * 发评论界面
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ToolbarAndroid,
  Navigator,
  MySceneComponent
} from 'react-native';

class CommentPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      sid:"",
      pla:"说点什么吧？"
    };
  }

  render() {
		return (
			<View>
				<View style={styles.box}>
					<ToolbarAndroid
            style={styles.toolbar}
            title="AwesomeApp"
            actions={[{title: 'Settings',icon: require('./images/article.png'), show: 'always'}]}
            onActionSelected={this.AjaxPost.bind(this)}
          />
				</View>

				<View style={styles.box}>
					<TextInput style={styles.comment} autoFocus = 'true' placeholder={this.state.pla} keyboardType="default" multiline  />
				</View>

        <View style={styles.box}>
					<ToolbarAndroid style={styles.toolbar}
            title="AwesomeApp"
            actions={[{title: 'Settings',icon: require('./images/article.png'), show: 'always'}]}
            onActionSelected={this.onActionSelected.bind(this)}
          />
				</View>

			</View>
		)
	}
  AjaxPost(){
    var _this=this;
    fetch('http://file.midasjr.com/play/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'phone=15601815671&password=123123&sid=""&rid=4&deviceid=D14448888832484539'
    })
    .then((response) => response.text())
    .then((responseText) => {
      var back=JSON.parse(responseText);
      _this.setState({sid:back.sid,pla:back.msg});
    })
    .catch((error) => {
      alert("错误");
      alert(error);
    })
  }
  onActionSelected(position){
    var _this=this;
      alert("老的sid=="+_this.state.sid);
    if(position==0){
      fetch('http://file.midasjr.com/play/forum/postartcomment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'sid='+_this.state.sid+'&rid=30&deviceid=D14448888832484539&articleid=2945&comment="评论的内容"'
      })
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
        var back=JSON.parse(responseText);
        _this.setState({pla:back.msg});
      })
      .catch((error) => {
        alert("错误");
        alert(error);
      })

    }
  }

}

const styles = StyleSheet.create({
  box: {
	 backgroundColor: '#fff',
  },
  toolbar:{
    height:60,
    backgroundColor:"#aaa"
  },
  comment:{
	  height: 350,
    lineHeight:20,
	  borderWidth:1,
	  borderStyle:"solid",
	  borderColor:"#333",
    backgroundColor: '#ccc',
  }
});

module.exports = CommentPage;
