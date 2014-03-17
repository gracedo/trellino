Trellino.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(options) {
    this.boardID = this.model.get("board_id");
    this.board = Trellino.Collections.boards.get(this.boardID);
    
    this.model = options.model;
    this.listenTo(this.model, "all", this.render);
    // this.listenTo(this.model, "remove", this.removeList);
  },
  
  events: {
    "click button.remove-list": "removeList"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    $('button.new-list').removeClass('hidden');
    // $('.new-list-form').addClass("hidden");
    $('.new-list-form').empty();
    this.$el.html(renderedContent);
    return this;
  },
  
  removeList: function(event) {
    event.preventDefault();
    var that = this;
    
    this.model.destroy({
      success: function (list) {
        var currBoardShowView = new Trellino.Views.BoardsShow({
          model: that.board
        })
        
        currBoardShowView.removeSubview(".lists", that); // remove list showview from board subviews
        console.log("deleted list " + list.id + ", titled " + list.get("title"));
      }
    });
  }
})