/* eslint-disable */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default function base (
  options,
  port = options.port,
  host = options.host,
) {
  const getHotMiddlewareEntry = () => options.ssr
    ? `webpack-hot-middleware/client?name=web&path=http://${host}:${port}/__webpack_hmr`
    : false;

  const getEntry = () => options.isDev && options.isWeb
    ? {
      vendor: [
        'antd', // includes normalize.css 7.x
        'axios',
        'classnames',
        'cq-prolyfill',
        // 'css-element-queries', // use cq-prolyfill instead, but keep this just in case cq-prolyfill has performance issues
        'moment-duration-format',
        'moment',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'react-router-redux',
        'react-table', // remove this and use antd.table
        'react',
        'react-countdown-clock',
        'recompose',
        'redux-thunk',
        'redux',
        'reselect',
        'store',
      ],
      main: [
        'babel-polyfill',
        'react-hot-loader/patch',
        getHotMiddlewareEntry(),
        options.mainEntry
      ].filter(entry => entry)
    }
    : {
      main: [
        'babel-polyfill',
        options.mainEntry
      ]
    }

  const getPublicPath = () => (
    options.isDev && options.ssr && options.isWeb
  ) ? `http://${host}:${port}/` : options.publicPath;

  const getOutput = () => ({
    chunkFilename: options.jsFilename,
    filename: options.jsFilename,
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    library: options.isWeb ? 'var' : 'app',
    libraryTarget: options.isWeb ? 'umd2' : 'commonjs2',
    path: options.publicDir,
    publicPath: getPublicPath(),
  });

  const getResolve = () => ({
    extensions: ['*', '.js', '.jsx', '.css'],
    modules: ['.', 'node_modules', options.contentBase],
  });

  const getExternals = () => options.isNode
    ? nodeExternals({ whitelist: ['source-map-support']})
    : [];

  const getNode = () => options.isNode
    ? {
      __dirname: false,
      __filename: false,
      Buffer: false,
      console: false,
      global: false,
      process: false,
    }
    : {};

  return {
    ...options.webpackConfig,
    bail: options.webpackBail,
    cache: options.cache,
    context: options.context,
    devtool: options.isDev ? 'eval-source-map' : 'source-map',
    entry: getEntry(),
    externals: getExternals(),
    node: getNode(),
    output: getOutput(),
    performance: { ...options.performanceConfig },
    profile: options.webpackProfile,
    recordsInputPath: options.recordsOutputPath,
    recordsOutputPath: options.recordsOutputPath,
    recordsPath: options.recordsOutputPath,
    resolve: getResolve(),
    stats: { ...options.statsConfig },
  };
}
