var _ = require('lodash');

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommandCenterConstants = require('../constants/CommandCenterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _viewers = [];

function create(nick) {
  var matches = _.find(_viewers, function(v){
    return v.nick === nick;
  });

  if (!matches || matches.length === 0) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var viewer = {
      id: id,
      nick: nick
    };
    _viewers.push(viewer);
  }
}

function remove(nick) {
  _.filter(_viewers, function(viewer){
    return viewer.nick !== nick;
  });
}

var ViewerStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _viewers;
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
  var nick = action.nick.trim();

  switch(action.actionType) {
    case CommandCenterConstants.VIEWER_JOINED:
      create(nick);
      break;
    case CommandCenterConstants.VIEWER_PARTED:
      remove(nick);
      break;
  }

  ViewerStore.emitChange();
});

module.exports = ViewerStore;
