import React, { Component } from 'react'
import { Col, Row } from 'react-flexbox-grid'
import MessageInput from './MessageInput'
import SendButton from './SendButton'

export default class ChatInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  handleChange = (e, message) => {
    this.setState({message})
  }

  handleSend = () => {
    console.log('handleSend', this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
      <Row>
        <Col xs={9}>
          <MessageInput
            value={this.state.message}
            onChange={this.handleChange}
            onEnter={this.handleSend}/>
        </Col>

        <Col xs={2}>
          <SendButton
            onSend={this.handleSend}
            disabled={!this.state.message.length} />
        </Col>
      </Row>
    )
  }
}
