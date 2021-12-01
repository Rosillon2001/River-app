import { takeLatest } from "@redux-saga/core/effects";
import { DELETE_USER, GET_USER, UPDATE_USER } from "../ducks/user";
import { handleDeleteUser, handleGetUser, handleUpdateUser } from "./handlers/user";
import { PERFORM_SEARCH } from "../ducks/search";
import { handlePerformSearch } from "./handlers/search";
import { CREATE_POST, DELETE_POST, GET_POSTS, LIKE_POST, REPOST } from "../ducks/post";
import { handleCreatePost, handleDeletePost, handleGetPosts, handleLikePosts, handleRepost } from "./handlers/post";

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(UPDATE_USER, handleUpdateUser)
    yield takeLatest(DELETE_USER, handleDeleteUser)
    yield takeLatest(PERFORM_SEARCH, handlePerformSearch)
    yield takeLatest(CREATE_POST, handleCreatePost)
    yield takeLatest(DELETE_POST, handleDeletePost)
    yield takeLatest(GET_POSTS, handleGetPosts)
    yield takeLatest(LIKE_POST, handleLikePosts)
    yield takeLatest(REPOST, handleRepost)
}