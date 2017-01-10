import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/app'
import Chat from 'components/chat'
import Dashboard from 'components/dashboard'

export default () => (
  <Route path='/' name='app' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='chat' component={Chat} />
  </Route>
)
