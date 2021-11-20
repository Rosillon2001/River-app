import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function LoginScreen({ onAuthChange }) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(user, password)
    }, [user, password])

    const fakeLogin = useCallback(event => {
        onAuthChange(true)
    }, [onAuthChange])

    const login = () => {
        console.log('login')
    }

    return (
        <View style={styles.inputView}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.inputText}
                textContentType="username"
                placeholder="Username or email"
                placeholderTextColor="gray"
                onChangeText={text => setUser(text)}
            />
            <TextInput
                style={styles.inputText}
                textContentType="password"
                secureTextEntry="true"
                placeholder="Password"
                placeholderTextColor="gray"
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            {/* <Button title="Fake login" onPress={fakeLogin} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        margin: "auto",
        marginTop: "1em",
        width: "80%",
        backgroundColor: "#dddddd",
        borderRadius: 25,
        padding: "1em"
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#38B6FF",
        textAlign: "center"
    },
    inputText: {
        height: 50,
        color: "black",
        margin: "1em",
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: "0.5em"
    },
    loginButton: {
        margin: "auto",
        marginTop: "1em",
        alignItems: "center",
        borderRadius: 25,
        padding: "0.75em",
        width: "50%",
        backgroundColor: "#38B6FF"
    },
    loginText: {
        color: "white"
    }
})