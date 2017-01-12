import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import chat from './chat'
import drawer from './drawer'
import follows from './follows'
import stream from './stream'
import chatters from './chatters'

export default combineReducers({
  chat,
  drawer,
  follows,
  stream,
  chatters,
  routing
});
