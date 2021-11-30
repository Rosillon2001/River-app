import { takeLatest } from "@redux-saga/core/effects";
import { GET_USER } from "../ducks/user";
import { handleGetUser } from "./handlers/user";
import { PERFORM_SEARCH } from "../ducks/search";
import { handlePerformSearch } from "./handlers/search";
import { CREATE_POST, DELETE_POST } from "../ducks/post";
import { handleCreatePost, handleDeletePost } from "./handlers/post";

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(PERFORM_SEARCH, handlePerformSearch)
    yield takeLatest(CREATE_POST, handleCreatePost)
    yield takeLatest(DELETE_POST, handleDeletePost)
}