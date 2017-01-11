import React from 'react'
import { Card, CardHeader } from 'material-ui'

const defaultStyle = {
  height: 250,
  marginBottom: 15,
  overflow: 'hidden'
}

const Widget = (props) => {
  const style = Object.assign({}, defaultStyle, props.style)
  return (
    <Card style={style}>
      <CardHeader
        title={props.title}
        subtitle={props.subtitle}
        showExpandableButton={false} />
        {props.children}
    </Card>
  )
}

export default Widget
