var AppDispatcher = require('../dispatchers/AppDispatcher');
var CommandCenterConstants = require('../constants/CommandCenterConstants');

var ViewerActions = {
  addViewer: function(nick) {
    AppDispatcher.dispatch({
      actionType: CommandCenterConstants.VIEWER_JOINED,
      nick: nick
    });
  },

  removeViewer: function(nick) {
    AppDispatcher.dispatch({
      actionType: CommandCenterConstants.VIEWER_PARTED,
      nick: nick
    });
  }
};

module.exports = ViewerActions;
