Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function(options) {
    this.list = options.list;
    this.allCards = options.allCards;
    
    this.listenTo(this.model, "add remove", this.render);
    // this.listenTo(this.list, "change", this.render);
  },
  
  events: {
    "click button.remove-card": "removeCard",
    "mouseover .card": "addDeleteButton",
    "mouseleave .card": "removeDeleteButton",
    "click a.edit-descr": "addDescrForm",
    "click button.save-card-descr": "saveDescr"
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model,
      list: this.list
    })
    
    $('.add-card-link-container').removeClass('hidden');
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
        $(".card-modal-"+that.model.id).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
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
  },
  
  addDescrForm: function(event) {
    event.preventDefault();
    $('.card-descr-form').removeClass("hidden");
    $('.card-descr-textarea').focus();
  },
  
  saveDescr: function(event) {
    var that = this;
    event.preventDefault();
    var cardDescr = $(event.currentTarget.form).serializeJSON().card;

    this.model.save(cardDescr, {
      patch: true,
      success: function() {
        console.log("successfully saved description");
        debugger
        $('.card-modal-'+that.model.id).modal('show');
      },
      error: function() {
        console.log("failed to save description");
      }
    })
  }
});