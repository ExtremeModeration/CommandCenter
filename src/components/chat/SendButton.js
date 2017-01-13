import React from 'react'
import { RaisedButton } from 'material-ui'

const SendButton = (props) => (
  <RaisedButton
    primary
    label="Send"
    onTouchTap={props.onSend}
    fullWidth
    disabled={props.disabled}/>
)

export default SendButton
