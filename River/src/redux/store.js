import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./ducks/user"

const reducer = combineReducers({
    user: userReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watcherSaga)

export default store