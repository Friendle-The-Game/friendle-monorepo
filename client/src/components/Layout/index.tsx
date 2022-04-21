import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Adsense } from '@ctrl/react-adsense';
import PropTypes from 'prop-types';
import Mathler from '../Mathler';
import Wordle from '../Wordle';
import './layout.scss';

const Layout = ({ history }: any) => {
  return (
  <div className="layout-wrapper with-ads">
    <div className="content">
      <Switch location={history.location}>
        <Route path="/mathler" render={() => <Mathler guessLength={8} />} />
        <Route path="/wordle" component={Wordle} />
      </Switch>
    </div>
    <Adsense
      client="ca-pub-6590154931831231"
      slot="8360483357"
      style={{ height: '20vh' }}
      format=""
    />
  </div>
)};

Layout.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({}),
  }).isRequired,
};

export default Layout;
