/**
 * Created by Steve on 6/27/2015.
 */

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommandCenterConstants = require('../constants/CommandCenterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _commands = [
  {name: "Say hello", action_type: "chatMacro", action: "hello everyone"}
];

function create(name, type, action) {
  // be optimistic, create a copy and put in the store now
  var command = {
    name: name.trim(),
    action_type: type.trim(),
    action: action.trim()
  };

  _commands.push(command);
  // TODO: save the command to the server
}

function remove(name) {
  _.filter(_commands, function (command) {
    return command.name !== name;
  });

  // TODO: tell the server to delete the command record
}

function update(old_name, new_name, type, action) {
  remove(old_name);
  create(new_name, type, action);
}

var CommandStore = assign({}, EventEmitter.prototype, {
  getAll: function () {
    return _commands;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  var name = action.name;

  switch (action.actionType) {
    case CommandCenterConstants.CREATE_COMMAND:
      var type = action.type.trim(),
        _action = action.action.trim();
      create(name.trim(), type, _action);
      break;
    case CommandCenterConstants.UPDATE_COMMAND:
      var old_name = action.old_name.trim(),
        type = action.type.trim(),
        _action = action.action.trim()
      update(old_name, name.trim(), type, _action);
      break;
    case CommandCenterConstants.REMOVE_COMMAND:
      remove(name.trim());
      break;
  }

  CommandStore.emitChange();
});

module.exports = CommandStore;
