Trellino.Routers.Boards = Backbone.Router.extend({
  routes: {
    "": "index"
  },
  
  index: function() {
    var boardsIndexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    })
    
    Trellino.Collections.boards.fetch();
    this._swapView(boardsIndexView);
  },
  
  _swapview: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    
    this.currentView = view;
    $('.boards').append(view.render().$el)
  }
});
