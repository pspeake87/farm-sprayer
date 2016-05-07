/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  StatusBar,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  MapView,
  TouchableOpacity
} from 'react-native';

const Main = require('./App/Views/Main.js')

class farmSprayer extends Component {

  componentDidMount() {
    StatusBar.setHidden(true);
  }


  render() {
    return (

      <View style={{flex: 1}}>
        <Main/>
      </View>
    );
  }
}


AppRegistry.registerComponent('farmSprayer', () => farmSprayer);
