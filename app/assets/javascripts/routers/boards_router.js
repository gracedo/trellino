Trellino.Routers.Boards = Backbone.Router.extend({
  routes: {
    "": "index",
    "boards/new": "new",
    "boards/:id": "show"
  },
  
  index: function() {
    var boardsIndexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    })
    
    Trellino.Collections.boards.fetch();
    this._swapView(boardsIndexView);
  },
  
  new: function() {
    var boardFormView = new Trellino.Views.BoardForm({
      model: new Trellino.Models.Board(),
      collection: Trellino.Collections.boards
    })
    
    this._swapView(boardFormView);
  },
  
  show: function(id) {
    var boardsShowView = new Trellino.Views.BoardsShow({
      model: Trellino.Collections.boards.get(id)
    })

    Trellino.Collections.boards.fetch();
    this._swapView(boardsShowView);
  },
  
  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    
    this.currentView = view;
    $('.container').append(view.render().$el)
  }
});