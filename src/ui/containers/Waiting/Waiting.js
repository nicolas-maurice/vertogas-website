import React, { 
  PropTypes 
} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';
import './Waiting.css';


const Waiting = (props) => {

  return (
    <div className="loadingContent">
        <div className="loadingBody">
            <CircularProgress size={80} thickness={5} color="#FEC61A"/>
        </div>
    </div>
  );
}

export default Waiting;