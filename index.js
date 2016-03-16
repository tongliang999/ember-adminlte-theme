/* jshint node: true */
'use strict';

var path = require('path'),
  Funnel = require('broccoli-funnel'),
  BroccoliMergeTrees = require('broccoli-merge-trees'),
  util = require('util');

module.exports = {
  name: 'ember-adminlte-theme',
  getExamplePath: "pub/example",
  default_options: {
    plugins: ["slimscroll", "fastclick"]
  },
  treeForPublic: function(tree){
    var trees = [tree]

    trees.push(new Funnel("public/", {
      srcDir: "/",
      exclude: ['**/.DS_Store','**/*.md'],
      destDir: "/"
    }))

    if(this.getEnv() == "development"){
      trees.push(new Funnel(this.rootPath +"/vendor/", {
        srcDir: "example",
        destDir: "example"
      }))

      trees.push(new Funnel(this.rootPath +"/vendor/", {
        srcDir: "plugins",
        destDir: "plugins"
      }))
    }

    return BroccoliMergeTrees(trees, {overwrite: true });
  },
  included: function(app){
    var self = this;

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.nodeModulePath = app.options.project.nodeModulesPath
    this.rootPath = this.nodeModulePath + "/"+ this.name

    this.options = this.objMerge({}, this.default_options)

    if(app.options.adminLTE){
      this.options = this.objMerge(this.options, app.options.adminLTE)
      if(app.options.adminLTE.plugins){
        this.options.plugins = this.getUnique(this.default_options.plugins.concat(app.options.adminLTE.plugins))
      }
    }

    app.import('vendor/bootstrap/css/bootstrap.css');
    app.import('vendor/css/AdminLTE.css');
    app.import('vendor/css/_all-skins.min.css');
    app.import('vendor/css/font-awesome.css');
    app.import('vendor/bootstrap/js/bootstrap.js');

    console.log("options: ", this.options)
    
    this.options.plugins.forEach(function(plugin){
      var path = self.plugins_paths[plugin]
      if(path){
        [].concat(path).forEach(function(path){
          app.import("vendor/plugins/"+ path)  
        })
      }
    })
    
    app.import('vendor/js/app.js');
  },
  getEnv: function () {
    return process.env.EMBER_ENV
  },
  logger: function(message){
    console.log('['+ this.name +' HANDLING] '+ message)
  },
  plugins_paths: {
    "slimscroll": "slimScroll/jquery.slimscroll.min.js",
    "fastclick": "fastclick/fastclick.min.js",
    "jquery": "jQuery/jQuery-2.1.4.min.js",
    "input-mask": "jquery.inputmask.js"
  },
  getUnique: function(items){
    var u = {}, a = [];
    for(var i = 0, l = items.length; i < l; ++i){
      if(u.hasOwnProperty(items[i])) {
         continue;
      }
      a.push(items[i]);
      u[items[i]] = 1;
    }
    return a;
  },
  objMerge: function(data, items){
    for(var k in items){  
      data[k] = items[k]
    }
    return data;
  }
};
