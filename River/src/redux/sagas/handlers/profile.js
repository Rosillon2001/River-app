import { call, put } from 'redux-saga/effects'
import { setProfile } from '../../ducks/profile'
import { requestGetProfile } from '../requests/profile'

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