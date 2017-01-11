import irc from 'tmi.js'

const handleChat = (channel, user, message, self) => {
  console.log(channel, user, message)
}

const client = new irc.client({channels: ['ExtremeModeration'], options: {debug: true}})

export const connect = (onMessage) => {
  client.addListener('message', onMessage)

  return client.connect()
}
