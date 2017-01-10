import React from 'react'
import { List, ListItem, Subheader } from 'material-ui'
import Widget from './Widget'

const Viewers = (props) => {
  const { viewers } = props
  return (
    <Widget title={`${viewers.length} viewers`}>
      <List>
        {viewers.map((viewer, key) => (
          <ListItem key={key} primaryText={viewer.displayName} />
        ))}
      </List>
    </Widget>
  )
}

export default Viewers
