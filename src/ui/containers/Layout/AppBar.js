import React, { 
  PropTypes,
} from 'react';

import './AppBar.css';

import Logo from '../../../../public/img/logo.png';


const AppBar = (props) => {
  return (
     <div className="topBar">
        <img src={Logo} alt="Gasuni logo"/>
     </div>
  );
}

AppBar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired
}
export default AppBar;