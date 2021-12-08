import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestGetProfile(id) {
    const token = await AsyncStorage.getItem('TOKEN')

    return axios.get(`https://app-river.herokuapp.com/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
}

