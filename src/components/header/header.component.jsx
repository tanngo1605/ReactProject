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
import { signOutStart } from "../../redux/user/user.actions";
import {
  HeaderContrainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden, clearAll, signOutStart }) => (
  <HeaderContrainer>
    <LogoContainer to="/">
      <Logo className="logo"></Logo>
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>

      {currentUser ? (
        <OptionDiv
          className="option"
          onClick={() => {
           // clearAll();
            signOutStart();
          }}
        >
          {" "}
          SIGN OUT
        </OptionDiv>
      ) : (
        <OptionLink className="option" to="/signin">
          SIGN IN
        </OptionLink>
      )}
      {currentUser ? (
        <OptionDiv className="option">
          <Link to="/checkout">{currentUser.displayName.toUpperCase()}</Link>
        </OptionDiv>
      ) : null}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
  </HeaderContrainer>
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
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
