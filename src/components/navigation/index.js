import React from 'react'
import { Link, hashHistory } from 'react-router'
import { Divider, Drawer, MenuItem, Subheader } from 'material-ui'

export const MainLeftDrawer = (props) => {
  const { onRequestChange } = props

  const LinkItem = (props) => {
    const { primaryText, to } = props
    return (
      <MenuItem
        primaryText={primaryText}
        onTouchTap={() => {
          hashHistory.push(to)
          onRequestChange()
        }}/>
    )
  }

  return (
    <Drawer docked={false} {...props}>
      <Subheader>Command Center</Subheader>
      <Divider />

      <LinkItem primaryText="Dashboard" to="/" />
      <LinkItem primaryText="Chat" to="/chat" />
      <LinkItem primaryText="Bot" to="/bot" />
      <Divider />

      <LinkItem primaryText="Settings" to="/settings" />
    </Drawer>
  )
}
