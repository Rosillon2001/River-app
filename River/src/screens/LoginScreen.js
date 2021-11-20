import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function LoginScreen({ onAuthChange }) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [disabledLogin, setDisabledLogin] = useState(true)

    // FIELD VALIDATION USE EFFECT HOOK
    useEffect(() => {
        if (user != "" && password != "" && password.length >= 6) {
            setDisabledLogin(false)
        } else {
            setDisabledLogin(true)
        }
    }, [user, password])

    // FUNCTION FOR CHANGING NAVIGARION'S AUTH STATE WHEN LOGGING IN
    const changeAuthState = useCallback((state) => {
        onAuthChange(state)
    }, [onAuthChange])

    // FUNCTION FOR LOGIN REQUEST
    const login = async () => {
        axios.post("https://app-river.herokuapp.com/login", { user: user, password: password })
            .then(async (response) => {
                if (response.status === 200) {
                    await AsyncStorage.setItem('TOKEN', response.data.token)
                    changeAuthState(true)
                }
            })
            .catch(error => {
                Alert.alert("Error", error.response.data.message, [{ text: "OK" }]) //NOT AVAILABLE ON WEB
            });
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
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="gray"
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity disabled={disabledLogin} style={disabledLogin ? styles.disabledLoginButton : styles.loginButton} onPress={login}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        alignSelf: "center",
        marginTop: 25,
        width: "80%",
        backgroundColor: "#dddddd",
        borderRadius: 25,
        padding: 25
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#38B6FF",
        textAlign: "center",
        marginBottom: 20
    },
    inputText: {
        height: 50,
        color: "black",
        margin: 10,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: 10
    },
    loginButton: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "#38B6FF"
    },
    disabledLoginButton: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "darkgray"
    },
    loginText: {
        color: "white"
    }
})