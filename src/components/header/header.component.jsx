import React from "react";
import "./header.styles.scss";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux"; //connect is a HOC that lets use modify our
//component to have access to things related to redux
import { createStructuredSelector } from "reselect";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../asset/logo.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { clearAll } from "../../redux/cart/cart.action";

const SignInAlert = () => <div>Please Sign In</div>;
const Header = ({ currentUser, hidden, clearAll }) => (
  <div className="header">
    <Link class="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>

      {currentUser ? (
        <div
          className="option"
          onClick={() => {
            clearAll();
            auth.signOut();
          }}
        >
          {" "}
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      {currentUser ? (
        <div className="option">
          <Link to="/checkout">{currentUser.displayName.toUpperCase()}</Link>
        </div>
      ) : null}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropDown />}
  </div>
);
/*const mapStateToProps = (state) => ({
  //this state is in root-reducer(file root-reducer)
  currentUser: selectCurrentUser(state),
  //read the props from the store
  hidden: selectCartHidden(state),
});*/
const mapStateToProps = createStructuredSelector({
  //auto input state
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  clearAll: () => dispatch(clearAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
