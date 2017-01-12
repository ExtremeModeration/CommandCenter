import _ from 'lodash'
import React from 'react'
import { List } from 'material-ui'
import Widget from './Widget'
import WidgetBody from './WidgetBody'
import UserListItem from './UserListItem'

const Title = (props) => {
  const numFollowers = props.followers.length
  return (
    <div>{numFollowers} Followers</div>
  )
}

const Followers = (props) => {
  const { followers } = props
  const sorted = _.sortBy(followers, o => o.name)
  const userListItems = sorted.map((user, key) => (
    <UserListItem {...user} key={key} />
  ))

  return (
    <Widget title={<Title followers={followers} />}>
      <WidgetBody>
        <List>
          {userListItems}
        </List>
      </WidgetBody>
    </Widget>
  )
}

export default Followers
