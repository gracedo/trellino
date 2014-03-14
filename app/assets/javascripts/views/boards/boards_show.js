Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.lists = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    debugger
    var renderedContent = this.template({
      board: this.model,
      lists: this.lists
    })
    
    this.$el.html(renderedContent);
    return this;
  }
})