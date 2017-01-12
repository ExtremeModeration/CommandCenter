import {
  FETCH_FOLLOWS,
  fetchFollows,
  fetchFollowsSuccess
} from 'reducers/follows'
import twitch from 'twitch'

const followsEpic = action$ =>
  action$.ofType(FETCH_FOLLOWS)
    .mergeMap((action, state) =>
      twitch.channelFollows(action.channel, state.cursor)
        .map((json) => {
          const { _cursor, follows } = json
          return fetchFollowsSuccess(follows, _cursor)
        }))

export default followsEpic
