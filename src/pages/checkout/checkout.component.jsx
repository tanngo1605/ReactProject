import React from "react";
import "./checkout.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/cart/cart.selector";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { clearAll } from "../../redux/cart/cart.action";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const CheckoutPage = ({ cartItems, total, totalItem, clearAll }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>
        TOTAL:${total}(Total items: {totalItem})
      </span>
    </div>
    {cartItems.length ? (
      <div className="clear-all" onClick={() => clearAll()}>
        CLEAR ALL
      </div>
    ) : null}
    {total ? (
      <div
        style={{
          marginLeft: "auto",
          marginTop: "50px",
        }}
      >
        <StripeCheckoutButton price={total} />
      </div>
    ) : (
      <img src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png" />
    )}
    <div
      className="test-warning"
      style={{
        color: "red",
        fontSize: "14px",
      }}
    >
      Please use these information for demo: credit card: 4242 4242 4242 4241
      CVV: 123 Date: any future Date
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  totalItem: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  clearAll: () => dispatch(clearAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
