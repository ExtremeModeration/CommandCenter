import { combineEpics } from 'redux-observable'

import followersEpic from './followers'
import streamEpic from './stream'

export const rootEpic = combineEpics(
  followersEpic,
  streamEpic
)
