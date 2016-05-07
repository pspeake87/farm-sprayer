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
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';


import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

module.exports = class Main extends Component {


  constructor(props) {
    super(props);

    watchID: (null: ?number),

    this.state = {
      
      pathSprayed: [],
      region: {latitude: 32.47, longitude: -107.85, latitudeDelta: 0.001, longitudeDelta: 0.001 * ASPECT_RATIO},
      annotations: [],
      line: 0
    }
  }

  componentDidMount() {
    var self = this;
    StatusBar.setHidden(true);

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(id);
  }

  startSpraying() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      
        this.getCurrentPosition(position);
    },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  stopSpraying() {
    navigator.geolocation.clearWatch(this.watchID);
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
    var display = 5 / perPixel;
    this.setState({
      region: region,
      line: display
    });
   
  }


  render() {
    return (

      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <MapView style={{flex: 8}}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
          <MapView.Polyline
            coordinates={this.state.pathSprayed}
            strokeColor="rgba(0,200,0,0.5)"
            strokeWidth={this.state.line}
          />
        </MapView>
       <TouchableOpacity style={{flex: 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}} onPress={this.startSpraying.bind(this)}>
        <Text style={{fontSize: 30, color: 'white'}}>Start</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'}} onPress={this.stopSpraying.bind(this)}>
        <Text  style={{fontSize: 25, color: 'white'}}>Menu</Text>
       </TouchableOpacity>

      </View>
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
});
