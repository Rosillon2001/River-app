import { takeLatest } from "@redux-saga/core/effects";
import { GET_USER } from "../ducks/user";
import { handleGetUser } from "./handlers/user";

export function* watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
}