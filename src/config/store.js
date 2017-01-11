import React from 'react'
import reducer from 'reducers'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from 'epics'

const epicMiddleware = createEpicMiddleware(rootEpic)

const initialize = (initialState = {}) => {
  const store = process.env.ENV === 'development' ?
    createStore(reducer, initialState, applyMiddleware(epicMiddleware, createLogger())) :
    createStore(reducer, initialState, applyMiddleware(epicMiddleware))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default initialize
