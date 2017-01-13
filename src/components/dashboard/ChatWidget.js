import React from 'react'
import { CardActions } from 'material-ui'
import {
  ChatInput,
  MessageList
} from 'components/chat'
import Widget from './Widget'

const style = {
  widget: {
    height: 515
  },
  listWrapper: {
    height: 400,
    overflow: 'auto'
  }
}

const ChatWidget = (props) => (
  <Widget title="Chat" style={style.widget}>

    <div style={style.listWrapper}>
      <MessageList />
    </div>

    <CardActions>
      <ChatInput />
    </CardActions>
  </Widget>
)

export default ChatWidget
