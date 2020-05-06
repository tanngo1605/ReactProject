import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'; //connect is a HOC that lets use modify our 
//component to have access to things related to redux

import { ReactComponent as Logo } from "../../asset/logo.svg";
import {auth} from "../../firebase/firebase.utils";
const Header = ({currentUser}) => (
  <div className="header">
    <Link class="logo-container" to="/">
      <Logo className='logo'></Logo>
    </Link>

    <div className="options">
    
    <Link className='option' to='/shop'>SHOP</Link>
    <Link className='option' to="/shop">CONTACT</Link>
    {
      currentUser?
     <div className='option' onClick ={() => auth.signOut()}> SIGN OUT</div>
     
      :
      <Link className='option' to ="/signin">SIGN IN</Link>
    }
    {
      currentUser?
     <div className='option'>{currentUser.displayName.toUpperCase()}</div>
     :
     null
  
    }
    
    </div>
  </div>
);
const mapStateToProps = state => ({ //this state is in root-reducer(file root-reducer)
  currentUser: state.user.currentUser //read the props from the store
})

export default  connect(mapStateToProps)(Header);
