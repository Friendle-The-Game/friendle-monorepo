import React from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './components/Layout';

const AppContainer = ({ history }: any) => (
  <div className="app-wrapper">
    <Switch location={history.location}>
      <Route path="/login" exact render={() => <>Login</>} />
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
