import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-elements';

import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice"

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import ModalContainer from "../components/ModalContainer";

export default function HomeScreen() {

    const dispatch = useDispatch();

    const [postModal, setPostModal] = useState(false)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        const token = await AsyncStorage.getItem('TOKEN')

        axios.get("https://app-river.herokuapp.com/user", { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                const user = {
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    name: response.data.name,
                    bio: response.data.bio,
                    location: response.data.location,
                    birthDate: response.data.birthDate,
                    picture: response.data.picture,
                    dateCreated: response.data.dateCreated
                }
                dispatch(setUser(user))
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text>Home</Text>
            </ScrollView>
            <FAB icon={{ name: 'add', color: 'white' }} color="#5271FF" placement="right" onPress={() => { setPostModal(true) }} />
            <ModalContainer visible={postModal} onModalClose={setPostModal} />
        </View>
    );
}