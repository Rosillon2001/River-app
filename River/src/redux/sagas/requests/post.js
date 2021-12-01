import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestCreatePost(formData) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.post('https://app-river.herokuapp.com/post', formData, { headers: { Authorization: `Bearer ${token}` } })
}

export async function requestDeletePost(id) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.delete(`https://app-river.herokuapp.com/post/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}

export function requestGetPosts() {
   
    return axios.get('https://app-river.herokuapp.com/posts')
}