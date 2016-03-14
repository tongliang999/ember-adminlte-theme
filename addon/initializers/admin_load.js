import Ember from "ember"

export default Ember.Component.reopen({
  didRender: function(){
    $.AdminLTE.init()
    this._super();
  }
})
