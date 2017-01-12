import _ from 'lodash'

export const FETCH_FOLLOWS = 'FETCH_FOLLOWS'
const FETCH_FOLLOWS_SUCCESS = 'FETCH_FOLLOWER_SUCCESS'

const initialState = {
  users: [],
  cursor: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_FOLLOWS_SUCCESS:
      let users = [].concat(state.users)

      action.follows.map(follow => {
        const comparitor = (o) => (
          o.display_name === follow.user.display_name
        )

        if (!_.find(users, comparitor)) {
          users.push(follow.user)
        }
      })

      return {
        ...state,
        users,
        cursor: action.cursor
      }
    default:
      return state
  }
}

export const fetchFollows = (channel) => ({
  type: FETCH_FOLLOWS,
  channel
})

export const fetchFollowsSuccess = (follows, cursor) => ({
  type: FETCH_FOLLOWS_SUCCESS,
  follows,
  cursor
})
