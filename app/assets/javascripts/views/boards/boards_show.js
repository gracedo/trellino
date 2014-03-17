Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.lists = this.model.lists();
    this.members = this.model.members();
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.lists, "add", this.addList);
    this.listenTo(this.members, "add", this.addMember)

    this.lists.each(
      this.addList.bind(this)
    )
    
    this.members.each(
      this.addMember.bind(this)
    )
    
    // var listNewView = new Trellino.Views.ListForm({
    //   model: this.model,
    //   collection: this.lists
    // });
    // 
    // this.addSubview(".new-list-form", listNewView);
  },
  
  events: {
    "click button.new-list": "addListForm",
    "click button.new-member": "addMemberForm"
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model,
      lists: this.lists
    });
    
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },
  
  addListForm: function(event) {
    $(event.target).addClass("hidden");
    
    var listFormView = new Trellino.Views.ListForm({
      board: this.model,
      lists: this.lists
    });
    
    // this.addSubview(".new-list-form", listNewView);
    $('.new-list-form').html(listFormView.render().$el);
  },
  
  addMemberForm: function(event) {
    $(event.target).addClass("hidden");
    
    var memberFormView = new Trellino.Views.MemberForm({
      board: this.model,
      // lists: this.lists
      members: this.members
    });

    $('.new-member-form').html(memberFormView.render().$el)
  },
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.ListsShow({
      model: list
    });
    
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  },
  
  addMember: function(member) {
    var membersShowView = new Trellino.Views.MembersShow({
      model: member
    });
    
    this.addSubview(".board-members", membersShowView);
    membersShowView.render();
  }
})