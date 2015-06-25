var _ = require('lodash');

var React = require('react');

var Viewer = require('./Viewer.react');

var ReactBootstrap = require('react-bootstrap');
var ListGroup = ReactBootstrap.ListGroup;

var ViewerPanel = React.createClass({
  render: function() {
    var viewers = _.sortByAll(this.props.viewers, ['nick']).map(function(viewer){
      return (<Viewer data={viewer} />);
    });

    return (
      <ListGroup>
        {viewers}
      </ListGroup>
    );
  }
});

module.exports = ViewerPanel;
