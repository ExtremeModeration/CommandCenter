var ChatStore = require('../stores/ChatStore');
var ChatActions = require('../actions/ChatActions');

var React = require('react');

var ChatMessage = require('./ChatMessage.react');
var ActionMessage = require('./ActionMessage.react');

var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var ChatPanel = React.createClass({
  getInitialState: function() {
    return {
      messages: ChatStore.getAll(),
      inputValue: ""
    }
  },

  componentDidMount: function() {
    ChatStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ChatStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({messages: ChatStore.getAll()});
  },

  handleChange: function(e) {
    this.setState({inputValue: e.target.value});
  },

  sendChatMessage: function(e) {
    if (e.keyCode === 13) {
      var messageInput = this.refs.chatInput;
      this.setState({inputValue: ""});
      ChatActions.sendMessage(messageInput.getValue());
    }
  },

  render: function() {
    var i = 0;
    var messages = this.state.messages.map(function(message){
      var m;

      switch (message.type) {
        case 'message':
          m = (<ChatMessage message={message} i={i} />);
          break;
        case 'action':
          m = (<ActionMessage message={message} />);
          break;
      }

      i++;
      return m;
    });

    return (
      <div className="chatPanel">
        <div className="messages">
          <ul>{messages}</ul>
        </div>
        <div className="messageInput">
          <Input type="text" ref="chatInput" placeholder="Type to chat..."
            onChange={this.handleChange}
            onKeyUp={this.sendChatMessage} value={this.state.inputValue} />
        </div>
      </div>
    )
  }
});

module.exports = ChatPanel;
