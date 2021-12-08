import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestGetProfile(id) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.get(`https://app-river.herokuapp.com/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}

export async function requestFollow(id) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.post(`https://app-river.herokuapp.com/follow/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
}