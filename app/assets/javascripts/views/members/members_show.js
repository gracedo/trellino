Trellino.Views.MembersShow = Backbone.View.extend({
  template: JST["members/show"],
  
  initialize: function(options) {
    this.model = options.model;
  },
  
  render: function() {
    var renderedContent = this.template({
      member: this.model
    });
    
    $('button.new-member').removeClass('hidden');
    $('.new-member-form').addClass('hidden');
    this.$el.html(renderedContent);
    return this;
  }
})