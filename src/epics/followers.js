import {
  FETCH_FOLLOWERS,
  fetchFollowerSuccess
} from 'reducers/followers'
import twitch from 'twitch/api'

const followersEpic = action$ =>
  action$.ofType(FETCH_FOLLOWERS)
    .mergeMap(action =>
      twitch.followers(action.channel).map((follower) => fetchFollowerSuccess(follower)))

export default followersEpic
