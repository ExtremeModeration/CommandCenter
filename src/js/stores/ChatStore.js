var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommandCenterConstants = require('../constants/CommandCenterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _messages = [];

function create(nick, text, type, message) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var _message = {
    id: id,
    nick: nick,
    text: text,
    type: type,
    message: message
  };
  console.log("_message:", _message);
  _messages.push(_message);
}

var ChatStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _messages;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action){
  var nick, text, type, message;

  switch(action.actionType) {
    case CommandCenterConstants.SEND_MESSAGE:
    case CommandCenterConstants.RECEIVE_MESSAGE:
      type = 'message';
      break;
    case CommandCenterConstants.RECEIVE_ACTION:
      type = 'action';
      break;
  }

  if (type) {
    nick = action.nick.trim();
    text = action.text.trim();
    message = action.message;

    create(nick, text, type, message);
    ChatStore.emitChange();
  }
});

module.exports = ChatStore;
