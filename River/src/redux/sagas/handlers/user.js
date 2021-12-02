import { call, put } from 'redux-saga/effects'
import { setResponse, setUser, getUser, setUserPosts } from '../../ducks/user'
import { requestDeleteUser, requestGetUser, requestUpdateUser, requestGetUserPosts } from '../requests/user'

export function* handleGetUser(action) {
    try {
        const response = yield call(requestGetUser)
        const { data } = response
        yield put(setUser(data))
    } catch (error) {
        console.log(error)
        yield put(setUser(undefined))
    }
}

export function* handleUpdateUser(action) {
    try {
        const response = yield call(requestUpdateUser, action.formData)
        const { data } = response
        yield put(setResponse(data.status, data.message))
        yield put(getUser())
    } catch (error) {
        console.log(error)
        yield put(setResponse(error.response.data.status, error.response.data.message))
    }
}

export function* handleDeleteUser() {
    try {
        const response = yield call(requestDeleteUser)
        const { data } = response
        yield put(setResponse(data.status, data.message))
        yield put(getUser())
    } catch (error) {
        console.log(error)
        yield put(getUser())
    }
}

export function* handleGetUserPosts() {
    try {
        const response = yield call(requestGetUserPosts)
        const { data } = response
        yield put(setUserPosts(data.totalPosts))
    } catch (error) {
        console.log(error)
    }
}