import React from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
/*
Switch: match the first URL that match
exact: match the exact URL
*/
function App() {
  return (
    <div>
     < HomePage />
    </div>
  );
}

export default App;
