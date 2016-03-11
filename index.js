/* jshint node: true */
'use strict';

var path = require('path'),
  util = require('util');

module.exports = {
  name: 'ember-adminLte-theme',
  included: function(app){
    
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.import('vendor/bootstrap/css/bootstrap.min.css');
    app.import('vendor/css/AdminLTE.css');
    app.import('vendor/css/_all-skins.min.css');
    app.import('vendor/css/font-awesome.css');
    app.import('vendor/bootstrap/js/bootstrap.min.js');
    app.import('vendor/js/app.js');
    
    return app.toTree();
  }
};
