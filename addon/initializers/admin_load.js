import Ember from "ember"
const { $, get, set } = Ember;

export default Ember.Component.reopen({
  didRender: function(){
    $.AdminLTE.init()
    this._super();
  }
})
