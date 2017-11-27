/* eslint-disable */
// TODO: stylelint not reporting in console on errors/warnings
// TODO: (app wide) separate node_modules css into separate style sheet for caching

import './theme.css';
import { Layout } from 'antd';
import ContentRouter from './Router/ContentRouter';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.css';

const { Header, Footer, Sider, Content } = Layout;

export class App extends React.Component {
  render() {
    return (
      <div className={styles.layout}>
        <ContentRouter />
      </div>
    );
  }
}

export default App;
