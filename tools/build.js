#!/usr/bin/env node
// more info on Webpack's Node API here:
// https://webpack.github.io/docs/node.js-api.html
// allowing console calls below since this is a build file

/* eslint no-unused-vars: "off" */
/* eslint max-len: "off"*/
import webpack from 'webpack';
import colors from 'colors';
import log from 'npmlog';
import webpackConfig from '../webpack.config';

process.env.NODE_ENV = 'production';

log.info('Generating minified bundle for production via webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    log.info(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => log.info(error.red)
    );
  }
  if (jsonStats.hasWarnings) {
    log.info('Webpack generated the foolowing warning: '.bold.yellow);
    jsonStats.warnings.map(warning => log.info(warning.yellow)
    );
  }

  log.info(`Webpack stats: ${stats}`.yellow);

  // if we got this far, the build succeded.
  log.info('Your app has been compiled in production mode and written to dist. It\'s ready to roll!'.green);

  return 0;
});
