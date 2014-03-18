Trellino.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],
  
  initialize: function(options) {
    this.list = options.list
    this.cards = options.cards
  },

  render: function() {
    var renderedContent = this.template({
      listID: this.list.id,
      rank: this.cards.length+1
    })
    
    this.$el.html(renderedContent);
    return this;
  }
});
