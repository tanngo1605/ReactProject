import CartActionTypes from "./cart.types";
import {addItemToCart} from './cart.util';


const INITIAL_STATE = {//this is just the state for cart prop in the store
  hidden: true, //for display the cart
  cartItems: [] //to store the added itmes
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
         ...state,//very important, it means that it still preserve the other props
        hidden: !state.hidden,
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload ) //spreading old elements and add one more
      };
    default:
      return state;
  }
};

export default cartReducer;
