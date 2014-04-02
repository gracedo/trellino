Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function(options) {
    this.listenTo(this.model, "remove add change:rank", this.render);
    this.list = options.list,
    this.allCards = options.allCards
  },
  
  events: {
    "click button.remove-card": "removeCard",
    "mouseover .card": "addDeleteButton",
    "mouseleave .card": "removeDeleteButton"
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model,
      list: this.list
    })
    
    $('.add-card-link-container').removeClass('hidden');
    // $('.add-card-link#'+this.list.id).removeClass('hidden');
    // $('.new-card-form').empty();
    $('.new-card-form').addClass('hidden');
    this.$el.html(renderedContent);
    return this;
  },
  
  removeCard: function(event) {
    event.preventDefault();
    var that = this;
    var cardID = this.model.id;
    var cardToDelete = this.allCards.get(cardID);
    
    cardToDelete.destroy({
      success: function(card) {
        console.log('deleted card');
        var currListShowView = new Trellino.Views.ListsShow({
          model: that.list
        })
        
        currListShowView.removeSubview(".cards-list", that);
      }
    })
  },
  
  addDeleteButton: function(event) {
    $(event.target).find('.remove-card').removeClass('hidden');
  },
  
  removeDeleteButton: function(event) {
    $(event.target).find('.remove-card').addClass('hidden');
  }
});