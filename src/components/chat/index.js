import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  List,
  ListItem,
  Paper,
  Subheader
} from 'material-ui'

class Chat extends Component {
  render() {
    return (
      <Paper>
        <Subheader>Chat</Subheader>
        <List>
          <ListItem primaryText="ExtremeModeration"
            secondaryText="This is an amazing chat message!" />
        </List>
      </Paper>
    )
  }
}

export default connect(
  ({chat}) => ({
    messages: chat.messages
  })
)(Chat)
