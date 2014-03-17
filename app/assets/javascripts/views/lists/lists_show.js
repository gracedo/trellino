Trellino.Views.ListsShow = Backbone.View.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.model = options.model
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    $('button.new-list').removeClass('hidden');
    // $('.new-list-form').addClass("hidden");
    $('.new-list-form').empty();
    this.$el.html(renderedContent);
    return this;
  }
})