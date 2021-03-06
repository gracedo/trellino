Trellino.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function(options) {
    this.lists = this.model.lists();
    this.members = this.model.members();
    
    this.listenTo(this.model, "add remove change:title", this.render);
    // this.listenTo(this.lists, "add", this.addList);
    this.listenTo(this.members, "add", this.addMember);

    this.lists.each(
      this.addList.bind(this)
    )
    
    this.members.each(
      this.addMember.bind(this)
    )
  },
  
  events: {
    "click a.add-list-link": "addListForm",
    "click button.new-member": "addMemberForm",
    "click .remove-board": "removeBoard",
    "click button.edit-board-title": "editBoardTitle"
  },
  
  render: function() {
    var that = this;
    var renderedContent = this.template({
      board: this.model,
      lists: this.lists
    });
    
    this.$el.html(renderedContent);
    
    $(this.$el.find("div.lists-container")).sortable({
      cursor: "-webkit-grabbing", 
      cursor: "-moz-grabbing",
      opacity: 1,
      connectWith: "div.lists-container",
      dropOnEmpty: true,
      placeholder: "ui-state-list-highlight",
      forcePlaceholderSize: true,
      cancel: ".new-list-container",
      start: function(event, ui) {
        $(event.target).data("ui-sortable").floating = true;
        $(ui.item).toggleClass('dragged');
        $('.new-list-container').addClass('hidden');
      },
      stop: function(event, ui) {
        $(event.target).data("ui-sortable").floating = true;
        $(ui.item).toggleClass('dragged');
        var $list = $(ui.item.children());
        var nextOrder = ui.item.next().children().data("rank");
        var prevOrder = ui.item.prev().children().data("rank");
    
        var updatedOrder = that._calculatePosition(parseFloat(prevOrder), parseFloat(nextOrder));
        var listId = $list.data("id");
        var listModel = that.lists.get(listId);
        $('.new-list-container').removeClass('hidden');
        that.$el.find('.lists-container').append(that.$el.find('.new-list-container'));

        listModel.save({ rank: updatedOrder },
          { patch: true,
            success: function(model) {
              $list.data("rank", updatedOrder);
            }
          }
        );
      }
    });

    this.renderSubviews();
    this.$el.find('.lists-container').append(this.$el.find('.new-list-container'));
    return this;
  },

  _calculatePosition: function(prevPos, nextPos){
    if(!nextPos){
      if(!prevPos){
        return 1;
      } else {
        return (prevPos + 1);
      }
    } else if(!prevPos){
      return (nextPos / 2);
    }
    return (nextPos + prevPos) / 2;
  },
  
  addListForm: function(event) {
    event.preventDefault();
    $(event.target).addClass("hidden");
    
    var listFormView = new Trellino.Views.ListForm({
      board: this.model,
      lists: this.lists,
      boardShowView: this
    });
    
    $('.new-list-form').html(listFormView.render().$el);
    this.$el.find('#title').focus();
  },
  
  addMemberForm: function(event) {
    $(event.target).addClass("hidden");
    
    var memberFormView = new Trellino.Views.MemberForm({
      board: this.model,
      members: this.members
    });

    $('.new-member-form').html(memberFormView.render().$el);
  },
  
  addList: function(list) {
    var listsShowView = new Trellino.Views.ListsShow({
      model: list
    });

    this.addSubview(".lists-container", listsShowView);
    listsShowView.render();
    this.$el.find('.lists-container').append(this.$el.find('.new-list-container'));
  },
  
  addMember: function(member) {
    var membersShowView = new Trellino.Views.MembersShow({
      model: member
    });
    
    this.addSubview(".board-members", membersShowView);
    membersShowView.render();
  },
  
  removeBoard: function() {
    this.remove(); // remove board subviews
    this.model.destroy({
      success: function(model) {
        console.log("deleted board " + model.id + ", titled " + model.get("title"));
        $(".delete-board-modal").modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        Backbone.history.navigate('', { trigger: true });
      },
      error: function(model) {
        console.log("error deleting board " + model.id + ", titled " + model.get("title"))
      }
    });
  },
  
  editBoardTitle: function(event) {
    event.preventDefault();
    var $formData = $(event.currentTarget.form).serializeJSON().board;

    this.model.save($formData, {
      patch: true,
      success: function() {
        console.log("board successfully updated");
        $(".edit-board-form").modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
      },
      error: function() {
        console.log("board was not updated");
        console.log(arguments[1].responseText);
      }
    })
  }
})