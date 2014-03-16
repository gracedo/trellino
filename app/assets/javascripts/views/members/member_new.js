Trellino.Views.MemberNew = Backbone.View.extend({
  template: JST['members/new'],
  
  initialize: function(options) {
    this.board = options.board;
    this.collection = options.collection;
  },
  
  events: {
    "click button.new-member": "create"
  },
  
  render: function() {
    var renderedContent = this.template({
      boardID: this.board.id
    })
    
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function() {
    debugger
    var view = this;
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().board_assignments;
    
    // $formData.board_assignments[user_id] = 
    
    var newMember = new Trellino.Models.User($formData);
    debugger

    this.collection.create(newMember, {
      success: function() {
        // console.log(list)
        console.log("successfully added member");
        // Backbone.history.navigate('', { trigger: true })
      },
      
      error: function() {
        console.log("error");
      }
    })
  }
})