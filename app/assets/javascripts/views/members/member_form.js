Trellino.Views.MemberForm = Backbone.View.extend({
  template: JST['members/form'],
  
  initialize: function(options) {
    this.board = options.board;
    this.members = options.members;
  },
  
  events: {
    "click button.create-new-member": "create",
    "click button.cancel-new-member": "removeMemberForm",
    "blur .member-form": "removeMemberForm"
  },
  
  render: function() {
    var memberIds = [];
    var nonMembers = [];
    
    this.members.each(function(member) {
      memberIds.push(member.id);
    })
    
    Trellino.Collections.users.each(function(user) {
      if(!_.contains(memberIds, user.id)) {
        nonMembers.push(user);
      }
    })

    var renderedContent = this.template({
      boardID: this.board.id,
      nonMembers: nonMembers
    })
    
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    var view = this;
    event.preventDefault();
    var email = $(event.currentTarget.form).serializeJSON().email;
    
    this.board.save({ newMemberEmail: email }, {
      success: function() {
        console.log("successfully added member");
        $('.members-modal').modal('show');
      },
      error: function() {
        console.log("error adding member");
      }
    })
  },
  
  removeMemberForm: function(event) {
    event.preventDefault();
    console.log("removing form");
    $('.new-member-form').empty();
    $('.new-member').removeClass("hidden");
  }
})