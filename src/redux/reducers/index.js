import {
  combineReducers,
} from 'redux';
import { 
  reducer as form, 
} from 'redux-form';
import {
  routerReducer as routing,
} from 'react-router-redux';

import ui from './ui';
import auth from './auth';
import logs from './logs'
import powerPlants from './powerPlants'
import tokens from './tokens'
import owner from './owner';

/* Build app reducers */
const reducer = combineReducers({
  ui,
  routing,
  tokens,
  powerPlants,
  logs,
  auth,
  owner
});

export default reducer;