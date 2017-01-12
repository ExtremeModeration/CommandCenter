import { combineEpics } from 'redux-observable'

import followsEpic from './follows'
import streamEpic from './stream'
import chattersEpic from './chatters'

export const rootEpic = combineEpics(
  followsEpic,
  streamEpic,
  chattersEpic
)
