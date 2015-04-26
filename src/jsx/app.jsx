var Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col,
    irc = require('./IrcService');

var Application = React.createClass({
    render: function() {
        return (
            <div className="application container">
                <div className="page-header">
                    <h1>ExtremeModeration CC</h1>
                </div>

                <Row>
                    <Col md="9">
                        <TwitchChat />
                    </Col>
                </Row>

            </div>
        )
    }
});

var TwitchChat = React.createClass({
    render: function(){
        return (
            <div className="twitchChat">
                <iframe
                    src='http://www.twitch.tv/chat/embed?channel=extrememoderation&popout_chat=true'
                    frameborder='0' scrolling='no' height='450' width='100%'/>
            </div>
        )
    }
});

React.render(<Application />, document.getElementById('app'));