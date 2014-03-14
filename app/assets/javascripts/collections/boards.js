Trellino.Collections.Boards = Backbone.Collection.extend({
  url: '/boards',
  model: Trellino.Models.Board
});

Trellino.Collections.boards = new Trellino.Collections.Boards();