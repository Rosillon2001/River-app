import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function requestGetPostComments(id) {
    return axios.get(`https://app-river.herokuapp.com/comments/${id}`)
}

export async function requestCreateComment(id, content) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.post(`https://app-river.herokuapp.com/comments/${id}`, {content: content}, { headers: { Authorization: `Bearer ${token}` } })
}

export async function requestDeleteComment(id) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.delete(`https://app-river.herokuapp.com/comment/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}