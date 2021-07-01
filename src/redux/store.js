import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from '@redux-saga/core'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

// sagaMiddleware.run()

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)
