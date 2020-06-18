import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOutPage from "./pages/checkout/checkout.component";

import { auth, createUserProfile } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {selectCollectionForPreview} from './redux/shop/shop.selector';

/*
Switch: match the first URL that match
exact: match the exact URL
*/
class App extends React.Component {
  unsubscribeFromAuth = null;

  //unsubscribeFromAuth = null;
  componentDidMount() {
    console.log("ComponentDidMount"); //userAuth = userObject
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //this function is called -> setState is called -> render is called
      //const { setCurrentUser, collectionsArray } = this.props;
      const { setCurrentUser} = this.props;
      console.log("User: " + userAuth);
      if (userAuth) {
        const nameUser = userAuth.displayName;
        console.log("User: " + nameUser);
        const userRef = await createUserProfile(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
        //addCollectionsAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
        //for adding data to firebase
        console.log("sign out");
      }
    });
  }

  componentWillUnmount() {
    console.log("ComponentWillUnmount");
    this.unsubscribeFromAuth();
    //Calling the unsubscribe function when the component is about to
    // unmount is the best way to make sure we don't get any memory leaks in our application related
    //to listeners still being open even if the component that cares about the listener is no longer on the page.
  }

  render() {
    console.log("Render...");
    //divide the app into pages (functional component)-> container componets -> smaller component -> indivial component
    return (
      <div className='app'>
        <Header />{" "}
        {/*set outside the Swith so the Header will always be there*/}
        <Route
          render={({location}) => (
            <TransitionGroup>
              <CSSTransition 
              key={location.key}
              timeout={300} 
              classNames="fade">
                <Switch location={location}>
                  <Route exact path="/" component={HomePage}></Route>

                  <Route path="/shop" component={ShopPage}></Route>
                  {/*if they already sign in, they cannot go to Sign In page*/}
                  <Route
                    exact
                    path="/signin"
                    render={() =>
                      this.props.currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <SignInAndSignUpPage />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/checkout"
                    component={CheckOutPage}
                  ></Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)), //create action to change the STORE
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
