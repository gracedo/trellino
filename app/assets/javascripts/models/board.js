Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',
  
  // parse: function(jsonResponse){
  //   if (jsonResponse.entries){
  //     this.lists().set(jsonResponse.lists);
  //     delete jsonResponse.lists;
  //   }
  //   return jsonResponse;
  // },
  // 
  // lists: function(){
  //   if (!this._entries){
  //     this._entries = new NewReader.Collections.Entries([], {
  //       feed: this
  //     });
  //   }
  //   
  //   return this._entries;
  // }
});
