Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.lists = this.model.lists();
    this.members = this.model.members();
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.lists, "add", this.addList);

    this.lists.each(
      this.addList.bind(this)
    )
    
    // var listNewView = new Trellino.Views.ListNew({
    //   model: this.model,
    //   collection: this.lists
    // });
    // 
    // this.addSubview(".new-list-form", listNewView);
  },
  
  events: {
    "click button.new-list": "addListForm"
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model,
      lists: this.lists
    })

    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },
  
  addListForm: function(event) {
    $(event.target).addClass("hidden");
    
    var listNewView = new Trellino.Views.ListNew({
      board: this.model,
      lists: this.lists
    });
    
    // this.addSubview(".new-list-form", listNewView);
    $('.new-list-form').html(listNewView.render().$el)
  },
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.ListsShow({
      model: list
    });
    
    this.addSubview(".lists", listsShowView);
    listsShowView.render();
  }
})