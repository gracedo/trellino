Trellino.Views.ListNew = Backbone.View.extend({
  template: JST["lists/new"],
  
  initialize: function(options) {
    this.board = options.board;
    this.lists = options.lists;
  },
  
  events: {
    "click button.new-list": "create"
  },
  
  render: function() {
    var renderedContent = this.template({
      boardID: this.board.id,
      rank: this.lists.length+1
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function(event) {
    var view = this;
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().list;
    
    var newList = new Trellino.Models.List($formData);

    this.lists.create(newList, {
      success: function() {
        // console.log(list)
        console.log("successfully added list");
        // Backbone.history.navigate('', { trigger: true })
      },
      
      error: function() {
        console.log("error")
      }
    })
    
    // newList.save({}, {
    //   success: function () {
    //     alert("success")
    //     view.lists.add(newList);
    //     // view.$('textarea[name=comment\\[content\\]]').val("");
    //     // view.renderPreview();
    //   }
    // });
  }
})