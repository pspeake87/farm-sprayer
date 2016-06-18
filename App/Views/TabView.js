
import React from 'react';
import {PropTypes, Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as ActionCreators from '../ActionCreators';

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

class TabView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        
        <View style={{flex: 2}}></View>
        
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>

          <View style={{paddingRight: 20}}>
              <Text
              style={{
                paddingLeft: 10,
                color: 'black',
                fontSize: 17,
                fontWeight: 'normal',
                fontFamily: 'Helvetica Neue',
              }}>
              Boom Width:
            </Text>
          </View>

          <View style={{height: 30, width: 30, borderWidth: 1, borderColor: 'black',justifyContent: 'center', alignItems:'center'}}>
            <Text>-</Text>
          </View>

          <View>
            <TextInput
              style={{
                height: 30, 
                width: 50,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "rgba(0,0,0,0.1)",
              }}
              onChangeText={(text) => {this.setState({text})}}
              onSubmitEditing={() => {this.setState({text: ''})}}
              value={(this.state && this.state.text) || ''}
            />
          </View>

          <View style={{height: 30, width: 30, borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems:'center'}}>
            <Text>+</Text>
          </View>

        </View>

        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>
          <View style={{paddingRight: 20}}>
            <Text
            style={{
              paddingLeft: 10,
              color: 'black',
              fontSize: 17,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Terrain
          </Text>
          </View>
          <View>
          <Switch
            value={this.props.map.terrain}
            onValueChange={(value) => {
                this.props.dispatch(ActionCreators.updatingTerrain(value));
              }}
            // Color props are iOS-only
            // thumbTintColor={'white'} // Removes shadow
            tintColor={"rgba(230,230,230,1)"}
            onTintColor={"rgba(68,219,94,1)"}
            />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>
          <View  style={{paddingRight: 20}}>
            <Text
            style={{
              paddingLeft: 10,
              color: 'black',
              fontSize: 17,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Daylight Mode
          </Text>
          </View>
          <View>
            <Switch
              value={(this.props && this.props.map.daylight_mode) || false}
              onValueChange={(value) => {
                  this.props.dispatch(ActionCreators.updatingDaylightMode(value));
                }}
              tintColor={"rgba(230,230,230,1)"}
              onTintColor={"rgba(68,219,94,1)"}
              />
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>
          <View style={{flex: 1}}>
          <Button onPress={() => {Actions.refresh({key: 'sidemenu', open: false}); }}>Reset Field</Button>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Button onPress={() => {Actions.refresh({key: 'sidemenu', open: false}); }}>Advanced Settings</Button>
        </View>
         
        <View style={{flex: 2}}></View>
       
      </View>
    );
  };
};

TabView.propTypes = {
  path_line: PropTypes.number,
}

function mapStateToProps(state) {
  const { map } = state
  return {
    map
  }
}

export default connect(mapStateToProps)(TabView)
  



