Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  
  initialize: function(options) {
    this.collection = options.collection;
  },
  
  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    })

    this.$el.html(renderedContent);
    return this;
  }
});
