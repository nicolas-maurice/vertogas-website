import {
  SET_OWNER,
} from '../actions';
import {OWNER_TYPES} from '../../common'
let initialState ={
  ownerType:OWNER_TYPES.PRODUCER,
  address:'0x13377b14b615fff59c8e66288c32365d38181cdb'
}
/**
 * Reducers related to owner handling
 */

/* reducer responsible for logs management */
const owner = (state = initialState, action) => {
  switch (action.type) {
    case SET_OWNER:
         return action.payload;
    default:
      return state;
  }
};
export default owner
