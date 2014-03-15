Trellino.Views.BoardsForm = Backbone.View.extend({
  template: JST["boards/form"],
  
  initialize: function(options) {
    this.model = options.model;
    this.collection = options.collection;
  },
  
  events: {
    "click button.new-board": "submit"
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    
    var $formData = $(event.currentTarget.form).serializeJSON();
    this.model.set($formData);
    
    this.collection.create(this.model, {
      success: function(board) {
        Backbone.history.navigate('#/boards/' + board.id, { trigger: true })
      }
    })
  }
})