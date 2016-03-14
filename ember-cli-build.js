/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
  });

  app.import('vendor/bootstrap/css/bootstrap.min.css');
  app.import('vendor/css/AdminLTE.css');
  app.import('vendor/css/_all-skins.min.css');
  app.import('vendor/css/font-awesome.css');
  app.import('vendor/bootstrap/js/bootstrap.min.js');
  app.import('vendor/js/app.js');

  return app.toTree();
};
