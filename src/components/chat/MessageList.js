import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui'

class MessageList extends Component {
  render() {
    const { messages } = this.props

    const items = messages.map((message, key) => (
      <ListItem
        key={key}
        primaryText={message.body}
        secondaryText={message.author} />
    ))

    return (
      <List>
        {items}
      </List>
    )
  }
}

export default connect(
  ({chat}) => ({
    messages: chat.messages
  })
)(MessageList)
