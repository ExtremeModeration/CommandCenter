import React from 'react'
import { List, ListItem, Subheader } from 'material-ui'
import Widget from './Widget'

const Viewers = (props) => {
  const { viewers } = props
  return (
    <Widget title={`${viewers} viewers`}>
      <p>Viewer list should go here...</p>
    </Widget>
  )
}

export default Viewers
