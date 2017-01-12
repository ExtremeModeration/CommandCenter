import Rx from 'rxjs'
import { get } from 'rest'

const root = 'https://api.twitch.tv/kraken'
const URL = (uri) => (
  `${root}${uri}`
)

const channel = (channel) => (
  get(URL(`/channels/${channel}`))
)

const channelFollows = (channel, cursor) => (
  get(URL(`/channels/${channel}/follows`), cursor)
)

const stream = (channel) => (
  get(URL(`/streams/${channel}`))
)

export default {
  channel,
  channelFollows,
  stream
}
