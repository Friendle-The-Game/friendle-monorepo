import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Mathler from '../Mathler';
import Wordle from '../Wordle';
import './layout.scss';

const Layout = ({ history }: any) => (
  <div className="layout-wrapper">
    <div className="content">
      <Switch location={history.location}>
        <Route path="/mathler" render={() => <Mathler guessLength={8} />} />
        <Route path="/wordle" component={Wordle} />
      </Switch>
    </div>
  </div>
);

Layout.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({}),
  }).isRequired,
};

export default Layout;
