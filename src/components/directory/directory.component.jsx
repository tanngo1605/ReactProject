import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import {connect} from 'react-redux';

import {selectDirectorySections} from '../../redux/directory/directory.selector';
import {createStructuredSelector} from 'reselect';
import "./directory.styles.scss";


const Directory = ({sections}) => {
 

 
    return (
      <div className="directory-menu">
        {sections.map(({id, ...otherSection}) => (
          <MenuItem key={id} {...otherSection} />
        ))}
      </div>
    );
  
};

const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySections
})

export default connect(mapStateToProps) (Directory);
