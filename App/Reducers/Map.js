import ActionTypes from '../ActionTypes';
import {Dimensions} from 'react-native';
import persistentStorage from 'react-native-simple-store';
var {width} = Dimensions.get('window');

const initialState = {
    daylight_mode: false,
    boom_width: 10,
    terrain: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.DAYLIGHT_MODE_UPDATING:
      persistentStorage.update('map_settings', {
        daylight_mode: action.state
      })
      return Object.assign({}, state, {
        ...map =  {
          ...state,
          daylight_mode: action.state
        }
      });
      case ActionTypes.BOOM_WIDTH_UPDATING:
      persistentStorage.update('map_settings', {
        boom_width: action.data
      })
      return Object.assign({}, state, {
        ...map =  {
          ...state,
          boom_width: action.data
        }
      });
      case ActionTypes.TERRAIN_UPDATING:
      persistentStorage.update('map_settings', {
        terrain: action.state
      })
        return Object.assign({}, state, {
        ...map =  {
          ...state,
          terrain: action.state
        }
      });
      case ActionTypes.FIELD_RESETTING:
        return Object.assign({}, state, {
        ...map =  {
          ...state,
        }
      });

    // ...other actions

    default:
      return state;
  }
}