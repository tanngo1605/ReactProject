import React from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
/*
Switch: match the first URL that match
exact: match the exact URL
*/
function App() {
  return (
    <div>
    <Header/> {/*set outside the Swith so the Header will always be there*/}
    <Switch>
    <Route exact path="/" component={HomePage}></Route>
    <Route exact path="/shop" component={ShopPage}></Route>
    
    </Switch>
    </div>
  );
}

export default App;
