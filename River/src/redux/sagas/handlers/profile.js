import { call, put } from 'redux-saga/effects'
import { getProfile, setProfile, setResponse } from '../../ducks/profile'
import { getUser } from '../../ducks/user'
import { requestFollow, requestGetProfile } from '../requests/profile'

export function* handleGetProfile(action) {
    try {
        const response = yield call(requestGetProfile, action.id)
        const { data } = response
        yield put(setProfile(data.profile, data.posts))
    } catch (error) {
        console.log(error)
        yield put(setProfile(undefined, undefined))
    }
}

export function* handleFollow(action) {
    try {
        const response = yield call(requestFollow, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
        yield put(getUser())
        yield put(getProfile(action.id))
    } catch (error) {
        console.log(error)
    }
}