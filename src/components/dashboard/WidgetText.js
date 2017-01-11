import React from 'react'
import { CardText } from 'material-ui'

const defaultStyle = {
  height: 165,
  overflow: 'auto'
}

const WidgetText = (props) => {
  const style = Object.assign({}, defaultStyle, props.style)
  return (
    <CardText style={style}>{props.children}</CardText>
  )
}

export default WidgetText
