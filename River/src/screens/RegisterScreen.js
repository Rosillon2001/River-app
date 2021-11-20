import React from "react";
import { Text, View, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View>
            <Text>Register</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.push('Login')}
            />
        </View>
    );
}