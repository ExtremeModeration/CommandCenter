const CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED'
const CHAT_MESSAGE_SENT = 'CHAT_MESSAG_SENT'

const initialState = {
  messages: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_MESSAGE_RECEIVED:
      return state.messages.concat([action.message])
    default:
      return state
  }
}

export function sendChatMessage(message) {
  return {
    type: CHAT_MESSAGE_SENT,
    message
  }
}
