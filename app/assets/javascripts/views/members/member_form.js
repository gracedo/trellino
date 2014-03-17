Trellino.Views.MemberForm = Backbone.View.extend({
  template: JST['members/form'],
  
  initialize: function(options) {
    this.board = options.board;
    // this.lists = options.lists;
    this.members = options.members;
  },
  
  events: {
    "click button.new-member": "create"
  },
  
  render: function() {
    var renderedContent = this.template({
      boardID: this.board.id,
      allUsers: Trellino.Collections.users
    })
    
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    var view = this;
    event.preventDefault();
    // var $formData = $(event.currentTarget.form).serializeJSON().board_assignments;
    
    // $formData.board_assignments[user_id] = 
    
    var email = $(event.currentTarget.form).serializeJSON().user_email;
    
    var memberData = Trellino.Collections.users.get(email);
    
    debugger
    var userId = memberData.id
    
    var newMember = new Trellino.Models.User({
      board_id: this.board.id,
      user_id: userId
    })
    
    // var newMember = new Trellino.Models.User($formData);
    debugger

    this.members.create(newMember, {
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