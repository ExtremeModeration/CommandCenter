import Rx from 'rxjs'
import twitch from 'twitch'
import { get } from 'rest'

const root = 'https://tmi.twitch.tv'
const URL = (uri) => (
  `${root}${uri}`
)

const processCollection = (json, collection) => {
  return json.chatters[collection].map(username => {
    return twitch.user(username).flatMap(user => {
      const i = collection.indexOf(username)
      json.chatters[collection][i] = user
      return json
    })
  })
}

const chatters = (channel) => {
  const uri = `/group/user/${channel.toLowerCase()}/chatters`
  const observable = get(URL(uri))
  return observable

  // return observable.flatMap(json => (
  //   Rx.Observable.concat(
  //     processCollection(json, 'moderators'),
  //     processCollection(json, 'viewers')
  //   )
  // ))
}

export default {
  chatters
}
