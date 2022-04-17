import React from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import ConfirmRegistration from './components/ConfirmRegistration';

const AppContainer = ({ history }: any) => (
  <div className="app-wrapper">
    <Switch location={history.location}>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/confirm-registration" exact component={ConfirmRegistration} />
      <Route path="/reset-password" exact render={() => <>Reset password</>} />
      <Route path="/" component={Layout} />
    </Switch>
  </div>
);

AppContainer.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({}),
  }).isRequired,
};

export default withRouter(AppContainer);
