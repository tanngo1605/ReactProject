import React, { useEffect } from "react";
//import "./App.css";
import { GlobalStyle } from "./global.style";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOutPage from "./pages/checkout/checkout.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { checkUserSession } from "./redux/user/user.actions";
/*
Switch: match the first URL that match
exact: match the exact URL
*/
const App = ({ checkUserSession, currentUser }) => {
  let unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  //unsubscribeFromAuth = null;

  checkUserSession();

  /*componentWillUnmount() {
    console.log("ComponentWillUnmount");
    unsubscribeFromAuth();
    //Calling the unsubscribe function when the component is about to
    // unmount is the best way to make sure we don't get any memory leaks in our application related
    //to listeners still being open even if the component that cares about the listener is no longer on the page.
  }
*/
  //divide the app into pages (functional component)-> container componets -> smaller component -> indivial component
  return (
    <div className="app">
      <GlobalStyle />
      <Header /> {/*set outside the Swith so the Header will always be there*/}
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route exact path="/" component={HomePage}></Route>

                <Route path="/shop" component={ShopPage}></Route>
                {/*if they already sign in, they cannot go to Sign In page*/}
                <Route
                  exact
                  path="/signin"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
                  }
                />
                <Route exact path="/checkout" component={CheckOutPage}></Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
