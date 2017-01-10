import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { hashHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getRoutes from 'router/router'
import initStore from 'config/store'

injectTapEventPlugin()

const store = initStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={getRoutes()} />
    </div>
  </Provider>,
  document.getElementById('root')
)
