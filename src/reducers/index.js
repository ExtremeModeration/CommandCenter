import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import chat from './chat'
import drawer from './drawer'
import stream from './stream'

export default combineReducers({
  chat,
  drawer,
  stream,
  routing
});
