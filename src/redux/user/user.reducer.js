/*When we fire the state for the first time, 
it going to be nothing. We want to mkae sure to initialize a state
Just like contructor in class
*/
import {UserActionTypes} from './user.types';


const INITIAL_STATE = { //This is just the state for user in the store
  currentUser: null,
};

//defalut value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        //...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;