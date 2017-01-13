import React from 'react'
import { TextField } from 'material-ui'

const MessageInput = (props) => (
  <TextField
    hintText="Message..."
    value={props.value}
    onChange={props.onChange}
    onKeyUp={(e) => {
      if (e.keyCode === 13) {
        props.onEnter()
      }
    }}
  />
)

export default MessageInput
