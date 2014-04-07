Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: "/cards",
  parse: function(jsonResponse) {
    // console.log("parsing card");
    return jsonResponse;
  }
});
