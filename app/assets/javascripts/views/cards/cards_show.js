Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function() {
    this.listenTo(this.model, "remove add", this.render);
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    })

    $('a.add-card-form').removeClass('hidden');
    $('.new-card-form').empty();
    this.$el.html(renderedContent);
    return this;
  }
});
