var irc = currentWindow.irc;

var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var ListGroupItem = ReactBootstrap.ListGroupItem;

var Viewer = React.createClass({
  viewerClicked: function() {
    alert(this.props.data.nick);
  },
  render: function() {
    var bsClass = this.props.data.nick === irc.opts.userName ? 'info' : 'primary';
    return (
      <ListGroupItem bsStyle={bsClass} href="#" onClick={this.viewerClicked}>
        {this.props.data.nick}
      </ListGroupItem>
    );
  }
});

module.exports = Viewer;
