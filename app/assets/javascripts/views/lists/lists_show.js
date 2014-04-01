Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.boardID = this.model.get("board_id");
    this.board = Trellino.Collections.boards.get(this.boardID);
    this.cards = this.model.cards();
    this.allCards = this.board.cards();
    
    this.listenTo(this.model, "add remove change:rank sync", this.render);
    this.listenTo(this.cards, "add", this.addCard);
    this.listenTo(this.cards, "remove add", this.render);
    
    this.cards.each(
      this.addCard.bind(this)
    )
  },
  
  events: {
    "click button.remove-list": "removeList",
    "click a.add-card-link": "addCardForm",
    // "blur .add-card-container": "removeCardForm",
    "sortstop": "sortCard"
  },
  
  render: function() {
    var that = this;
    
    if(this.cards) {
      this.cards.sort();
    }
    
    var renderedContent = this.template({
      list: this.model,
      cards: this.cards
    });

    $('button.new-list').removeClass('hidden');
    $('.new-list-form').empty();
    this.$el.html(renderedContent);
    
    $(this.$el.find(".cards-list")).sortable({
      cursor: "move",
      opacity: 0.3,
      connectWith: ".cards-list"
    });
    
    this.renderSubviews();
    return this;
  },
  
  sortCard: function(event, ui) {
    var that = this;

    var $card = $(ui.item.children());
    var nextOrder = ui.item.next().children().data("rank");
    var prevOrder = ui.item.prev().children().data("rank");
    
    var updatedOrder = this._calculatePosition(parseFloat(prevOrder), parseFloat(nextOrder));
    var cardId = $card.data("id");
    var oldListId = $card.data("list-id");
    var updatedCardListId = $card.parent().parent().parent().parent().data("id");
    var cardModel = this.allCards.get(cardId);
    
    cardModel.save({
      rank: updatedOrder,
      list_id: updatedCardListId },
      { patch: true,
        success: function(model){
          $card.data("rank", updatedOrder);
          that.cards.add(model);
          // remove it from the old list's collection
          Trellino.Collections.lists.get(oldListId).cards().remove(model, { silent: true });
          $card.data("list-id", updatedCardListId);
        }
      });
    },

  _calculatePosition: function(prevPos, nextPos){
    if(!nextPos){
      if(!prevPos){
        return 1;
      } else {
        return (prevPos + 1);
      }
    } else if(!prevPos){
      return (nextPos / 2);
    }
    return (nextPos + prevPos) / 2;
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
    if(!this.allCards.contains(card)) {
      var cardsShowView = new Trellino.Views.CardsShow({
        model: card,
        list: this.model
      });
    
      this.addSubview(".cards-list", cardsShowView);
      cardsShowView.render();
    }
  },
  
  addCardForm: function(event) {
    event.preventDefault();
    $(event.target.parentElement).addClass("hidden");
    var cardFormView = new Trellino.Views.CardForm({
      list: this.model,
      cards: this.cards
    });
    $('.new-card-form#'+this.model.id).removeClass('hidden');
    $('.new-card-form#'+this.model.id).html(cardFormView.render().$el);
    // $('.new-card-form').find("data-listID='" + this.model.id + "'")
  }// ,
//   
//   removeCardForm: function(event) {
//     event.preventDefault();
//     debugger
//     $('a.add-card-link').removeClass('hidden');
//     $(event.target).find('.new-card-form#'+this.model.id).empty();
//   }
})