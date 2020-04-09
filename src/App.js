import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";

/*
Switch: match the first URL that match
exact: match the exact URL
*/
class App extends React.Component {
constructor(){
  super();
  this.state = {
    currentUser: ''
  }
  this.unsubscribeFromAuth = null;
}
//unsubscribeFromAuth = null;
componentDidMount(){
  this.unsubscribeFromAuth= auth.onAuthStateChanged(user =>{
    this.setState({currentUser: user});
    console.log(user);

  })
}

componentWillUnmount(){
  this.unsubscribeFromAuth();
}

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />{" "}
        {/*set outside the Swith so the Header will always be there*/}
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/signin" component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
