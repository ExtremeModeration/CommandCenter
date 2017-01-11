import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import chat from './chat'
import drawer from './drawer'
import followers from './followers'
import stream from './stream'

export default combineReducers({
  chat,
  drawer,
  followers,
  stream,
  routing
});
