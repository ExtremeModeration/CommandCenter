const CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED'
const CHAT_MESSAGE_SENT = 'CHAT_MESSAG_SENT'

const initialState = {
  messages: [
    {author: 'ExtremeModeration', body: 'This is amazing, who writes like this?'},
    {author: 'Lorem Ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut metus nunc. Nullam suscipit pulvinar mauris id imperdiet. Quisque iaculis tellus erat, vitae tristique tellus luctus in.'}
  ]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_MESSAGE_RECEIVED:
      return state.messages.concat([action.message])
    default:
      return state
  }
}

export const sendChatMessage = (message) => ({
  type: CHAT_MESSAGE_SENT,
  message
})
