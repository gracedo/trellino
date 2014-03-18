Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.boardID = this.model.get("board_id");
    this.board = Trellino.Collections.boards.get(this.boardID);
    this.cards = this.model.cards();
    
    this.listenTo(this.model, "add remove", this.render);
    this.listenTo(this.cards, "add", this.addCard);
    
    this.cards.each(
      this.addCard.bind(this)
    )
  },
  
  events: {
    "click button.remove-list": "removeList",
    "click a.add-card-form": "addCardForm"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model,
      cards: this.cards
    });

    $('button.new-list').removeClass('hidden');
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
  },
  
  addCardForm: function(event) {
    event.preventDefault();
    $(event.target).addClass("hidden");
    
    var cardFormView = new Trellino.Views.CardForm({
      list: this.model,
      cards: this.cards
    });
    
    $('.new-card-form#'+this.model.id).html(cardFormView.render().$el);
    // $('.new-card-form').find("data-listID='" + this.model.id + "'")
  }
})