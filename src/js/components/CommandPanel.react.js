var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var CommandItem = require('./CommandItem.react');
var NewCommandModal = require('./NewCommandModal.react');

var Button = ReactBootstrap.Button;
var Col = ReactBootstrap.Col;
var ListGroup = ReactBootstrap.ListGroup;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var Row = ReactBootstrap.Row;

var CommandPanel = React.createClass({
  render: function() {
    var commands = this.props.commands.map(function(command){
      return (<CommandItem command={command} />);
    });

    return (
      <div className="commandPanel">
        <Row>
          <Col xs={12}>
            <div className="pull-right">
              <ModalTrigger modal={<NewCommandModal />}>
                <Button bsStyle="success" bsSize="xsmall">+</Button>
              </ModalTrigger>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ListGroup>{commands}</ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = CommandPanel;
