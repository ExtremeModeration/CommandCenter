import _ from 'lodash'

export const FETCH_VIEWERS = 'FETCH_VIEWERS'
const FETCH_VIEWERS_SUCCESS = 'FETCH_VIEWERS_SUCCESS'

const initialState = {
  usernames: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_VIEWERS_SUCCESS:
      let usernames = [].concat(state.usernames)

      if (!_.find(usernames, action.username)) {
        usernames.push(action.username)
      }

      return {
        ...state,
        usernames
      }
    default:
      return state
  }
}

export const fetchViewers = (channel) => ({
  type: FETCH_VIEWERS,
  channel
})

export const fetchViewerSuccess = (username) => ({
  type: FETCH_VIEWERS_SUCCESS,
  username
})
