Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    // this.model = options.model;
    this.lists = this.model.lists();
    this.members = this.model.members();
    // this.cards = this.model.cards();
    
    this.listenTo(this.model, "sync remove", this.render);
    this.listenTo(this.lists, "add", this.addList);
    this.listenTo(this.members, "add", this.addMember);
    // this.listenTo(this.lists, "sync remove", this.render);

    this.lists.each(
      this.addList.bind(this)
    )
    
    this.members.each(
      this.addMember.bind(this)
    )
    
    // this.cards.each(
    //   this.addCard.bind(this)
    // )
  },
  
  events: {
    "click button.new-list": "addListForm",
    "click button.new-member": "addMemberForm",
    "click button.remove-board": "removeBoard"
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
      model: list// ,
//       cards: this.cards
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
  },
  
  removeBoard: function() {
    this.remove(); // remove board subviews
    this.model.destroy({
      success: function(model) {
        console.log("deleted board " + model.id + ", titled " + model.get("title"));
        Backbone.history.navigate('', { trigger: true })
      },
      error: function(model) {
        console.log("error deleting board " + model.id + ", titled " + model.get("title"))
      }
    });
  }// ,
//   
//   addCard: function(card) {
//     var cardsShowView = new Trellino.Views.CardsShow({
//       model: card
//     });
//     
//     var listID = card.get("list_id");
//     debugger
//     var listShowView = new Trellino.Views.ListsShow({
//       model: this.lists.get(listID)// ,
// //       cards: this.cards
//     });
//     
//     listShowView.addSubview(".cards", cardsShowView);
//     cardsShowView.render();
//   }
})