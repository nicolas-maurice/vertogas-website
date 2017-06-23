import { 
  combineReducers 
} from 'redux';
import {
  OWNER_TOKENS,
  POWER_PLANTS_TOKENS,
  ALL_TOKENS,
  FETCH_FAILURE,
  POWER_PLANTS_SUCCESS,
  SELECT_POWER_PLANT
} from '../actions';


const mockPowerPlantsTokens={
    12:[
        {
            "certifID": "0x9c397621ec102b09a305cf98ffa8dccf95b5187b2d669f86ca6932e2337ef065", 
            "claimer": null, 
            "id": 2, 
            "isClaimed": false, 
            "metaData": "0xbabebabebabe0000000000000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'12/11/2017'
        },
        {
            "certifID": "0x891a4a4c785b2fc1be02e3f12f2afe54002de6968c89e7e90421e773437936fa", 
            "claimer": null, 
            "id": 12, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad",
            "issuedDate":'12/12/2017'
        }, 
        {
            "certifID": "0x7a6e869c575c818d0b2e774251844557117b5cfde5d073e38fa31ae0c24bab1a", 
            "claimer": null, 
            "id": 13, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'12/16/2017'
        }, 
        {
            "certifID": "0x859201a907c2000858ee2f4b193c204fb12ef85bdb5024c527853520cc4abc80", 
            "claimer": null, 
            "id": 14, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad",
            "issuedDate":'12/19/2017'
        }
    ],
    13:[
         {
            "certifID": "0x67258042d3e6b7d78b88e356d2b6c54b8e0c0caec428efe0ff96850328033693", 
            "claimer": null, 
            "id": 10, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad",
            "issuedDate":'12/17/2017'
        }, 
        {
            "certifID": "0x8cf0a384d90269c3778b743c4b1c7109ad506e68e18da094ed09512262d0b558", 
            "claimer": null, 
            "id": 11, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'12/19/2017'
        }, 
        {
            "certifID": "0x891a4a4c785b2fc1be02e3f12f2afe54002de6968c89e7e90421e773437936fa", 
            "claimer": null, 
            "id": 12, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad",
            "issuedDate":'11/19/2017'
        }, 
        {
            "certifID": "0x7a6e869c575c818d0b2e774251844557117b5cfde5d073e38fa31ae0c24bab1a", 
            "claimer": null, 
            "id": 13, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'10/19/2017'
        }, 
        {
            "certifID": "0x859201a907c2000858ee2f4b193c204fb12ef85bdb5024c527853520cc4abc80", 
            "claimer": null, 
            "id": 14, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'11/19/2017'
        }
    ],
    14:[
         {
            "certifID": "0x67258042d3e6b7d78b88e356d2b6c54b8e0c0caec428efe0ff96850328033693", 
            "claimer": null, 
            "id": 10, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'10/17/2017'
        }, 
        {
            "certifID": "0x8cf0a384d90269c3778b743c4b1c7109ad506e68e18da094ed09512262d0b558", 
            "claimer": null, 
            "id": 11, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x0084313bb3d4326a50f6361aa193905b3f165359",
            "issuedDate":'10/19/2017'
        }, 
        {
            "certifID": "0x891a4a4c785b2fc1be02e3f12f2afe54002de6968c89e7e90421e773437936fa", 
            "claimer": null, 
            "id": 12, 
            "isClaimed": false, 
            "metaData": "0xbeefdeadbabe1337133700000000000000000000000000000000000000000000", 
            "owner": "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad",
            "issuedDate":'11/19/2017'
        }, 
    ]
}
/**
 * Reducers related to tokens handling
 */


/* reducer responsible for ownerTokens management */
const allTokensReducer = (state = null, action) => {
  switch (action.type) {
    case `${ALL_TOKENS}_SUCCESS`:
      return action.payload.length > 0 ? action.payload : mockPowerPlantsTokens[12].concat(mockPowerPlantsTokens[13]).concat(mockPowerPlantsTokens[14]);
    case `${ALL_TOKENS}_FAILURE`:
         return mockPowerPlantsTokens[12].concat(mockPowerPlantsTokens[13]).concat(mockPowerPlantsTokens[14]);
      /*if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }*/
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
    console.log(action)
  switch (action.type) {
    case `${OWNER_TOKENS}_SUCCESS`:
      return action.payload.length > 0 ? action.payload : mockPowerPlantsTokens[12].concat(mockPowerPlantsTokens[13]).concat(mockPowerPlantsTokens[14]).filter((el)=>el.owner === "0x00ee8d36ca11e303edcbb737c952b0e31b40c7ad");
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
    case POWER_PLANTS_SUCCESS:
      let pp = action.payload[0].id
      return mockPowerPlantsTokens[pp];
    case SELECT_POWER_PLANT:
        return mockPowerPlantsTokens[action.payload.id];
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
