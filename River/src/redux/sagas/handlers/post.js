import { call, put, select } from 'redux-saga/effects'
import { requestCreatePost, requestDeletePost, requestGetFeed, requestGetPosts, requestLikePost, requestRepost } from '../requests/post'
import { setResponse, setPosts } from '../../ducks/post'
import { getUser } from '../../ducks/user'

const userSelector = (state) => state.user.user

export function* handleCreatePost(action) {
    try {
        const response = yield call(requestCreatePost, action.formData)
        const { data } = response
        yield put(setResponse(data.status, data.message))
        yield put(getUser())
    } catch (error) {
        console.log(error)
    }
}

export function* handleDeletePost(action) {
    try {
        const response = yield call(requestDeletePost, action.id)
        const { data } = response
        yield put(setResponse(data.status, data.message))
        yield put(getUser())
    } catch (error) {
        console.log(error)
    }
}

export function* handleGetPosts() {
    try{    
        let user = yield select(userSelector);
        let response 
        if(!user.follows.length){
            response = yield call(requestGetPosts)
        }else{
            response = yield call(requestGetFeed)
        }
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