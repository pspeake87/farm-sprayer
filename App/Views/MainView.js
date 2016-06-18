import React, {Component, PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  StatusBar,
  MapView,
  TouchableOpacity} from 'react-native'
import FluxRouter from 'react-native-router-flux';

import { connect } from 'react-redux'

import * as ActionCreators from '../ActionCreators';
import {Actions, Scene, Router} from 'react-native-router-flux';
var {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;



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
});

class MainView extends Component {
  
  constructor(props) {
    super(props);

    watchID: (null: ?number),

    this.state = {
      lineWidth: 10,
      pathSprayed: [],
      region: {latitude: 32.47, longitude: -107.85, latitudeDelta: 0.002, longitudeDelta: 0.002 * ASPECT_RATIO},
      annotations: [],
      startBtn: true,
    }
  }

  componentDidMount() {
    var self = this;
    StatusBar.setHidden(true);

  }

  componentWillUnmount() {
   
  }
  

  startSpraying() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      
        this.getCurrentPosition(position);
    },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 100}
    );
    this.setState({
      startBtn: false
    });
  }

  stopSpraying() {
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({
        startBtn: true
    });
  }
 

  getCurrentPosition(position) {
        var markers = [
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            title: '',
            view: <View><Image style={{width:50, height:50}} source={require('../Assets/Images/tractor.png')} resizeMode={'contain'}/></View>
          }
        ];

        var newPathLocation = [{latitude: position.coords.latitude, longitude: position.coords.longitude}];
        var bob = newPathLocation.concat(this.state.pathSprayed);

         this.setState({
           pathSprayed: bob,
           annotations: markers,
           region: {latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.002, longitudeDelta:  0.002 * ASPECT_RATIO}
         });
  }

  onRegionChangeComplete(region) { 


    var lat = region.latitude * (Math.PI / 180)
    var d = region.longitudeDelta * 40075160 * Math.cos(lat) / 360
    var perPixel = d / width;
    var display = this.props.map.boom_width / perPixel;

    this.setState({
      lineWidth: display,
      region: region,
    });
  }

  startStopBtn() {
    if (this.state.startBtn) {
      return (
        <TouchableOpacity style={{flex: 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}} onPress={this.startSpraying.bind(this)}>
          <Text style={{fontSize: 30, color: 'white'}}>Start</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={{flex: 2, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}} onPress={this.stopSpraying.bind(this)}>
          <Text style={{fontSize: 30, color: 'white'}}>Stop</Text>
        </TouchableOpacity>
      );
    }
  }


  render() {
    return (

      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <MapView style={{flex: 8}}
          showsUserLocation={true}
          region={this.state.region}
          mapType={this.props.map.terrain}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
          overlays={[{
          coordinates: this.state.pathSprayed,
          strokeColor: '#f007',
          lineWidth: this.state.lineWidth,
          }]}
        </MapView>
       {this.startStopBtn()}
      </View>
    );
  }
}

MainView.propTypes = {
  boom_width: PropTypes.number,
  terrain: PropTypes.string,
  daylight_mode: PropTypes.boolean
}

function mapStateToProps(state) {
  const { map } = state
  return {
    map
  }
}

export default connect(mapStateToProps)(MainView)


