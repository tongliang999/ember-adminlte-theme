export function initialize(app) {
  if(app.injection){
    app.injection("component:nav-breadcrumb", "appRoute", "route:application") 
    app.injection("component:main-sidebar", "appRoute", "route:application") 
  }else{
    app.inject("component:nav-breadcrumb", "appRoute", "route:application") 
    app.inject("component:main-sidebar", "appRoute", "route:application")   
  }
  
}

export default {
  name: 'current-path',
  initialize: initialize
};

