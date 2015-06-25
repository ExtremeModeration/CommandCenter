var irc = currentWindow.irc;

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CommandCenterConstants = require('../constants/CommandCenterConstants');

var ChatActions = {
  sendMessage: function(message) {
    irc.client.say(irc.opts.channels[0], message.trim());
    ChatActions.createMessage(irc.opts.userName, message.trim(), null);
  },

  createMessage: function(nick, text, message) {
    AppDispatcher.dispatch({
      actionType: CommandCenterConstants.RECEIVE_MESSAGE,
      nick: nick,
      text: text,
      message: message
    });
  },

  createAction: function(from, to, text, message) {
    AppDispatcher.dispatch({
      actionType: CommandCenterConstants.RECEIVE_ACTION,
      nick: from,
      text: text,
      message: message
    });
  }
};

module.exports = ChatActions;
