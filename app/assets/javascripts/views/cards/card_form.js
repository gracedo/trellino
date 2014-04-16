Trellino.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],
  
  initialize: function(options) {
    this.list = options.list;
    this.cards = options.cards;
    this.listView = options.listView;
  },
  
  events: {
    "click button.new-card": "create",
    "click button.cancel-new-card": "removeForm",
    // "click button:not(.new-card) div:not(.card-form)": "removeForm" //get blur to ignore button clicks
  },

  render: function() {
    var renderedContent = this.template({
      listID: this.list.id,
      rank: this.cards.length+1
    })
    
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    var that = this;
    event.preventDefault();
    event.stopPropagation();
    var formData = $(event.target.form).serializeJSON().card;
    var newCard = new Trellino.Models.Card(formData);

    this.cards.create(newCard, {
      success: function() {
        console.log("card successfully created");
        that.listView.addCard(newCard);
      },
      error: function() {
        console.log("error creating card");
        that.$('#title').effect("highlight", {}, 700);
      }
    })
  },
  
  removeForm: function(event) {
    event.preventDefault();
    $('.new-card-form#'+this.list.id).empty();
    $(".add-card-link-container[data-list-id='"+this.list.id+"']").removeClass('hidden');
  }
});
