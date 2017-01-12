import {
  FETCH_VIEWERS,
  fetchViewerSuccess
} from 'reducers/viewers'
import tmi from 'twitch/tmi'

const viewersEpic = action$ =>
  action$.ofType(FETCH_VIEWERS)
    .mergeMap(action =>
      tmi.viewers(action.channel).map((username) => fetchViewerSuccess(username)))

export default viewersEpic
