/* eslint-disable */

import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './index.js';
import PropTypes from 'prop-types';
import React from 'react';

export class ClientApp extends React.Component {
  componentDidMount () {
    // https://github.com/ausi/cq-prolyfill/issues/28
    require('cq-prolyfill')({ preprocess: false });
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default ClientApp
