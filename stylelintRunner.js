/* eslint-disable */
import stylelint from 'stylelint';
import config from './stylelint.config.js';
import formatter from 'stylelint-formatter-pretty';

export default function stylelintRunner () {
  return stylelint.lint({
    cache: true,
    config,
    files: "./src/**/*.css",
    formatter,
    syntax: 'scss',
  })
    .then(function(data) {
      // do things with data.output, data.errored,
      // and data.results
      return formatter(data.results)
    })
    .catch(function(err) {
      // do things with err e.g.
      return err.stack;
    });
}
