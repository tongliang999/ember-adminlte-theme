# Ember-admin-lte-theme

admin bootstrap ui theme

## Installation

* `git clone git@github.com:huxinghai1988/ember-adminlte-theme.git` this repository
* `npm install ember-adminlte-theme`
* `vi package.json` "ember-adminlte-theme": "^0.0.1"

## Using
  
  add componement for application.hbs

    <div class="wrapper">
      {{main-header}}      
      {{main-sidebar}}     
      {{#content-wrapper}} 
        {{outlet}}
      {{/content-wrapper}}
      {{main-footer}}      
      {{control-sidebar}}
    </div>

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
