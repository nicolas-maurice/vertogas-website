import React from 'react';
import {
  IndexRoute,
  Route,
} from 'react-router';
import HomeIcon from 'material-ui/svg-icons/action/home';
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-off';

import Wrapper from './ui/containers/Wrapper/Wrapper';
import Login from './ui/containers/Login/Login';
import Layout from './ui/containers/Layout/Layout';
import Menu from './ui/containers/Layout/Menu';
import Home from './ui/containers/Home/Home';
import Consumer from './ui/containers/Consumer/Consumer';
import NotFound from './ui/containers/NotFound/NotFound';
import {
  AuthRequired,
  UnauthRequired,
} from './ui/containers/Auth';
import {
  HOME_ROUTE,
  AUTH,
  LOGIN,
  CONSUMER
} from './common';

const menuItems = [
  {
    name: "Home",
    path: HOME_ROUTE,
    icon: HomeIcon,
  },
  {
    name: "Consumer",
    path: CONSUMER,
    icon: VisibilityOffIcon,
  },
];

const MenuComponent = () => (
  <Menu items={menuItems} />
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
        <Route path={AUTH} component={UnauthRequired}>
          <Route path={LOGIN} component={Login} />
        </Route>
        <Route component={AuthRequired}>
          <Route component={LayoutComponent}>
            <IndexRoute component={Home} />
            <Route path={CONSUMER} component={Consumer} />
            <Route path="*" component={NotFound} />
          </Route>
        </Route>
      </Route>
    </Route>
  );
};

export default getRoutes;