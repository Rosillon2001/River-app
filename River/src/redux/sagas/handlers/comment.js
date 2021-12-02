import { call, put } from 'redux-saga/effects'
import { requestCreateComment, requestDeleteComment, requestGetPostComments } from '../requests/comment'
import { setResponse, setComments } from '../../ducks/comment'

export function* handleGetPostComments(action) {
    try{    
        const response = yield call(requestGetPostComments, action.id)
        const { data } = response
        yield put(setComments(data.comments))
    } catch (error) {
        console.log(error)
    }
}

export function* handleCreateComment(action) {
    try{    
        const response = yield call(requestCreateComment, action.id, action.content)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}

export function* handleDeleteComment(action) {
    try{    
        const response = yield call(requestDeleteComment, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}