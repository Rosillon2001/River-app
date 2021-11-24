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