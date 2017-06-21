import React, { 
  PropTypes,
} from 'react';
import { 
  connect ,
} from 'react-redux';

import { 
  toggleSidebar, 
} from '../../../redux/actions';
import UserBoxIcon from './UserBox';

import './AppBar.css';

import Logo from '../../../../public/img/logo.png';


const AppBar = (props) => {
  const { 
    title, 
    toggleSidebar
  } = props

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
  ]).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  toggleSidebar,
};

export default connect(
  null,
  mapDispatchToProps
)(AppBar);