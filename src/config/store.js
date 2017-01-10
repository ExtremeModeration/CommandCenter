import React from 'react'
import reducer from 'reducers'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

const initialize = (initialState = {}) => {
  const store = process.env.ENV === 'development' ?
    createStore(reducer, initialState, applyMiddleware(thunk, promise, createLogger())) :
    createStore(reducer, initialState, applyMiddleware(thunk, promise))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default initialize
