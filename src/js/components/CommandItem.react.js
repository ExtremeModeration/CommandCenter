/**
 * Created by Steve on 6/27/2015.
 */

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Button = ReactBootstrap.Button;
var Col = ReactBootstrap.Col;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Row = ReactBootstrap.Row;

var CommandItem = React.createClass({
  render: function() {
    return (
      <ListGroupItem>
        <Row>
          <Col xs={10}>{this.props.command.name}</Col>
          <Col xs={1}>
            <Button bsStyle="success" bsSize="xsmall">&gt;</Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = CommandItem;