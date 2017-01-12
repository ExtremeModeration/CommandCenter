import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import chat from './chat'
import drawer from './drawer'
import follows from './follows'
import stream from './stream'
import viewers from './viewers'

export default combineReducers({
  chat,
  drawer,
  follows,
  stream,
  viewers,
  routing
});
