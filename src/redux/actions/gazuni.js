/**
 * Authentification actions
 */
import {
  GET,
  POST,
  PUT,
} from '../../APIManager';
import {
  API_BASE_URL,
  POWER_PLANTS_RESOURCE,
  TOKENS_RESOURCE,
  LOGS_RESOURCE
} from '../../common';

/* For loading user authentification from server  */
export const POWER_PLANTS = 'POWER_PLANTS';
export const POWER_PLANTS_REQUEST = 'POWER_PLANTS_REQUEST';
export const POWER_PLANTS_SUCCESS = 'POWER_PLANTS_SUCCESS';
export const POWER_PLANTS_FAILURE = 'POWER_PLANTS_FAILURE';
export const POWER_PLANTS_CANCEL = 'POWER_PLANTS_CANCEL';

/**
 * powerPlants action creator
 */
export const getPowerPlants = (owner) => ({
  type: POWER_PLANTS,
  meta: {
    APIBaseUrl: API_BASE_URL,
    resource: POWER_PLANTS_RESOURCE+'/'+owner,
    requestType: GET,
  }
})

/* For getting owner tokens */
export const OWNER_TOKENS = 'OWNER_TOKENS';
export const OWNER_TOKENS_REQUEST = 'OWNER_TOKENS_REQUEST';
export const OWNER_TOKENS_SUCCESS = 'OWNER_TOKENS_SUCCESS';
export const OWNER_TOKENS_FAILURE = 'OWNER_TOKENS_FAILURE';
export const OWNER_TOKENS_CANCEL = 'OWNER_TOKENS_CANCEL';

/**
 * ownerTokens action creator 
 */
export const getOwnerTokens = (owner) => ({
  type: OWNER_TOKENS,
  meta: {
    APIBaseUrl: API_BASE_URL,    
    resource: TOKENS_RESOURCE+'/owner/'+owner,
    requestType: GET,
  },
})


/* For getting owner tokens */
export const POWER_PLANTS_TOKENS = 'POWER_PLANTS_TOKENS';
export const POWER_PLANTS_TOKENS_REQUEST = 'POWER_PLANTS_TOKENS_REQUEST';
export const POWER_PLANTS_TOKENS_SUCCESS = 'POWER_PLANTS_TOKENS_SUCCESS';
export const POWER_PLANTS_TOKENS_FAILURE = 'POWER_PLANTS_TOKENS_FAILURE';
export const POWER_PLANTS_TOKENS_CANCEL = 'POWER_PLANTS_TOKENS_CANCEL';

/**
 * ownerTokens action creator 
 */
export const getPowerPlantsTokens = (plantId) => ({
  type: POWER_PLANTS_TOKENS,
  meta: {
    APIBaseUrl: API_BASE_URL,    
    resource: TOKENS_RESOURCE+'/powerPlant/'+plantId,
    requestType: GET,
  },
})

/* For getting owner tokens */
export const LOGS = 'LOGS';
export const LOGS_REQUEST = 'LOGS_REQUEST';
export const LOGS_SUCCESS = 'LOGS_SUCCESS';
export const LOGS_FAILURE = 'LOGS_FAILURE';
export const LOGS_CANCEL = 'LOGS_CANCEL';

/**
 * ownerTokens action creator 
 */
export const getLogs = (token) => ({
  type: LOGS,
  meta: {
    APIBaseUrl: API_BASE_URL,    
    resource: LOGS_RESOURCE+'/'+token,
    requestType: GET,
  },
})


/* For setting owner address */
export const SET_OWNER = 'SET_OWNER';

/**
 * ownerTokens action creator 
 */
export const setOwner = (address,type) => ({
  type: SET_OWNER,
  payload:{address:address,ownerType:type}
})


export const GAZUNI_ACTION_TYPES = [POWER_PLANTS, OWNER_TOKENS, POWER_PLANTS_TOKENS,LOGS]