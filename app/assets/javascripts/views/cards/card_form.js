Trellino.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],
  
  initialize: function(options) {
    this.list = options.list
    this.cards = options.cards
  },
  
  events: {
    "click button.new-card": "create",
    "click button.cancel-new-card": "removeForm",
    "blur .card-form": "removeForm"
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
    event.preventDefault();
    var formData = $(event.target.form).serializeJSON().card;
    var newCard = new Trellino.Models.Card(formData);

    this.cards.create(newCard, {
      sucess: function() {
        console.log("card successfully created")
      },
      error: function() {
        console.log("erorr creating card")
      }
    })
  },
  
  removeForm: function(event) {
    event.preventDefault();
    $(event.target.form).empty();
    $('a.add-card-link').removeClass('hidden');
    // $('.add-card-link#'+this.list.id).removeClass('hidden');
  }
});
