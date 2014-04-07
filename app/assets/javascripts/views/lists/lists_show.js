Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.boardID = this.model.get("board_id");
    this.board = Trellino.Collections.boards.get(this.boardID);
    this.cards = this.model.cards();
    this.allCards = this.board.cards();
    
    // this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.cards, "add", this.render);
    // this.listenTo(this.cards, "sync change remove add", this.render);
    this.listenTo(this.board.lists(), "sync", this.render);
    
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
    
    $(this.$el.find("div.cards-list")).sortable({
      cursor: "move",
      opacity: 1,
      connectWith: "div.cards-list",
      dropOnEmpty: true,
      placeholder: "ui-state-highlight",
      forcePlaceholderSize: true,
      start: function(event, ui) {
        $(ui.item).toggleClass('dragged');
      }
    });
    
    this.renderSubviews();
    return this;
  },
  
  sortCard: function(event, ui) {
    var that = this;
    
    $(ui.item).toggleClass('dragged');
    var $card = $(ui.item.children());
    var nextOrder = ui.item.next().children().data("rank");
    var prevOrder = ui.item.prev().children().data("rank");
    
    var updatedOrder = this._calculatePosition(parseFloat(prevOrder), parseFloat(nextOrder));
    var cardId = $card.data("id");
    var oldListId = $card.data("list-id");
    var updatedCardListId = $card.parent().parent().parent().data("id");
    var cardModel = this.allCards.get(cardId);
    
    cardModel.save({
      rank: updatedOrder,
      list_id: updatedCardListId },
      { patch: true,
        success: function(card){
          $card.data("rank", updatedOrder);
          that.cards.remove(card); // remove it from the old list's cards
          
          // Trellino.Collections.lists.get(oldListId).cards().remove(card, { silent: true });
          // that.board.lists().get(oldListId).cards().remove(card, { silent: true });

          that.board.lists().get(updatedCardListId).cards().add(card);
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
      success: function () {
        var currBoardShowView = new Trellino.Views.BoardsShow({
          model: that.board
        })

        currBoardShowView.removeSubview(".lists-container", that); // remove list showview from board subviews
        console.log("successfully deleted list");
      },
      
      error: function() {
        console.log("list deletion failed");
        console.log(arguments[1].responseText)
      }
    });
  },
  
  addCard: function(card) {
    var cardsShowView = new Trellino.Views.CardsShow({
      model: card,
      list: this.model,
      allCards: this.allCards
    });
  
    this.addSubview(".cards-list", cardsShowView);
    this.allCards.push(card);
    cardsShowView.render();
  },
  
  addCardForm: function(event) {
    event.preventDefault();
    $(event.target).addClass("hidden");
    
    var cardFormView = new Trellino.Views.CardForm({
      list: this.model,
      cards: this.cards,
      listView: this
    });
    
    $('.new-card-form#'+this.model.id).removeClass('hidden');
    $('.new-card-form#'+this.model.id).html(cardFormView.render().$el);
    // $('.lists-container').append($('.new-card-form#'+this.model.id'));
  }
})