import {
  SET_OWNER,
} from '../actions';
import {OWNER_TYPES} from '../../common'
let initialState ={
  ownerType:OWNER_TYPES.PRODUCER,
  address:'0x0084313bb3d4326a50f6361aa193905b3f165359'
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
