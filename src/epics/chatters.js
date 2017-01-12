import {
  FETCH_CHATTERS,
  fetchChattersSuccess
} from 'reducers/chatters'
import tmi from 'twitch/tmi'

const chattersEpic = action$ =>
  action$.ofType(FETCH_CHATTERS)
    .mergeMap(action =>
      tmi.chatters(action.channel).map((json) => (
        fetchChattersSuccess(json)))
      )

export default chattersEpic
