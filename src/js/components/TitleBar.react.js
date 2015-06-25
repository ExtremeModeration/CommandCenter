var React = require('react');

var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var TitleBar = React.createClass({
  closeHandler: function() {
    currentWindow.quit_app();
  },
  render: function() {
    return (
      <div className="titleBar">
        <Navbar brand="Command Center">
          <Nav right>
            <NavItem className="noDrag" onClick={this.closeHandler}>&times;</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = TitleBar;
