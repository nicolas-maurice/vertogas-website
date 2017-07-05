import React, { 
  PropTypes,
} from 'react';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';

import './AppBar.css';

const styles = {
  mediumIcon: {
    width: 48,
    height: 48,
    
  },
  medium: {
    float:'right',
    right:30
  }
};

import Logo from '../../img/logo.png';

const AppBar = (props) => {
  return (
     <div className="topBar">
        <img src={Logo} alt="Gasuni logo"/>
        <IconButton iconStyle={styles.mediumIcon}
                    onTouchTap={
                      props.onAddPowerPlants  
                    }
                    style={styles.medium}>
          <Add color='#FFF'/>
        </IconButton>
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