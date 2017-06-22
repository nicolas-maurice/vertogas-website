import {
  put,
  take,
  call,
  fork,
  takeEvery,
  takeLatest,
  race,
} from 'redux-saga/effects';
import {
  push,
} from 'react-router-redux';

import createFetchSaga from './fetchSaga';

import {
  loadAuth,
  LOAD_AUTH,
  LOGIN,
  LOGOUT,
  FETCH_FAILURE,
  POWER_PLANTS,
  AUTH_ACTION_TYPES,
  GAZUNI_ACTION_TYPES,
  LOGS,
  OWNER_TOKENS,
  POWER_PLANTS_TOKENS,
  ALL_TOKENS
} from '../../actions';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  CONSUMER
} from '../../../common';

/**
 * App Saga creator
 * @param {function} APIManager - function that perform API fetch calls
 */
function createAppSaga(APIManager) {

  const handleFetch = createFetchSaga(APIManager);
  /**
   * App saga ran each time a user connects to the app
   */
  function* appSaga() {
    while (true) {
     
        
      yield put(push(LOGIN_ROUTE));
      //yield put(push(CONSUMER));
      //yield put(push(HOME_ROUTE));
      
      function* getPowerPlantsCycle() { 
        yield takeLatest(POWER_PLANTS, handleFetch);
      };
       function* getLogsCycle() { 
        yield takeLatest(LOGS, handleFetch);
      };
       function* getAllTokensCycle() { 
        yield takeLatest(ALL_TOKENS, handleFetch);
      };
       function* getOwnerTokensCycle() { 
        yield takeLatest(OWNER_TOKENS, handleFetch);
      };
       function* getPowerPlantsTokensCycle() { 
        yield takeLatest(POWER_PLANTS_TOKENS, handleFetch);
      };
      function* fetchCycle() {
        yield takeEvery(action => action.meta && action.meta.fetch && !AUTH_ACTION_TYPES.includes(action.type) && !GAZUNI_ACTION_TYPES.includes(action.type), handleFetch);        
      };

      yield race({
        getPowerPlantsCycle:call(getPowerPlantsCycle),
        getLogsCycle:call(getLogsCycle),
        getOwnerTokensCycle:call(getOwnerTokensCycle),
        getAllTokensCycle:call(getAllTokensCycle),
        getPowerPlantsTokensCycle:call(getPowerPlantsTokensCycle),
        fetchCycle: call(fetchCycle),
      });

      /* Come back to the beginning of the loop */
    }
  };

  return appSaga;
}; 

export default createAppSaga;