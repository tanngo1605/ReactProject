import CartActionTypes from "./cart.types";
import {addItemToCart, removeItemFromCart} from './cart.util';


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

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id != action.payload.id)
      };

    case CartActionTypes.REMOVE_ITEM:
      return{
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)

      };

    case CartActionTypes.CLEAR_ALL: 
      return{
        ...state,
        cartItems:[]
      }
    default:
      return state;
  }
};

export default cartReducer;
