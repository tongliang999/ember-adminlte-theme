import Ember from 'ember';

const { computed, isBlank, isPresent } = Ember;

export default Ember.Component.extend({
  breadCrumb: [],

  routeName: computed("appRoute.controller.currentRouteName", function(){
    return this.get('appRoute.controller.currentRouteName')
  }),

  routeUrl: computed("appRoute.router.url", function(){
    return this.get("appRoute.router.url").replace(/\?.*/, "")
  }),

  // urlChanged: function(){
  //   this.breadCrumbComputed()
  // }.observes("appRoute.router.url"),

  urlChanged: function(){
    this.breadCrumbComputed()
  }.observes("appRoute.controller.currentRouteName"),

  didInsertElement(){
    let that = this;

    Ember.run.next( () => {
      that.breadCrumbComputed();
    })
  },

  defaultRouteTitle() {
    return {
      "orders": "Orders",
      "orders.report": "OrderReport", 
    }
  },

  initRouter(){
    let _name = this.get("appRoute.controller.currentRouteName");
    let _url = this.get("appRoute.router.url");
    this.set("routeName", _name);
    this.set("routeUrl", _url);
  },

  getRouterDefined(_routeName) {
    if( isBlank(_routeName) ){ return null; } 
    // Ember 2.3 version
    // let container = Em.getOwner(this);
    return this.container.lookup(`route:${_routeName}`);
  },

  breadCrumbComputed:  function(){
    let that = this;
    let isRouterDefined = (_router) => { return Em.isPresent(_router) };

    let urlNames = that.get("routeName").split(".");
    
    if( isBlank(urlNames[0]) ){ urlNames.shift(); } 

    let len = urlNames.length;
    let _routerArray = urlNames.map( (name, index) => {
      let exist = false;
      let _names = urlNames.slice(0, index + 1);
      let _routeName = _names.join(".");
      
      // 获取有效路由
      let router = that.getRouterDefined(_routeName);
      if( isRouterDefined(router) ){
        exist = true;
      }else{
        if( _names[len - 1] == "index" ){
          _names.pop();
        }else{
          _names.push("index");
        }
      }

      _routeName = _names.join(".");
       router = that.getRouterDefined(_routeName);
      if( isRouterDefined(router) ){
        exist = true;
      }
      if(exist){ // 当路由有效时
        let navTitle = _names[_names.length - 1] || "";
        // 面包屑字面
        if(router.get("breadCrumb")){
          navTitle = router.get("breadCrumb.title")
        }else{
          let tmpNames = _names.copy(), tmpRouteName, tmpRoute;
          let nameIndex = tmpNames.indexOf("index");
          nameIndex != -1 ?  delete tmpNames[nameIndex] : tmpNames.push("index")

          tmpRouteName = tmpNames.join(".")
          tmpRoute = that.getRouterDefined(tmpRouteName);

          if(tmpRoute && tmpRoute.get("breadCrumb")){
            navTitle = tmpRoute.get("breadCrumb.title")
          }else{             
            navTitle = that.defaultRouteTitle()[_routeName] 
          }
        }
        navTitle = navTitle || "";
        _names.unshift("#");
        return {
          title: navTitle,
          url: _names.join("/"),
          isActive: index == (len - 1) ? true : false
        }
      }else{ // 当路由无效时
        console.info(`========> no router defined ${_routeName}`)
      }
    }).compact();

    // if(_routerArray.length <= 0) 
    let lastIndex = _routerArray.length - 1, lastPre = _routerArray[lastIndex - 1], lastItem = _routerArray[lastIndex];

    if( lastItem.title == "index" ) {  
      delete _routerArray[lastIndex];
      if(lastPre){ lastPre.isActive = true; }
    };

    if( /.*?\/index$/.test(lastItem.url) ){
      if( isPresent(_routerArray[lastIndex]) ) { delete _routerArray[lastIndex - 1]; }
    }

    _routerArray.unshift({title: "首页", url: "/", isActive: false}) 
    _routerArray = _routerArray.compact();

    that.set("breadCrumb", _routerArray);
  },
});
