import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'react-flexbox-grid'
import {
  FlatButton,
  RaisedButton,
  List,
  ListItem,
  TextField
} from 'material-ui'

const SendButton = (props) => (
  <RaisedButton
    primary
    label="Send"
    onTouchTap={props.onTouchTap}
    fullWidth
    disabled={!props.message.length}/>
)

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  componentDidMount() {

  }

  handleChange = (e, message) => {
    console.log(message)
    this.setState({message})
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <List>
              <ListItem primaryText="ExtremeModeration"
                secondaryText="This is an amazing chat message!" />
            </List>
          </Col>
        </Row>

        <Row>
          <Col xs={9}>
            <TextField
              hintText="Message..."
              value={this.state.message}
              onChange={this.handleChange}/>
          </Col>
          <Col xs={2}>
            <SendButton message={this.state.message} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  ({chat}) => ({
    messages: chat.messages
  })
)(Chat)
