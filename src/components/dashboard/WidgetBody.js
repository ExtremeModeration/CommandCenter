import React from 'react'

const defaultStyle = {
  height: 175,
  overflow: 'auto'
}

const WidgetBody = (props) => {
  const style = Object.assign({}, defaultStyle, props.style)
  return (
    <div style={style}>{props.children}</div>
  )
}

export default WidgetBody
