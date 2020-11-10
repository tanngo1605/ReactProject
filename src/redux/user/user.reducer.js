/*When we fire the state for the first time, 
it going to be nothing. We want to mkae sure to initialize a state
Just like contructor in class
*/
import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  //This is just the state for user in the store
  currentUser: null,
  error: null,
};

//defalut value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
