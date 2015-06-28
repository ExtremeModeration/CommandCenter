/**
 * Created by Steve on 6/27/2015.
 */
var CommandActions = require('../actions/CommandActions');

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var Modal = ReactBootstrap.Modal;

var NewCommandModal = React.createClass({
  saveHandler: function () {
    this.props.onRequestHide();

    var name = this.refs.commandName.getValue(),
      type = this.refs.commandType.getValue(),
      action = this.refs.commandAction.getValue();

    CommandActions.addCommand(name, type, action);
  },
  render: function () {
    return (
      <Modal {...this.props} title="New Command">
        <div className="modal-body">
          <div className="form">
            <Input type="text" label="Name" ref="commandName"/>
            <Input type="select" label="Type" ref="commandType">
              <option value="chatMacro">Chat Macro</option>
            </Input>
            <Input type="textarea" label="Action" ref="commandAction"/>
          </div>
        </div>

        <div className="modal-footer">
          <Button onClick={this.saveHandler}>Save</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = NewCommandModal;
