export const FETCH_STREAM = 'FETCH_STREAM'
export const FETCH_STREAM_SUCCESS = 'FETCH_STREAM_SUCCESS'

const initialState = {
  viewers: 0,
  game: '',
  online: false,
  channel: {
    status: ''
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_STREAM_SUCCESS:
      return {
        ...state,
        ...action.stream,
        online: action.stream !== null
      }
    default:
      return state
  }
}

export const fetchStream = (channel) => ({ type: FETCH_STREAM, channel })
export const fetchStreamSuccess = (stream) => ({type: FETCH_STREAM_SUCCESS, stream})
