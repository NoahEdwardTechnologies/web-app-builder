/* eslint-disable */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import revHash from 'rev-hash';
import webpack from 'webpack';

// TODO: split this out to multiple files
export default function modules(options) {
  const getCssLoaderName = () => `css-loader${options.isNode ? '/locals': ''}`;


  const getCssLoaders = () => [
    {
      loader: getCssLoaderName(),
      options: options.cssLoaderConfig,
    },
    // see https://github.com/postcss/postcss-loader
    {
      loader: 'postcss-loader',
      options: {
        options: {
          ident: 'postcss',
          exec: true,
          sourceMap: options.sourceMap,
          syntax: 'postcss-scss',
        },
        plugins () {
          return [
            require('cq-prolyfill/postcss-plugin')(),
            require("postcss-import")({
              addDependencyTo: webpack,
              addModulesDirectories: [options.contentBase],
            }),
            require("postcss-url")(),
            require("postcss-cssnext")({
              ...options.babelTarget,
              features: { // https://github.com/MoOx/postcss-cssnext/blob/master/src/features.js
                customProperties: false
              }
            }),
            require('postcss-current-selector')(),
            require('postcss-flexbugs-fixes')(),
            require('postcss-nested')({ preserveEmpty: true }),
            require('postcss-nested-ancestors')(),
            require('postcss-css-variables')(),
            require('postcss-font-magician')({
              founders: ['google'],
            }),

            require('postcss-sprites')({
              relativeTo: 'rule',
              spritePath: `${options.clientPublicDir}/images/`,
              hooks: {
                //https://github.com/2createStudio/postcss-sprites/blob/master/examples/webpack-hot-load.md
                //onUpdateRule doesnt work
                // onUpdateRule: function(rule, token, image) {
        				// 	// `this` is the webpack loader context
        				// 	this.addDependency(image.path); // adds a watch to the file
        				// },
        				onSaveSpritesheet: function(opts, spritesheet) {
        					return path.join(
        						opts.spritePath,
        						spritesheet.groups.concat([
                      'sprite', //name of image
        							revHash(spritesheet.image),
        							spritesheet.extension
        						]).join('.')
        					);
        				}
              }
            }),
            require('postcss-write-svg')(),
            require('postcss-remove-root')(),
            require('css-mqpacker')(),
          ]
          .filter(plugin => plugin)
          .concat( options.isDev && options.isWeb
            ? [
              require('postcss-browser-reporter')(),
              require('postcss-reporter')({
                throwError: false,
                clearAllMessages: true,
              }),
            ]
            : []
          )
        }
      }
    },
    // {
    //   loader: 'resolve-url-loader',
    //   options: {
    //     ...options.resolveUrlLoaderConfig,
    //   }
    // },
  ];

  const cssRules = {
    enforce: 'pre',
    test:  /\.css$/,
    exclude: /node_modules/,
    use: options.isWeb
      ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: getCssLoaders(),
        })
      : getCssLoaders()
  };

  if (options.env === 'development' && options.isWeb) {
    cssRules.use = ['css-hot-loader'].concat(cssRules.use);
  }

  const getCssFromNodeLoaders = () => [
    {
      loader: getCssLoaderName(),
      options: {
        importLoaders: 0,
        modules: false,
        minimize: options.isProd,
        sourceMap: options.isDev,
        localIdentName: '[local]'
      },
    },
  ];

  const cssFromNodeModules = { // dont process with post-css
    enforce: 'pre',
    test: /\.css$/,
    include: /node_modules/,
    use: options.isWeb
      ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: getCssFromNodeLoaders()
      })
      : getCssFromNodeLoaders()
  }

  const addEslintLoader = () =>  options.isDev
    ? {
      loader: 'eslint-loader',
      options: {
        fix: false, // causes compile endles loop
        emitError: true,
        emitWarning: true,
        quiet: false,
        failOnWarning: false,
        failOnError: false,
      }
    }
    : null;

  const javascriptRules = {
    // TODO: add babe;-preset to this config from starter/config/modules.js
    enforce: 'pre',
    exclude: /node_modules/,
    test: /\.jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          ...options.babelLoaderConfig,
        }
      },
      addEslintLoader(),
    ].filter(rule => rule)
  };

  const htmlRules = {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: options.isProd,
          removeComments: false,
          collapseWhiteSpace: options.isProd,
        }
      }
    ],
  };

  const processLoaderString = (text) => options.isWeb
    ? text
    : `${text}?emitFile=false`;

  const urlLoaderString = processLoaderString('url-loader');
  const fileLoaderString = processLoaderString('file-loader');

  const imageRules = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        // TODO: review image-webpack-loader
        loader: urlLoaderString,
        options: {
          ...options.urlLoaderConfig,
          name: options.assetFilename, // TODO: combine these into assetLoaders
        }
      }
    ]
  }

  const fontRules = {
    test: /\.(eot|ttf|woff|woff2|ttf|otf)$/,
    use: [
      {
        // TODO: review the limit setting
        loader: urlLoaderString,
        options: {
          ...options.urlLoaderConfig,
          name: options.assetFilename,
        }
      }
    ]
  }

  const excelRules = {
    test: /\.(csv|tsv)$/,
    use: [
      'csv-loader'
    ]
  };

  const xmlRules = {
    test: /\.xml$/,
    use: [
      'xml-loader'
    ]
  };

  const faviconRules = {
    test: /\.(ico)$/,
    use: [
      {
        loader: urlLoaderString,
        options: {
          limit: 1,
          name: '[name].[ext]',
        }
      }
    ]
  };

  const workerRules = {
    test: /\.worker\.js$/,
    use: {
      loader: 'worker-loader',
      options: {
        name: `js/worker${options.isProd ?'.[chunkhash]' : ''}.js`,
        fallback: false,
        inline: false // set to true if assets arent loading due to same origin policy
      },
    },
  };

  const audioRules = {
    test: /\.(mp4|ogg|mp3|wav)$/,
    use: [
      {
        loader: fileLoaderString,
        options: {
          limit: 8192,
          name: options.assetFilename,
        }
      }
    ]
  };

  const txtRules = {
    test: /\.txt$/,
    use: 'raw-loader',
  };

  const jsonRules = {
    test: /\.json$/,
    use: 'json-loader',
  };

  return {
    module: {
      rules: [
        audioRules,
        cssFromNodeModules,
        cssRules,
        excelRules,
        faviconRules,
        fontRules,
        htmlRules,
        imageRules,
        javascriptRules,
        jsonRules,
        txtRules,
        workerRules,
        xmlRules,
      ].filter(rule => rule)
    },

  };
};
