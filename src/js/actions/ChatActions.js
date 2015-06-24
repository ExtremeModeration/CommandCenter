var AppDispatcher = require('../dispatchers/AppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ChatActions = {
  createMessage: function(nick, text, message) {
    console.log("Message args: ", arguments);
    AppDispatcher.dispatch({
      actionType: ChatConstants.RECEIVE_MESSAGE,
      nick: nick,
      text: text,
      message: message
    });
  },

  createAction: function(from, to, text, message) {
    console.log("Action args: ", arguments);
    AppDispatcher.dispatch({
      actionType: ChatConstants.RECEIVE_ACTION,
      nick: from,
      text: text,
      message: message
    });
  }
};

module.exports = ChatActions;
