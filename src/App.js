import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfile } from "./firebase/firebase.utils";

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
  console.log("ComponentDidMount");
  //this.unsubscribeFromAuth= 
  auth.onAuthStateChanged( async userAuth =>{ //this function is called -> setState is called -> render is called
    console.log('User: ' + userAuth)
    if(userAuth){
      const userRef = await createUserProfile(userAuth);
      userRef.onSnapshot(snapShot =>{
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        })
      })
    }
    else
    this.setState({currentUser: userAuth})

  })
}

componentWillUnmount(){
  console.log("ComponentWillUnmount");
 // this.unsubscribeFromAuth();
}

  render() {
    console.log("Render...")
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
