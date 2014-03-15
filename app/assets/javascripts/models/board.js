Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',
  
  parse: function(jsonResponse){
    if (jsonResponse.lists){
      this.lists().set(jsonResponse.lists);
      delete jsonResponse.lists;
    }
    
    if (jsonResponse.members){
      this.members().set(jsonResponse.members);
      delete jsonResponse.members;
    }
    
    return jsonResponse;
  },
  
  lists: function(){
    if(!this._lists){
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }
    
    return this._lists;
  },
  
  members: function() {
    if(!this._members){
      this._members = new Trellino.Collections.Members([], {
        board: this
      });
    }
    
    return this._members;
  }
});
