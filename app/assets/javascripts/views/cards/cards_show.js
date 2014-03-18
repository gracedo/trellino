Trellino.Views.CardsShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function(options) {
    this.listenTo(this.model, "remove add", this.render);
    this.list = options.list
  },
  
  events: {
    "click button.remove-card": "removeCard"
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    })

    $('a.add-card-form').removeClass('hidden');
    $('.new-card-form').empty();
    this.$el.html(renderedContent);
    return this;
  },
  
  removeCard: function(event) {
    event.preventDefault();
    var that = this;
    
    this.model.destroy({
      success: function(card) {
        console.log('deleted card');
        var currListShowView = new Trellino.Views.ListsShow({
          model: that.list
        })
        
        currListShowView.removeSubview(".cards", that)
      }
    })
  }
});
