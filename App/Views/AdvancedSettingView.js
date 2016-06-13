import React from 'react';
import {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableHighlight,
} from "react-native"
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const AdvancedSettingView = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      
      <View style={{flex: 1}}></View>
      
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Boom Width:
        </Text>
        </View>
        <View style={{flex: 1, padding: 5}}>
        <TextInput
          style={{
            height: 30, 
            width: 100,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: "rgba(0,0,0,0.1)",
          }}
          placeholder={'Type here'}
          placeholderTextColor={"rgba(198,198,204,1)"}
          onChangeText={(text) => {this.setState({text})}}
          onSubmitEditing={() => {this.setState({text: ''})}}
          value={(this.state && this.state.text) || ''}
        />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Daylight Mode
        </Text>
        </View>
        <View style={{flex: 1, padding: 5}}>
        <Switch
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
              this.setState({switchValue: value})
            }}
          // Color props are iOS-only
          // thumbTintColor={'white'} // Removes shadow
          tintColor={"rgba(230,230,230,1)"}
          onTintColor={"rgba(68,219,94,1)"}
          />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Daylight Mode
        </Text>
        </View>
        <View style={{flex: 1, padding: 5}}>
        <Switch
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
              this.setState({switchValue: value})
            }}
          // Color props are iOS-only
          // thumbTintColor={'white'} // Removes shadow
          tintColor={"rgba(230,230,230,1)"}
          onTintColor={"rgba(68,219,94,1)"}
          />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Daylight Mode
        </Text>
        </View>
        <View style={{flex: 1, padding: 5}}>
        <Switch
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
              this.setState({switchValue: value})
            }}
          // Color props are iOS-only
          // thumbTintColor={'white'} // Removes shadow
          tintColor={"rgba(230,230,230,1)"}
          onTintColor={"rgba(68,219,94,1)"}
          />
        </View>
      </View>
      <View style={{flex: 1}}></View>
      <View style={{flex: 1}}></View>
 
    </View>
  );
};



export default AdvancedSettingView;