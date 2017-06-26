import React, { 
  PropTypes 
} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';

import AppBar from './AppBar';
import SideBar from './SideBar';
import defaultTheme from '../defaultTheme';

import './Layout.css';
import background from '../../img/background.png'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    background: `url(${background}) no-repeat`,
    backgroundSize: "100% 100%"
  },
  content: {
    flex: 1
  },
};

const prefixedStyles = {};

const Layout = (props) => {
  const {
    children,
    menu,
    theme,
    title,
  } = props
  
  const muiTheme = getMuiTheme(theme);

  if (!prefixedStyles.main) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.main = prefix(styles.main);
    prefixedStyles.body = prefix(styles.body);
    prefixedStyles.content = prefix(styles.content);
  }
  
  return (
    <div style={prefixedStyles.main} >
      <AppBar title={title} />
      <div className="body" style={prefixedStyles.body}>
        <div style={prefixedStyles.content}>{ children }</div>
        <SideBar>
          { menu }
        </SideBar>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.element,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
}

Layout.defaultProps = {
  theme: defaultTheme,
}

export default Layout;