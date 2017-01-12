import Rx from 'rxjs'
import { get } from 'rest'

const root = 'https://tmi.twitch.tv'
const URL = (uri) => (
  `${root}${uri}`
)

const chatters = (channel) => (
  get(URL(`/group/user/${channel.toLowerCase()}/chatters`))
)

export default {
  chatters
}
