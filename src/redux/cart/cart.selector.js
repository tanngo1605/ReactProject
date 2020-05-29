import {createSelector} from 'reselect';

//two types of selector we can write: input and output


const selectCart = state => state.cart; //input selector: return a slice of the state in the store

export const selectCartItems = createSelector(
    selectCart,
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    selectCart,
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
   selectCartItems,
   cartItems => cartItems.reduce((accum, cartItem) =>
   accum+cartItem.quantity  ,0)
)

//flow: when the state is inserted into selectCartItemsCount, then go back to selectCartItems, 
//then go back to selectCart...

export const selectCartTotal = createSelector(
   selectCartItems,
   cartItems => cartItems.reduce((accum, cartItem) =>
   accum+ cartItem.quantity*cartItem.price  ,0)

)