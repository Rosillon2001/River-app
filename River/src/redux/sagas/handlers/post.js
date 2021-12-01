import { call, put } from 'redux-saga/effects'
import { requestCreatePost, requestDeletePost, requestGetPosts, requestLikePost, requestRepost } from '../requests/post'
import { setResponse, setPosts } from '../../ducks/post'

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

export function* handleGetPosts() {
    try{    
        const response = yield call(requestGetPosts)
        const { data } = response
        yield put(setPosts(data))
    } catch (error) {
        console.log(error)
    }
}

export function* handleLikePosts(action) {
    try{    
        const response = yield call(requestLikePost, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}

export function* handleRepost(action) {
    try{    
        const response = yield call(requestRepost, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
    } catch (error) {
        console.log(error)
    }
}