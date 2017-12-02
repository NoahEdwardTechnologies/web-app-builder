/* eslint-disable */
import deps from './package.json';
import optionsConfig from './config/optionsConfig';
import path from 'path';
import webpackConfig from './config/webpackConfig';
import styleLintRules from './stylelint.config.js'; // TODO: remove stylelint and use ./stylelintrunner.js
import fse from 'fs-extra';


function mainOptions ({
  emitFiles = false,
  host = '0.0.0.0',
  platform = 'node',
  port = 3000,
  ssr = true,
} = {}) {
  const emittingFiles = JSON.parse(emitFiles);
  const ssrMode = JSON.parse(ssr);
  const getEntry = () => platform === 'web'
    ? './src/client.js'
    : './src/server.js';

  if (
    platform === 'web'
    && process.env.NODE_ENV === 'development'
    && ssrMode === false
    && emittingFiles === true
  ) {
    console.log('emptying ./dist directory');
    fse.emptyDirSync('./dist');
  }

  const
    pathDist = 'dist',
    pathPrivate = path.join(pathDist, '/private'),
    pathPublic = path.join(pathDist, '/public');

  return {
    appSlogan: 'Building the Future, Together',
    appTitle: 'Noah Edward Technologies Inc.',
    assetFilename: '[folder]/[name].[ext]',
    context: path.resolve(__dirname, '.'),
    dependencies: Object.keys(deps.dependencies),
    distDir: path.resolve(__dirname, pathDist), // target directory
    emitFiles: emittingFiles || process.env.NODE_ENV === 'production',
    env: process.env.NODE_ENV || 'development',
    host,
    htmlFilename: 'index.html',
    htmlTemplate: 'src/components/App/template.html.js',
    http2Server: false,
    isNode: platform === 'node',
    isWeb: platform === 'web',
    mainEntry: getEntry(),
    pathDist,
    pathPrivate,
    pathPublic,
    platform,
    port,
    publicPath: '/',
    sourceMap: true,
    ssr: ssrMode,
    styleRulesConfig: styleLintRules,
    verbose: false,
    webpackBail: true,
    webpackDir: path.resolve(__dirname, '.'), // loaders + entries are resovled relative to this
  };
}

module.exports = (env, argv) => {
  console.log('env is', env);
  return webpackConfig(optionsConfig(mainOptions(env)));
}
