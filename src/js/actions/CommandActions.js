var AppDispatcher = require('../dispatchers/AppDispatcher');
var CommandCenterConstants = require('../constants/CommandCenterConstants');

var CommandActions = {
    addCommand: function(name, type, action) {
        AppDispatcher.dispatch({
            actionType: CommandCenterConstants.CREATE_COMMAND,
            name: name,
            type: type,
            action: action
        });
    },

    updateCommand: function(old_name, name, type, action) {
        AppDispatcher.dispatch({
            actionType: CommandCenterConstants.UPDATE_COMMAND,
            old_name: old_name,
            name: name,
            type: type,
            action: action
        });
    },

    removeCommand: function(name) {
        AppDispatcher.dispatch({
            actionType: CommandCenterConstants.REMOVE_COMMAND,
            name: name
        });
    }
};

module.exports = CommandActions;
