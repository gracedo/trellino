Trellino.Collections.Users = Backbone.Collection.extend({
  model: Trellino.Models.User,
  url: '/users'
});

// Trellino.Collections.users = new Trellino.Collections.Users();