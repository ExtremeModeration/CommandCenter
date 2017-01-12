import Rx from 'rxjs'
import { get } from 'rest'

const root = 'https://tmi.twitch.tv'
const URL = (uri) => (
  `${root}${uri}`
)

const chatters = (channel, options) => (
  get(URL(`/group/user/${channel.toLowerCase()}/chatters`), options)
)

const viewers = (channel, options) => (
  chatters(channel, options).flatMap(({chatters}) => (
    Rx.Observable.from(chatters.viewers)
  ))
)

export default {
  chatters,
  viewers
}
