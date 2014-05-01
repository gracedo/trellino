Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function(options) {
    this.list = options.list;
    this.allCards = options.allCards;
    
    this.listenTo(this.model, "add remove change:title", this.render);
    // this.listenTo(this.list, "change", this.render);
  },
  
  events: {
    "click button.remove-card": "removeCard",
    "click button.modal-remove-card": "removeCard",
    "mouseover .card": "addDeleteButton",
    "mouseleave .card": "removeDeleteButton",
    "click a.edit-card-title": "addEditTitleForm",
    "click button.save-title": "editCardTitle",
    "click div.add-descr": "addDescrForm",
    "click a.edit-descr": "addDescrForm",
    "click button.cancel-card-descr": "removeDescrForm",
    "click button.save-card-descr": "saveDescr",
    "click a.card-modal": "removeForms"
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model,
      list: this.list,
      board: Trellino.Collections.boards.get(this.list.escape("board_id"))
    })

    var cardDescrShowView = new Trellino.Views.DescrCardsShow({
      model: this.model
    })

    $('.add-card-link-container').removeClass('hidden');
    $('.new-card-form').addClass('hidden');
    this.$el.html(renderedContent);
    this.$el.find('.card-description').html(cardDescrShowView.render().$el);
    
    this.$el.find('input').bind('click mouseup mousedown keypress keydown keyup', function(e) {
      e.stopPropagation();
    });

    this.$el.find('textarea').bind('click mouseup mousedown keypress keydown keyup', function(e) {
      e.stopPropagation();
    });
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
  
  addEditTitleForm: function(event) {
    event.preventDefault();
    
    this.$el.find('#card-title-form').removeClass("hidden");
    this.$el.find('#card-title').addClass("hidden");
    this.$el.find('.card-title-input').focus().val($(".card-title-input").val());
  },
  
  editCardTitle: function(event) {
    var that = this;
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().card;

    this.model.save($formData, {
      patch: true,
      success: function() {
        console.log("card successfully updated");
        $('.card-modal-'+that.model.id).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#card-title-form').addClass("hidden");
        // $('.card-modal-'+that.model.id).modal('show');
        $('#card-title').removeClass("hidden");
      },
      error: function() {
        console.log("card was not updated");
        console.log(arguments[1].responseText);
      }
    })
  },
  
  addDescrForm: function(event) {
    event.preventDefault();
    $('.card-descr-form').removeClass("hidden");
    $('.add-descr').addClass("hidden");
    $('.card-descr-textarea').focus();
  },
  
  removeForms: function(event) {
    event.preventDefault();
    this.$el.find('#card-title-form').addClass("hidden");
    this.$el.find('#card-title').removeClass("hidden");
    $('.card-descr-form').addClass("hidden");
    $('.add-descr').removeClass("hidden");
  },
  
  saveDescr: function(event) {
    var that = this;
    event.preventDefault();
    var cardDescr = $(event.currentTarget.form).serializeJSON().card;

    this.model.save(cardDescr, {
      patch: true,
      success: function() {
        console.log("successfully saved description");
        $('.add-descr').removeClass("hidden");
        $('.card-modal-'+that.model.id).modal('show');
        $('.card-descr-form').addClass("hidden");
      },
      error: function() {
        console.log("failed to save description");
      }
    })
  }
});