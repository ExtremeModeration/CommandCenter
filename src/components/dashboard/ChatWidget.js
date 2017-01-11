import React from 'react'
import Chat from 'components/chat'
import Widget from './Widget'

const style = {
  widget: {
    height: 415
  }
}

const ChatWidget = (props) => (
  <Widget title="Chat" style={style.widget}>
    <Chat />
  </Widget>
)

export default ChatWidget
