# Ember-admin-lte-theme

admin bootstrap ui theme

Supports ember 2.1.x

## Installation

* `git clone git@github.com:huxinghai1988/ember-adminlte-theme.git` this repository
* `npm install ember-adminlte-theme`
* `vi package.json` 

    "devDependencies": {
      "ember-adminlte-theme": "0.2.0"
    }

## Using
  
  add component for ``application.hbs``

    <div class="wrapper">
      {{main-header}}      
      {{main-sidebar}}     
      {{#content-wrapper}} 
        {{outlet}}
      {{/content-wrapper}}
      {{main-footer}}      
      {{control-sidebar}}
    </div>

  config import [plugins](https://github.com/huxinghai1988/ember-adminlte-theme/blob/master/index.js#L76~L96) ``ember-cli-build.js``

    var app = new EmberApp(defaults, {
      adminLTE: {
        plugins: ['morris', 'icheck', 'datepicker', 
          'bootstrap-wysihtml5', 'daterangepicker', 'jvectormap',
          'select2', 'input-mask'
        ]
      }
    });


## Running

* `ember server`
* Visit your app at http://localhost:4200.
* Visit example at http://localhost:4200/example/index.html

### Example index SCP questions

    //config/environment.js

    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' *",
      'font-src': "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com fonts.gstatic.com",
      'connect-src': "'self' *",
      'img-src': "'self' * data:",
      'style-src': "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com"
    }


## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
