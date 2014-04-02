Trellino.Views.MemberForm = Backbone.View.extend({
  template: JST['members/form'],
  
  initialize: function(options) {
    this.board = options.board;
    // this.lists = options.lists;
    this.members = options.members;
  },
  
  events: {
    "click button.create-new-member": "create",
    "click button.cancel-new-member": "removeMemberForm"
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
    var email = $(event.currentTarget.form).serializeJSON().user_email;
    
    this.board.save({ newMemberEmail: email }, {
      success: function() {
        // console.log(list)
        console.log("successfully added member");
      },
      error: function() {
        console.log("error - member not found");
      }
    })
  },
  
  removeMemberForm: function(event) {
    event.preventDefault();
    $('.new-member-form').empty();
    $('.new-member').removeClass("hidden");
  }
})