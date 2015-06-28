var moment = require('moment');

var React = require('react');

var ChatMessage = React.createClass({
  render: function() {
    var _classes = ["message chatMessage"];
    if (this.props.i % 2 === 1) {
      _classes.push('alternate');
    }
    return (
      <li className={_classes.join(' ')}>
        <small className="timestamp">{this.props.message._at.format('HH:mm')}</small>
        <span className="nick">{this.props.message.nick}:</span>
        {this.props.message.text}
      </li>
    );
  }
});

module.exports = ChatMessage;
