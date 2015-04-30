import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["disabled"],
  disabled: false,

  click: function() {
    // this.sendAction("on-click");
    this.sendAction("action");
  }
});
