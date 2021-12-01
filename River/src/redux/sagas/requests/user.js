import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestGetUser() {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.request({
        method: "get",
        url: "https://app-river.herokuapp.com/user",
        headers: { Authorization: `Bearer ${token}` }
    });
}

export async function requestUpdateUser(formData) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.put("https://app-river.herokuapp.com/user", formData, { headers: { Authorization: `Bearer ${token}` } })
}

export async function requestDeleteUser() {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.delete("https://app-river.herokuapp.com/user", { headers: { Authorization: `Bearer ${token}` } })
}