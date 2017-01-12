import Rx from 'rxjs'

const init = {
  headers: new Headers({
    'Content-Type': 'text/json',
    'Client-ID': 'rifk3d0r9wyfutpstcgdeexslirhnci',
    'Accept': 'application/vnd.twitchtv.v5+json'
  })
}

export const get = (url, cursor, limit = 100) => {
  const limitPrefix = url.indexOf('?') > -1 ? '&' : '?'
  const limitParam = url.indexOf('limit=') > -1 ? '' : `limit=${limit}`
  const cursorParam = cursor ? `&cursor=${cursor}` : ''
  const _url = `${url}${limitPrefix}${limitParam}${cursorParam}`

  return Rx.Observable.fromPromise(fetch(_url, init)).flatMap((r) => {
    const json = r.json()
    return Rx.Observable.fromPromise(json).flatMap(({_cursor}) => {
      return Rx.Observable.concat(
        Rx.Observable.fromPromise(json),
        _cursor ? get(url, _cursor, limit) : Rx.Observable.empty()
      )
    })
  })
}
