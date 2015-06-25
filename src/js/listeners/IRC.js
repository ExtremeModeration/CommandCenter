var ChatActions = require('../actions/ChatActions');
var ViewerActions = require('../actions/ViewerActions');
var _ = require('lodash');
var irc = currentWindow.irc;

var IRCListeners = {
  start: function() {
    irc.client.addListener('message' + irc.opts.channels[0], function(nick, text, message){
      ChatActions.createMessage(nick, text, message);
    });

    irc.client.addListener('action', function(from, to, text, message){
      ChatActions.createAction(from, to, text, message);
    });

    irc.client.addListener('names' + irc.opts.channels[0], function(nicks){
      _.keys(nicks).map(function(nick){
        ViewerActions.addViewer(nick);
      });
    });

    irc.client.addListener('join' + irc.opts.channels[0], function(nick, message){
      ViewerActions.addViewer(nick);
    });

    irc.client.addListener('part' + irc.opts.channels[0], function(nick, message){
      ViewerActions.removeViewer(nick);
    });
  }
}

module.exports = IRCListeners;
