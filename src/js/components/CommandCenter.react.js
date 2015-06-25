var ChatStore = require('../stores/ChatStore');
var ViewerStore = require('../stores/ViewerStore');

var React = require('react');

var ChatPanel = require('./ChatPanel.react');
var MusicPanel = require('./MusicPanel.react');
var TitleBar = require('./TitleBar.react');
var ViewerPanel = require('./ViewerPanel.react');

var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabPane;

var CommandCenter = React.createClass({
  getInitialState: function() {
    return {
      viewers: ViewerStore.getAll()
    };
  },

  componentDidMount: function() {
    ViewerStore.addChangeListener(this.onViewersChanged);
  },

  componentWillUnmount: function() {
    ViewerStore.removeChangeListener(this.onViewersChanged);
  },

  onViewersChanged: function() {
    this.setState({viewers: ViewerStore.getAll()});
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

module.exports = CommandCenter;
