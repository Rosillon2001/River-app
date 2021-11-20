import React, { useEffect, useCallback } from "react";
import { Text, View, Button } from 'react-native';
import { useSelector } from "react-redux";

export default function ProfileScreen({ onAuthChange }) {

    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log(user)
    }, []);

    const fakeLogout = useCallback(event => {
        onAuthChange(false)
    }, [onAuthChange])

    return (
        <View>
            <Text>Profile</Text>
            <Button title="Fake logout" onPress={fakeLogout} />
        </View>
    );
}