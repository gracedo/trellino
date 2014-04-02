Trellino.Views.ListForm = Backbone.View.extend({
  template: JST["lists/form"],
  
  initialize: function(options) {
    this.board = options.board;
    this.lists = options.lists;
  },
  
  events: {
    "click button.new-list": "create",
    "click button.cancel-new-list": "removeListForm"
  },
  
  render: function() {
    var renderedContent = this.template({
      boardID: this.board.id,
      rank: this.lists.length+1
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().list;
    
    var newList = new Trellino.Models.List($formData);

    this.lists.create(newList, {
      success: function() {
        Trellino.Collections.lists.add(newList);
        console.log("successfully added list");
      },
      
      error: function() {
        console.log("error")
      }
    })
  },
  
  removeListForm: function(event) {
    event.preventDefault();
    $('.add-list-link-container').removeClass('hidden');
    $('.new-list-form').empty();
  }
})