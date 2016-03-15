/* jshint node: true */
'use strict';

var path = require('path'),
  Funnel = require('broccoli-funnel'),
  BroccoliMergeTrees = require('broccoli-merge-trees'),
  util = require('util');

module.exports = {
  name: 'ember-adminlte-theme',
  getExamplePath: "pub/example",
  treeForPublic: function(tree){
    var trees = [tree]

    trees.push(new Funnel("public/", {
      srcDir: "/",
      exclude: ['**/.DS_Store','**/*.md'],
      destDir: "/"
    }))

    if(this.getEnv() == "development"){
      trees.push(new Funnel( this.rootPath +"/vendor/", {
        srcDir: "example",
        destDir: "example"
      }))  
    }

    return BroccoliMergeTrees(trees, {overwrite: true });
  },
  included: function(app){
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.nodeModulePath = app.options.project.nodeModulesPath
    this.rootPath = this.nodeModulePath + "/"+ this.name

    app.import('vendor/bootstrap/css/bootstrap.css');
    app.import('vendor/css/AdminLTE.css');
    app.import('vendor/css/_all-skins.min.css');
    app.import('vendor/css/font-awesome.css');
    app.import('vendor/bootstrap/js/bootstrap.js');
    app.import('vendor/js/app.js');
  },
  getEnv: function () {
    return process.env.EMBER_ENV
  },
  logger: function(message){
    console.log('['+ this.name +' HANDLING] '+ message)
  }
};
