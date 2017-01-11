import React from 'react'
import { Avatar, ListItem } from 'material-ui'

const UserListItem = (props) => {
  const avatar = <Avatar src={props.logo} />
  return (
    <ListItem
      primaryText={props.display_name}
      leftAvatar={avatar} />
  )
}

export default UserListItem
