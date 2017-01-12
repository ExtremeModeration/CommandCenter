import _ from 'lodash'

export const FETCH_CHATTERS = 'FETCH_CHATTERS'
const FETCH_CHATTERS_SUCCESS = 'FETCH_CHATTERS_SUCCESS'

const initialState = {
  count: 0,
  moderators: [],
  staff: [],
  admins: [],
  global_mods: [],
  viewers: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_CHATTERS_SUCCESS:
      return {
        ...state,
        ...action.chatters,
        count: action.chatter_count
      }
    default:
      return state
  }
}

export const fetchChatters = (channel) => ({
  type: FETCH_CHATTERS,
  channel
})

export const fetchChattersSuccess = ({chatter_count, chatters}) => ({
  type: FETCH_CHATTERS_SUCCESS,
  chatters,
  chatter_count
})
