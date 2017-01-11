import _ from 'lodash'

export const FETCH_FOLLOWERS = 'FETCH_FOLLOWERS'
const FETCH_FOLLOWER_SUCCESS = 'FETCH_FOLLOWER_SUCCESS'

const initialState = {
  users: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_FOLLOWER_SUCCESS:
      let users = [].concat(state.users)

      if (!_.find(users, (o) => o.display_name === action.follower.user.display_name)) {
        users.push(action.follower.user)
      }

      return {
        ...state,
        users
      }
    default:
      return state
  }
}

export const fetchFollowers = (channel) => ({
  type: FETCH_FOLLOWERS,
  channel
})

export const fetchFollowerSuccess = (follower) => ({
  type: FETCH_FOLLOWER_SUCCESS,
  follower
})
