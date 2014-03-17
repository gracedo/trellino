Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.boardID = this.model.get("board_id");
    this.board = Trellino.Collections.boards.get(this.boardID);
    // this.cards = options.cards;
    // debugger
    this.cards = this.model.cards();
    debugger
    
    this.listenTo(this.model, "all", this.render);
    // this.listenTo(this.model, "remove", this.removeList);
    
    this.cards.each(
      this.addCard.bind(this)
    )
  },
  
  events: {
    "click button.remove-list": "removeList"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model,
      cards: this.cards
    });
    // debugger
    $('button.new-list').removeClass('hidden');
    // $('.new-list-form').addClass("hidden");
    $('.new-list-form').empty();
    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },
  
  removeList: function(event) {
    event.preventDefault();
    var that = this;
    
    this.model.destroy({
      success: function (list) {
        var currBoardShowView = new Trellino.Views.BoardsShow({
          model: that.board
        })
        
        currBoardShowView.removeSubview(".lists", that); // remove list showview from board subviews
        console.log("deleted list " + list.id + ", titled " + list.get("title"));
      }
    });
  },
  
  addCard: function(card) {
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card
    });
    
    this.addSubview(".cards", cardsShowView);
    cardsShowView.render();
  }
})