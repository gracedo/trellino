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
    if(this.lists.length > 0) {
      var rank = parseInt(this.lists.last().get("rank")+1);
    } else {
      var rank = 1;
    }
    
    var renderedContent = this.template({
      boardID: this.board.id,
      // rank: this.lists.length+1
      rank: rank
    });

    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().list;
    
    var newList = new Trellino.Models.List($formData);
    $('.add-list-link-container').removeClass('hidden');

    this.lists.create(newList, {
      success: function(list) {
        // Trellino.Collections.lists.add(newList);
        console.log("successfully added list " + list.id);
      },
      
      error: function() {
        console.log("error");
      }
    })
  },
  
  removeListForm: function(event) {
    event.preventDefault();
    $('.add-list-link-container').removeClass('hidden');
    $('.new-list-form').empty();
  }
})