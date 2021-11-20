import React, { useCallback } from "react";
import { Text, View, Button } from 'react-native';

export default function LoginScreen({ onAuthChange }) {

    const fakeLogin = useCallback(event => {
        onAuthChange(true)
    }, [onAuthChange])

    return (
        <View>
            <Text>Login</Text>
            <Button title="Fake login" onPress={fakeLogin} />
        </View>
    );
}