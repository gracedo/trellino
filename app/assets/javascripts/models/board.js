Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',
  
  parse: function(jsonResponse){
    if (jsonResponse.lists){
      this.lists().set(jsonResponse.lists);
      delete jsonResponse.lists;
    }
    debugger
    return jsonResponse;
  },
  
  lists: function(){
    if (!this._lists){
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }
    
    return this._lists;
  }
});
