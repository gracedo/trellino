Trellino.Models.List = Backbone.Model.extend({
  parse: function(jsonResponse) {
    // console.log("parsing list")
    if (jsonResponse.cards){
      this.cards().set(jsonResponse.cards);
      delete jsonResponse.cards;
    }
  
    return jsonResponse;
  },
  
  cards: function() {
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards([], {
        board: this
      });
    }

    return this._cards;
  },
  
  validate: function(attributes) {
    if(!attributes || !attributes.title || attributes.title === "") {
      return "cannot have an empty title";
    }
  }
});
