import React, { useEffect, useCallback } from "react";
import { Text, View, Button } from 'react-native';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ onAuthChange }) {

    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log(user)
    }, []);

    const changeAuthState = useCallback((state) => {
        onAuthChange(state)
    }, [onAuthChange])

    const logout = async () => {
        await AsyncStorage.removeItem('TOKEN')
        changeAuthState(false)
    }

    return (
        <View>
            <Text>Profile</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}