/* eslint-disable */
// https://github.com/jantimon/html-webpack-plugin#events
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
// https://stackoverflow.com/questions/3211536/accessing-cross-domain-style-sheet-with-cssrules
function MyPlugin(options) {
  // Configure your plugin with options...
  this.options = options;
}

MyPlugin.prototype.apply = function(compiler) {
  const options = this.options;

  // ...
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
      // add crossorign to force browser to interpret external links
      // TODO: expand this to be more robust
      if (options.isDev && options.ssr)
        htmlPluginData.head.map(asset => {
          if (asset.attributes.href.includes('.css'))
            asset.attributes.crossorigin = 'anonymous'

          return asset;
        });
      callback(null, htmlPluginData);
    });
  });

};

module.exports = MyPlugin;
