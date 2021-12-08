import { takeLatest } from "@redux-saga/core/effects";
import { DELETE_USER, GET_USER, GET_USER_POSTS, UPDATE_USER } from "../ducks/user";
import { handleDeleteUser, handleGetUser, handleGetUserPosts, handleUpdateUser } from "./handlers/user";
import { PERFORM_SEARCH } from "../ducks/search";
import { handlePerformSearch } from "./handlers/search";
import { CREATE_POST, DELETE_POST, GET_POSTS, LIKE_POST, REPOST } from "../ducks/post";
import { handleCreatePost, handleDeletePost, handleGetPosts, handleLikePosts, handleRepost } from "./handlers/post";
import { CREATE_COMMENT, DELETE_COMMENT, GET_POST_COMMENTS } from "../ducks/comment";
import { handleCreateComment, handleDeleteComment, handleGetPostComments } from "./handlers/comment";
import { FOLLOW, GET_PROFILE } from "../ducks/profile";
import { handleFollow, handleGetProfile } from "./handlers/profile"

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(UPDATE_USER, handleUpdateUser)
    yield takeLatest(DELETE_USER, handleDeleteUser)
    yield takeLatest(GET_USER_POSTS, handleGetUserPosts)
    yield takeLatest(PERFORM_SEARCH, handlePerformSearch)
    yield takeLatest(CREATE_POST, handleCreatePost)
    yield takeLatest(DELETE_POST, handleDeletePost)
    yield takeLatest(GET_POSTS, handleGetPosts)
    yield takeLatest(LIKE_POST, handleLikePosts)
    yield takeLatest(REPOST, handleRepost)
    yield takeLatest(GET_POST_COMMENTS, handleGetPostComments)
    yield takeLatest(CREATE_COMMENT, handleCreateComment)
    yield takeLatest(DELETE_COMMENT, handleDeleteComment)
    yield takeLatest(GET_PROFILE, handleGetProfile)
    yield takeLatest(FOLLOW, handleFollow)
}