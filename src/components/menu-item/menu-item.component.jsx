import React from "react";
import "./menu-item.styles.scss";
import {withRouter, Link} from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div className={`${size} menu-item`} onClick={() =>history.push(`${match.url}${linkUrl}`)}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">Shop now</span>
    </div>
  </div>
); 
//because Route only wrap its mother: Homepage Componet, so inorder to have 'history' property, withRouter function can help. And
//it is called HOC (Higer Order Component)
export default withRouter(MenuItem);
//export default MenuItem;
