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
import powerPlans from './powerPlants'
import tokens from './tokens'

/* Build app reducers */
const reducer = combineReducers({
  ui,
  routing,
  tokens,
  powerPlans,
  logs,
  auth
});

export default reducer;