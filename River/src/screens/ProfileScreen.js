import React, { useEffect, useCallback, useState } from "react";
import { Text, View, Button } from 'react-native';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../components/Loading";

export default function ProfileScreen({ onAuthChange }) {

    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(user)
    }, []);

    const changeAuthState = useCallback((state) => {
        onAuthChange(state)
    }, [onAuthChange])

    const logout = async () => {
        setLoading(true)
        await AsyncStorage.removeItem('TOKEN')
        changeAuthState(false)
        setLoading(false)
    }

    return (
        <View>
            <Text>Profile</Text>
            <Button title="Logout" onPress={logout} />
            <Loading activated={loading}/>
        </View>
    );
}