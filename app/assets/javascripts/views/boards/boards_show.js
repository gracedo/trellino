Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    this.model = options.model
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model
    })
    
    this.$el.html(renderedContent);
    return this;
  }
})