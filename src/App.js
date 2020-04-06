import React from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
/*
Switch: match the first URL that match
exact: match the exact URL
*/
function App() {
  return (
    <div>
    <Switch>
    <Route exact path="/" component={HomePage}></Route>
    <Route exact path="/shop" component={ShopPage}></Route>
    
    </Switch>
    </div>
  );
}

export default App;
