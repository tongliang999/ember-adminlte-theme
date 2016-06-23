export function initialize(app) {
  app.inject("component:nav-breadcrumb", "appRoute", "route:application") 
  app.inject("component:main-sidebar", "appRoute", "route:application") 
}

export default {
  name: 'current-path',
  initialize: initialize
};

