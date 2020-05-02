/*When we fire the state for the first time, 
it going to be nothing. We want to mkae sure to initialize a state
Just like contructor in class
*/

const INITIAL_STATE = {
  currentUser: null,
};

//defalut value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;