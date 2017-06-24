import { 
  combineReducers 
} from 'redux';
import {
  OWNER_TOKENS,
  POWER_PLANTS_TOKENS,
  ALL_TOKENS,
  FETCH_FAILURE,
  POWER_PLANTS_SUCCESS,
  SELECT_POWER_PLANT,
  ADD_TOKEN
} from '../actions';

/**
 * Reducers related to tokens handling
 */


/* reducer responsible for ownerTokens management */
const allTokensReducer = (state = null, action) => {
  switch (action.type) {
    case `${ALL_TOKENS}_SUCCESS`:
      return action.payload
    case `${ALL_TOKENS}_FAILURE`:
       if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }
    case ADD_TOKEN:
      console.log(state)
        return state;
    default:
      return state;
  }
};

/* reducer responsible for ownerTokens status management */
const allTokenStatusReducer = (state = null, action) => {
  switch (action.type) {      
    case `${ALL_TOKENS}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${ALL_TOKENS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };

    case `${ALL_TOKENS}_FAILURE`:
      return {
        ...state,
        loading: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${ALL_TOKENS}_CANCEL`:
      return {
        ...state,
        loading: false,
        cancelDate: action.meta.date,
      };
    default:
      return state;
  }
};

/* reducer responsible for ownerTokens management */
const ownerTokensReducer = (state = null, action) => {
  switch (action.type) {
    case `${OWNER_TOKENS}_SUCCESS`:
      return action.payload
    case `${OWNER_TOKENS}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }    
    case FETCH_FAILURE:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }
    case ADD_TOKEN:
      console.log(state)
        return state;
    default:
      return state;
  }
};

/* reducer responsible for ownerTokens status management */
const ownerTokensStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${OWNER_TOKENS}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${OWNER_TOKENS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };

    case `${OWNER_TOKENS}_FAILURE`:
      return {
        ...state,
        loading: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${OWNER_TOKENS}_CANCEL`:
      return {
        ...state,
        loading: false,
        cancelDate: action.meta.date,
      };
    default:
      return state;
  }
};
/* reducer responsible for ownerTokens management */
const powerPlantsTokensReducer = (state = null, action) => {
  switch (action.type) {
    case `${POWER_PLANTS_TOKENS}_SUCCESS`:
      return action.payload;
    case `${POWER_PLANTS_TOKENS}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      } 
    default:
      return state;
  }
};

/* reducer responsible for ownerTokens status management */
const powerPlantsTokensStatusReducer = (state = null, action) => {
  switch (action.type) {      
    case `${POWER_PLANTS_TOKENS}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${POWER_PLANTS_TOKENS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };

    case `${POWER_PLANTS_TOKENS}_FAILURE`:
      return {
        ...state,
        loading: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${POWER_PLANTS_TOKENS}_CANCEL`:
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
  all: combineReducers({
        tokens:allTokensReducer,
        status: allTokenStatusReducer
  }),
  ownerTokens: combineReducers({
        tokens:ownerTokensReducer,
        status: ownerTokensStatusReducer
  }),
  powerPlantsTokens: combineReducers({
        tokens:powerPlantsTokensReducer,
        status: powerPlantsTokensStatusReducer
  })
});
