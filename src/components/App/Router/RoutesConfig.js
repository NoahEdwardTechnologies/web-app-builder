/* eslint-disable */
import { Redirect } from 'react-router-dom';
import About from 'components/About';
import App from 'components/App';
import Canvas from 'components/Canvas';
import Examples from 'components/Examples';
import Home from 'components/Home';
import Oops from 'components/Oops';
import React from 'react';

export default [
  // {
  //   Component: App,
  //   routes: [
      {
        Component: Home,
        exact: true,
        path: '/',
        routes: [],
        statusCode: 200,
        loadData: () => console.log('loading data'),
      },
      {
        Component: About,
        exact: false,
        path: '/about',
        routes: [],
        statusCode: 200,
      },
      {
        Component: Canvas,
        exact: false,
        path: '/canvas',
        routes: [],
        statusCode: 200,
      },
      {
        Component: Examples,
        exact: false,
        path: '/examples',
        routes: [],
        statusCode: 200,
      },
      {
        Component: Oops,
        exact: false,
        path: '/oops',
        routes: [],
        statusCode: 200,
      },
      {
        Component: () => <Redirect to='/oops' />,
        exact: false,
        path: '*',
        redirectToUrl: '/oops',
        routes: [],
        statusCode: 404,
      },
    ]; //,
//   },
// ];
