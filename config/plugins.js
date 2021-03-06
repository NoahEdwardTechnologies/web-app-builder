/* eslint-disable */

// TODO: get nodemonplugin for server setup from starter/config/pluginTansformObjectRestSpread
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WebpackManifestPlugin from 'webpack-manifest-plugin';
import alterHtmlWebpackPlugin from './alterHtmlWebpackPlugin';
import WriteFilePlugin from 'write-file-webpack-plugin';

export default function plugins(options) {
  const config = { plugins: [] };

  const getHashedModulesIdsPluginConfig = () => ({
    hashDigest: 'hex',
    hashDigestLength: 20,
    hashFunction: 'sha256',
  });

  const getUglifyJsPluginConfig = () => ({
    sourceMap: options.sourceMap,
    parallel: true,
    extractComments: true,
    uglifyOptions: {
      mangle: false,
      compress: true,
      warnings: true,
    },
  });

  const getExtractTextPluginConfig = () => ({
    ...options.extractTextPluginConfig,
  });

  switch (options.env) {
    case 'development': {
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
      )
      break;
    }

    case 'production': {
      config.plugins.push(
        new UglifyJSPlugin(getUglifyJsPluginConfig()),
        new webpack.HashedModuleIdsPlugin(getHashedModulesIdsPluginConfig()),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
      );
    }
  }

  // TODO: complete this
  if (options.http2Server) {
    config.plugins.push(
      new webpack.optimize.AggressiveSplittingPlugin({
  			minSize: 30000,
  			maxSize: 50000
  		}),
    )
  }

  // all envs and platforms
  config.plugins.push(
    new ExtractTextPlugin(getExtractTextPluginConfig()),

    new webpack.DefinePlugin({
      'process.env.DIST_DIR_PATH': JSON.stringify(options.pathDist),
      'process.env.NODE_ENV': JSON.stringify(options.env),
      'process.env.PRIVATE_DIR_PATH': JSON.stringify(options.pathPrivate),
      'process.env.PUBLIC_DIR_PATH': JSON.stringify(options.pathPublic),
      'process.env.SSR': JSON.stringify(options.ssr),
      [`process.env.${options.platform.toUpperCase()}_PORT`]: JSON.stringify(options.port),
     }),

    // exports webpack asset manifest in json format
    new WebpackManifestPlugin({...options.WebpackManifestPluginConfig}),

  );

  if ( options.isWeb )
    config.plugins.push(

      new HtmlWebpackPlugin({
        filename: options.htmlFilename,
        template: options.htmlTemplate,
        hash: false,
        chunks: ['runtime', 'vendor', 'main'],
        chunksSortMode: 'manual',
        ssr: options.ssr,
        ...options.htmlWebpackPluginConfig,
      }),

      new alterHtmlWebpackPlugin({
        isDev: options.isDev,
        ssr: options.ssr,
      }),


      // create PWA manifest
      // https://developer.mozilla.org/en-US/docs/Web/Manifest
      // exports json
      new WebpackPwaManifest({ ...options.webpackPwaManifestConfig }),

      //splitout options.dependencies
      //TODO: get from /starter/config/plugins
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          // This prevents stylesheet resources with the .css or .scss extension
          // from being moved from their original chunk to the vendor chunk
          return (module.resource && (/^.*\.(css|scss)$/).test(module.resource))
            ? false
            : true
        }
      }),

      // splitout webpack boilerplate
      new webpack.optimize.CommonsChunkPlugin({ name: 'runtime', minChunks: Infinity }),

    );
  else if (options.isNode)
    config.plugins.push(
      new webpack.DefinePlugin({ 'process.env.NODE_PORT': JSON.stringify(options.port) }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),

    )

  if (options.emitFiles) {
    config.plugins.push(new WriteFilePlugin());
  }

  if (options.emitFiles || options.isProd) {
    config.plugins.push(
      new webpack.DefinePlugin({ 'process.env.EMIT_FILES': JSON.stringify(true) })
    )
  }

  return config;
};
