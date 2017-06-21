import { 
  combineReducers 
} from 'redux';
import {
  LOGS,
  FETCH_FAILURE,
} from '../actions';
/**
 * Reducers related to logs handling
 */

/* reducer responsible for logs management */
const logsReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOGS}_SUCCESS`:
      return action.payload;
    case `${LOGS}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      } 
    default:
      return state;
  }
};

/* reducer responsible for logs status management */
const logsStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOGS}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${LOGS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };

    case `${LOGS}_FAILURE`:
      return {
        ...state,
        loading: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${LOGS}_CANCEL`:
      return {
        ...state,
        loading: false,
        cancelDate: action.meta.date,
      };
    default:
      return state;
  }
};

/* Combine all reducers into the auth reducers */
export default combineReducers({
  logs: logsReducer,
  status: logsStatusReducer
});
