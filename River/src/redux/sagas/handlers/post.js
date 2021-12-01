import { call, put } from 'redux-saga/effects'
import { requestCreatePost, requestDeletePost } from '../requests/post'
import { setResponse } from '../../ducks/post'

export function* handleCreatePost(action) {
    try {
        const response = yield call(requestCreatePost, action.formData)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}

export function* handleDeletePost(action) {
    try {
        const response = yield call(requestDeletePost, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}