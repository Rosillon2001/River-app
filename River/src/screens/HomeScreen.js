import React from "react";
import { Button, Text, View } from 'react-native';

import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice"

export default function HomeScreen() {

    const dispatch = useDispatch();

    function storeUser() {
        const user = {
            id: 4,
            username: "testUser",
            email: "test@user.com",
            name: "Jose",
            bio: null,
            location: null,
            birthDate: "12/02/2001",
            picture: null,
            dateCreated: "19/11/2021"
        }
        dispatch(setUser(user))
    }

    return (
        <View>
            <Text>Home</Text>
            <Button onPress={storeUser}>Redux store example</Button>
        </View>
    );
}