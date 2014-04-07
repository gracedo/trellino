Trellino.Views.BoardForm = Backbone.View.extend({
  template: JST["boards/form"],
  
  initialize: function(options) {
    this.model = new Trellino.Models.Board();
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

    var $formData = $(event.currentTarget.form).serializeJSON().board;
    this.model.set($formData);
    
    this.collection.create(this.model, {
      success: function(newBoard) {
        console.log("board successfully created");
        Backbone.history.navigate('#/boards/' + newBoard.id, { trigger: true });
      },
      error: function() {
        console.log("board creation failed");
        console.log(arguments[1].statusText);
        // Backbone.history.navigate('', { trigger: true });
      }
    })
  }
})