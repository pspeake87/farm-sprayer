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

const timer = require('react-native-timer');
import MapView from 'react-native-maps';
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

module.exports = class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathSprayed: [],
      region: {latitude: 32.47, longitude: -107.85, latitudeDelta: 0.001, longitudeDelta: 0.001 * ASPECT_RATIO},
      annotations: []
    }
  }

  componentDidMount() {
    var self = this;
    StatusBar.setHidden(true);


  }

  componentWillUnmount() {
    timer.clearInterval("foo");
  }

  startSpraying() {
    timer.setInterval('foo', this.triggerPostion.bind(this), 1000);
  }

  stopSpraying() {
    timer.clearInterval("foo");
  }

  triggerPostion() {
    navigator.geolocation.getCurrentPosition((position) => {
      
        this.getCurrentPosition(position);
    },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
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
           region: {latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.001, longitudeDelta:  0.001 * ASPECT_RATIO}
         });
  }




  render() {
    return (

      <View style={{flex: 1}}>
        <View style={{flex: 1}}></View>
        <MapView style={{flex: 8}}
          showsUserLocation={true}
          mapType={'satellite'}
          region={this.state.region}>
          <MapView.Polyline
            coordinates={this.state.pathSprayed}
            strokeColor="rgba(0,0,200,0.5)"
            strokeWidth={4}
          />
        </MapView>
       <TouchableOpacity style={{flex: 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}} onPress={this.startSpraying.bind(this)}>
        <Text style={{fontSize: 30, color: 'white'}}>Start</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{flex: 1, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center'}} onPress={this.stopSpraying}>
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
