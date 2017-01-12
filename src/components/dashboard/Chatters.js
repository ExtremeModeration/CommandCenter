import _ from 'lodash'
import React from 'react'
import { List, ListItem, Subheader } from 'material-ui'
import { CommunicationChat } from 'material-ui/svg-icons'
import Widget from './Widget'
import WidgetBody from './WidgetBody'

const Chatters = (props) => {
  const {
    count,
    moderators,
    staff,
    admins,
    global_admins,
    viewers
  } = props

  const names = [].concat(
    moderators,
    staff,
    admins,
    global_admins,
    viewers
  )

  return (
    <Widget title={`${count} chatters`}>
      <WidgetBody>
        <List>
          {_.sortBy(names, o => o).map((name, key) => (
            name ? <ListItem
              key={key}
              leftIcon={<CommunicationChat />}
              primaryText={name} /> : null
          ))}
        </List>
      </WidgetBody>
    </Widget>
  )
}

export default Chatters
