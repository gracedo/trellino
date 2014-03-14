window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Trellino.Collections.boards.fetch({
      success: function() {
        new Trellino.Routers.Boards();
        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  Trellino.initialize();
});


Backbone.CompositeView = Backbone.View.extend({
  subviews: function() {
    if(!this._subviews) {
      this._subviews = {};
    }
    
    return this._subviews;
  },
  
  addSubview: function(selector, subview) {
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);
    
    selectorSubviews.push(subview);
    
    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },
  
  remove: function() {
    Backbone.View.prototype.remove.call(this);
    
    this.subviews().each(function(selectorSubviews, selector) {
      selectorSubviews.each(function(subview) {
        subview.remove();
      })
    })
  },
  
  removeSubview: function(selector, subview) {
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);
    
    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },
  
  renderSubviews: function() {
    var view = this;
    
    this.subviews().each(function(selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();
      
      selectorSubviews.each(function(subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      })
    })
  }
});