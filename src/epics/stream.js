import {
  FETCH_STREAM,
  fetchStreamSuccess
} from 'reducers/stream'
import twitch from 'twitch'

const streamEpic = action$ =>
  action$.ofType(FETCH_STREAM)
    .mergeMap(action =>
      twitch.stream(action.channel).map(({stream}) => (
        fetchStreamSuccess(stream)
      )))

export default streamEpic
