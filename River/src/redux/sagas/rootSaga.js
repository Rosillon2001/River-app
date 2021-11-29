import { takeLatest } from "@redux-saga/core/effects";
import { GET_USER } from "../ducks/user";
import { handleGetUser } from "./handlers/user";
import { PERFORM_SEARCH } from "../ducks/search";
import { handlePerformSearch } from "./handlers/search";

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(PERFORM_SEARCH, handlePerformSearch)
}