import { combineEpics } from 'redux-observable'

import followsEpic from './follows'
import streamEpic from './stream'
import viewersEpic from './viewers'

export const rootEpic = combineEpics(
  followsEpic,
  streamEpic,
  viewersEpic
)
