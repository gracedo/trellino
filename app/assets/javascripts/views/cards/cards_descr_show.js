Trellino.Views.DescrCardsShow = Backbone.View.extend({
  template: JST['cards/descr_show'],
  
  initialize: function(options) {
    this.listenTo(this.model, "change:description", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      card: this.model
    })
    
    this.$el.html(renderedContent);
    return this;
  }
});