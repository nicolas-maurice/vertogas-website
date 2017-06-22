import { 
  combineReducers 
} from 'redux';
import {
  SET_OWNER,
  FETCH_FAILURE,
} from '../actions';
/**
 * Reducers related to owner handling
 */

/* reducer responsible for logs management */
const owner = (state = null, action) => {
  switch (action.type) {
    case SET_OWNER:
         return action.payload;
    default:
      return state;
  }
};

/* Combine all reducers into the auth reducers */
export default owner
