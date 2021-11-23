import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./ducks/user"

const reducer = combineReducers({
    user: userReducer
})

const store = createStore(reducer)

export default store