Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',
  
  parse: function(jsonResponse){
    // console.log("parsing board")
    if (jsonResponse.lists){
      this.lists().set(jsonResponse.lists, { parse: true });
      delete jsonResponse.lists;
    }
    
    if (jsonResponse.members){
      this.members().set(jsonResponse.members);
      delete jsonResponse.members;
    }
    
    if (jsonResponse.cards){
      this.cards().set(jsonResponse.cards);
      delete jsonResponse.cards;
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
      this._members = new Trellino.Collections.Users([], {
        board: this
      });
    }
    
    return this._members;
  },
  
  cards: function() {
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards([], {
        board: this
      });
    }
    
    return this._cards;
  }
});
