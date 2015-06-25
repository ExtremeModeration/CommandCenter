var moment = require('moment');

var React = require('react');

var ActionMessage = React.createClass({
  render: function() {
    return (
      <li className="message actionMessage label label-info">
        <small className="timestamp">{moment().format('HH:mm')}</small>
        <span>{this.props.message.nick} {this.props.message.text}</span>
      </li>
    );
  }
});

module.exports = ActionMessage;
