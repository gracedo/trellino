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
    "click button.cancel-card-descr": "removeDescrForm",
    "click button.save-card-descr": "saveDescr",
    "click a.card-modal": "removeDescrForm"
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model,
      list: this.list
    })

    var cardDescrShowView = new Trellino.Views.DescrCardsShow({
      model: this.model
    })

    $('.add-card-link-container').removeClass('hidden');
    $('.new-card-form').addClass('hidden');
    this.$el.html(renderedContent);
    this.$el.find('.card-description').html(cardDescrShowView.render().$el);
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
    $('.edit-descr').addClass("hidden");
    $('.card-descr-textarea').focus();
  },
  
  removeDescrForm: function(event) {
    event.preventDefault();
    $('.card-descr-form').addClass("hidden");
    $('.edit-descr').removeClass("hidden");
  },
  
  saveDescr: function(event) {
    var that = this;
    event.preventDefault();
    var cardDescr = $(event.currentTarget.form).serializeJSON().card;

    this.model.save(cardDescr, {
      patch: true,
      success: function() {
        console.log("successfully saved description");
        $('.edit-descr').removeClass("hidden");
        $('.card-modal-'+that.model.id).modal('show');
        $('.card-descr-form').addClass("hidden");
      },
      error: function() {
        console.log("failed to save description");
      }
    })
  }
});