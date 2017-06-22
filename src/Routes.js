import React from 'react';
import {
  IndexRoute,
  Route,
} from 'react-router';
import HomeIcon from 'material-ui/svg-icons/action/home';
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';
import {OWNER_TYPES} from './common'
import Wrapper from './ui/containers/Wrapper/Wrapper';
import Login from './ui/containers/Login/Login';
import Layout from './ui/containers/Layout/Layout';
import Menu from './ui/containers/Layout/Menu';
import Home from './ui/containers/Home/Home';
import Consumer from './ui/containers/Consumer/Consumer';
import NotFound from './ui/containers/NotFound/NotFound';

import {
  HOME_ROUTE,
  AUTH,
  LOGIN_ROUTE,
  CONSUMER
} from './common';

const menuItems = [
  {
    name: "Producer",
    path: HOME_ROUTE,
    icon: HomeIcon,
    type:OWNER_TYPES.PRODUCER
  },
  {
    name: "Consumer",
    path: CONSUMER,
    icon: VisibilityOffIcon,
    type: OWNER_TYPES.CONSUMER
  },
];

const MenuComponent = () => (
  <Menu 
    items={menuItems}
    selectedMenuItemStyle={{
      background: "#FEC61A",
      color: "#2E2E2E"
    }} 
  />
);

const LayoutComponent = ({children}) => {
  return (
    <Layout 
      title='EY App'
      menu={<MenuComponent />}
    >
      { children }
    </Layout>
  );
};

const getRoutes = () => {
  return (
    <Route component={Wrapper}>
      <Route path={HOME_ROUTE} >
        <Route path={LOGIN_ROUTE} component={Login} />
        <Route component={LayoutComponent}>
            <IndexRoute component={Home} />
            <Route path={CONSUMER} component={Consumer} />
            <Route path="*" component={NotFound} />
        </Route>
      </Route>
    </Route>
  );
};

export default getRoutes;