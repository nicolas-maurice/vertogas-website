import { 
  combineReducers 
} from 'redux';
import {
  POWER_PLANTS,
  FETCH_FAILURE,
  ADD_TOKEN,
  ADD_POWERPLANT
} from '../actions';
/**
 * Reducers related to powerPlants handling
 */

/* reducer responsible for powerPlants management */
const powerPlantsReducer = (state = [], action) => {
  switch (action.type) {
    case `${POWER_PLANTS}_SUCCESS`:
      return action.payload;
    case `${POWER_PLANTS}_FAILURE`:
      if (action.payload.status === 401) {
        return [];
      } else {
        return state;
      }    
    case `${FETCH_FAILURE}`:
      if (action.payload.status === 401) {
        return [];
      } else {
        return state;
      }
    case ADD_TOKEN:
    return state.map((pp)=>{
        if(pp.id === action.payload.powerPlant.id){
            return {
                ...pp,
                tokens:[action.payload.token].concat(pp.tokens)
            }
        }
        return pp;
    });
    case ADD_POWERPLANT:
    return state.concat([action.payload])

    default:
      return state;
  }
};

/* reducer responsible for powerPlants status management */
const powerPlantsStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${POWER_PLANTS}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${POWER_PLANTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };
    case `${POWER_PLANTS}_CANCEL`:
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
  powerPlants: powerPlantsReducer,
  status: powerPlantsStatusReducer
});
