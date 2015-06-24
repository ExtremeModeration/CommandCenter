var irc = currentWindow.irc;

var _ = require('lodash');
var moment = require('moment');
var React = window.React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Input = ReactBootstrap.Input;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Row = ReactBootstrap.Row;
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;

var ChatStore = window.ChatStore = require('./stores/ChatStore');
var ChatActions = require('./actions/ChatActions');

irc.client.addListener('message' + irc.opts.channels[0], function(nick, text, message){
  ChatActions.createMessage(nick, text, message);
});

irc.client.addListener('action', function(from, to, text, message){
  ChatActions.createAction(from, to, text, message);
});

var Application = React.createClass({
  getInitialState: function() {
    return {
      viewers: []
    };
  },

  componentDidMount: function() {
    var _this = this;

    irc.client.addListener('names' + irc.opts.channels[0], function(nicks){
      var viewers = _.keys(nicks).map(function(nick){
        return {nick: nick};
      });
      _this.setState({viewers: viewers});
    });

    irc.client.addListener('join' + irc.opts.channels[0], function(nick, message){
      var viewers = _this.state.viewers;
      viewers.push({nick: nick});
      _this.setState({viewers: viewers});
    });

    irc.client.addListener('part' + irc.opts.channels[0], function(nick, message){
      var viewers = _this.state.viewers;
      _.remove(viewers, function(n){
        return n.nick === nick;
      });
      _this.setState({viewers: viewers});
    });
  },

  render: function() {
    return (
      <div className="application">
        <TitleBar />
        <Grid id="grid-container">
          <Row id="outer-row">
            <Col xs={8} id="chat-column">
              <ChatPanel />
            </Col>
            <Col xs={4}>
              <TabbedArea defaultActiveKey={0}>
                <TabPane eventKey={0} tab={"Viewers (" + this.state.viewers.length + ")"}>
                  <ViewerPanel viewers={this.state.viewers} />
                </TabPane>

                <TabPane eventKey={1} tab="Commands">
                  <h2>Commands</h2>
                </TabPane>

                <TabPane eventKey={2} tab="Music">
                  <MusicPanel />
                </TabPane>
              </TabbedArea>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

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
      var messages = this.state.messages;
      var nick = irc.opts.userName
      var message = {nick: nick, type: 'message', text: messageInput.getValue()};
      // messages.push(message);
      // this.setState({messages: messages});
      ChatActions.createMessage(nick, message.text, null)
      irc.client.say(irc.opts.channels[0], message.text);
      this.setState({inputValue: ""});
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

var ChatMessage = React.createClass({
  render: function() {
    var _classes = ["message chatMessage"];
    if (this.props.i % 2 === 1) {
      _classes.push('alternate');
    }
    return (
      <li className={_classes.join(' ')}>
        <small className="timestamp">{moment().format('HH:mm')}</small>
        <span className="nick">{this.props.message.nick}:</span>
        {this.props.message.text}
      </li>
    );
  }
});

var MusicPanel = React.createClass({
  render: function() {
    return (
      <div className="musicPanel"></div>
    );
  }
});

React.render(<Application />, document.getElementById('application_wrapper'));
