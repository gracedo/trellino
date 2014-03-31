Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  url: function() {
    // return this.board.url() + '/lists';
    return 'boards/' +  this.boardID + "/lists";
  },
  
  // initialize: function(models, options) {
  //   this.board = options.board;
  // },
  
  comparator: function(list) {
    return list.get("rank");
  }
});
