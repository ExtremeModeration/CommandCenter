import React from 'react'
import { Subheader } from 'material-ui'
import Widget from './Widget'
import WidgetText from './WidgetText'

const status = (online) => (
  `${online ? 'On' : 'Off'}line`
)

const Title = (props) => (
  props.online ? <p><strong>Title:</strong> {props.title}</p> : null
)

const Playing = (props) => (
  props.online ? <p><strong>Playing:</strong> {props.playing}</p> : null
)

const Info = (props) => (
  <Widget title="Stream Info" subtitle={status(props.online)}>
    <WidgetText>
      <Title {...props} />
      <Playing {...props} />
    </WidgetText>
  </Widget>
)

export default Info
