import { call, put } from 'redux-saga/effects'
import { setSearchData } from '../../ducks/search'
import { requestPerformSearch } from '../requests/search'

export function* handlePerformSearch(action) {
    try {
        if(action.keyword != ""){
            const response = yield call(requestPerformSearch, action.keyword)
            const { data } = response
            yield put(setSearchData(data, action.keyword))
        }else{
            yield put(setSearchData(undefined, undefined))
        }
    } catch (error) {
        console.log(error)
    }
}