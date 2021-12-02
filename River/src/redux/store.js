import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./ducks/user"
import searchReducer from "./ducks/search"
import postReducer from "./ducks/post"
import commentReducer from "./ducks/comment"

const reducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    post: postReducer,
    comment: commentReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watcherSaga)

export default store