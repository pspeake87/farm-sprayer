import React, {Component} from 'react';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {Router, Switch, Scene, Actions, DefaultRenderer} from 'react-native-router-flux';
import createLogger from 'redux-logger';
import Drawer from 'react-native-drawer';
import SideMenu from './Views/SideMenu';
import * as ActionCreators from './ActionCreators';
import OAuth2 from 'react-native-oauth2';
import persistentStorage from 'react-native-simple-store';
import moment from 'moment';

import MainView from './Views/MainView';
import TabView from './Views/TabView';
import AdvancedSetting from './Views/AdvancedSettingView';


const RouterWithRedux = connect()(Router);

// Per the redux documentation, we have a reducer
// that updates state based on all the actions that
// our app uses
// http://redux.js.org/docs/basics/Reducers.html
import reducers from './Reducers';

// Per the redux documentation, we have a single store
// that manages all app state
// http://redux.js.org/docs/basics/Store.html
const loggerMiddelware = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, loggerMiddelware));
              
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
//       authenticating: false,
//       valid_session: false,
//       user_id: null,
    };
  }

  componentDidMount() {

//     OAuth2.onValidToken((token) => {
//       store.dispatch(ActionCreators.accessTokenSuccess(token));
//     });

//     OAuth2.onNoValidToken(() => {
//       store.dispatch(ActionCreators.accessTokenFailure());
//     });

    // Set up OAuth2
//     OAuth2.initializeConfig('dd469d453a2067129568b85fa83769e8', '7575682d2cc6c2b9034e4b9f31c43558', 'http://dev.familycc.org/oauth2/access_token');
//     OAuth2.setEncodingType('form_data');

    // Check to see if we already have a token stored on
    // the device.
//     persistentStorage.get('oauth_token').then((token) => {
//       let has_token = (token && token.access_token);
//       if (has_token) {
//         store.dispatch(ActionCreators.accessTokenFetching());
//         OAuth2.initializeSession(token);
//       } else {
//         store.dispatch(ActionCreators.accessTokenNotPresent());
//       }
//     });

    //check to see if we have settings already stored on the device
    persistentStorage.get('map_settings').then(value => {
      store.dispatch(ActionCreators.updatingTerrain(value.terrain)); 
      store.dispatch(ActionCreators.updatingBoomWidth(value.boom_width)); 
      store.dispatch(ActionCreators.updatingDaylightMode(value.daylight_mode)); 
    });

  }

  selectRouterTab(props) {
    
      return "main"
 
  }

  render() {
     let ConnectedSwitch = connect(state=>({session: state.session}))(Switch);
    return (
      
      <Provider store={store}>
        <RouterWithRedux>
         <Scene key="root"
                 component={ConnectedSwitch}
                 tabs={true}
                 selector={this.selectRouterTab.bind(this)}>
           
           
              <Scene key="main">
                <Scene key="sidemenu" component={SideMenu} tabs={true}>
                  <Scene key="splash" initial={true} component={MainView} navigationBarStyle={{backgroundColor:'rgba(0,212,0,0.8)', borderBottomWidth: 0}} 
                title="Map" titleStyle={{color:'black'}}
                drawerImage={require('./Assets/Images/icon-menu.png')}
                leftButtonIconStyle={{tintColor: 'black'}}/>
                  <Scene key="advanced" hideNavBar={true} component={AdvancedSetting}/>
                </Scene> 
              </Scene> 
            
             
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}

export default App;
