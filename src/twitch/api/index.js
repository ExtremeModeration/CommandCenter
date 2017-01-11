import Rx from 'rxjs'

const init = {
  headers: new Headers({
    'Content-Type': 'text/json',
    'Client-ID': 'rifk3d0r9wyfutpstcgdeexslirhnci'
  })
}

const root = 'https://api.twitch.tv/kraken'
const URL = (uri) => (
  `${root}${uri}`
)

const doGet = (url, options) => {
  return Rx.Observable.fromPromise(fetch(url, init)).flatMap((response) => {
    const json = response.json()
    return Rx.Observable.concat(Rx.Observable.fromPromise(json), (
      (json._links && json._links.next && json._cursor) ?
        doGet(json._links.next, options) : Rx.Observable.empty()
    ))
  })
}

const channel = (channel, options) => (
  doGet(URL(`/channels/${channel}`), options)
)

const followers = (channel, options) => (
  doGet(URL(`/channels/${channel}/follows`), options).flatMap((json) => {
    return Rx.Observable.from(json.follows)
  })
)

const stream = (channel, options) => (
  doGet(URL(`/streams/${channel}`), options)
)

export default {
  channel,
  followers,
  stream
}
