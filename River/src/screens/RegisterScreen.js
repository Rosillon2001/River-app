import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, ToastAndroid, StyleSheet, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loading from "../components/Loading";
import LocationPicker from "../components/LocationPicker";
import ImageInput from "../components/ImageInput";
import axios from "axios";

export default function RegisterScreen({ navigation }) {

    const [disabledRegister, setDisabledRegister] = useState(true)
    const [loading, setLoading] = useState(false)
    const [optionalInfo, setOptionalInfo] = useState(true);

    // FORM FIELD HOOKS
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState("");
    // OPTIONAL FORM FIELD HOOKS
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [picture, setPicture] = useState(null);

    // USE EFFECT FOR ENABLING/DISABLING REGISTER BUTTON
    useEffect(() => {
        if (username != "" && validEmail && password != "" && password.length >= 6) {
            setDisabledRegister(false)
        } else {
            setDisabledRegister(true)
        }
    }, [username, email, password])

    // FUNCTION FOR VALIDATING EMAIL
    const validateEmail = (email) => {
        setEmail(email)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setValidEmail(false)
        }
        else {
            setValidEmail(true)
        }
    }

    const register = () => {
        setLoading(true)

        let formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('name', name)
        formData.append('bio', bio)
        formData.append('location', location)
        formData.append('birthDate', "")

        if (picture && Platform.OS !== 'web') {
            let fileType = picture.substring(picture.lastIndexOf(".") + 1);
            formData.append('picture', { uri: picture, name: `photo.${fileType}`, type: `image/${fileType}` })
        }

        axios.post("https://app-river.herokuapp.com/register", formData)
            .then(async (response) => {
                console.log(response.data);
                setLoading(false)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
                navigation.goBack();
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false)
                ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
            });
    }

    return (
        <ScrollView>
            <View style={styles.inputView}>
                <Text style={styles.title}>Register</Text>

                <View style={{ alignSelf: "center" }}>
                    {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200, borderRadius: 10 }} />}
                </View>

                <TextInput
                    style={styles.inputText}
                    textContentType="username"
                    placeholder="Username"
                    placeholderTextColor="gray"
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.inputText}
                    textContentType="emailAddress"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    onChangeText={text => validateEmail(text)}
                />
                <TextInput
                    style={styles.inputText}
                    textContentType="password"
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    onChangeText={text => setPassword(text)}
                />
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <Ionicons name={optionalInfo ? 'chevron-up' : 'chevron-down'} size={20} color='gray' />
                    <Text style={{ color: 'gray' }} onPress={() => { setOptionalInfo(!optionalInfo) }}>Optional info</Text>
                </View>
                <View style={optionalInfo ? {} : { display: 'none' }}>
                    <TextInput
                        style={styles.inputText}
                        textContentType="name"
                        placeholder="Name"
                        placeholderTextColor="gray"
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={styles.inputText}
                        textContentType="none"
                        placeholder="Bio"
                        placeholderTextColor="gray"
                        onChangeText={text => setBio(text)}
                    />
                    <LocationPicker onLocationChange={setLocation} />
                    <ImageInput onImageSelected={setPicture} />
                </View>
                <TouchableOpacity disabled={disabledRegister} style={disabledRegister ? styles.disabledButton : styles.button} onPress={register}>
                    <Text style={{ color: "white" }}>Register</Text>
                </TouchableOpacity>

                <Loading activated={loading} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputView: {
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25,
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
    invalidInputText: {
        height: 50,
        color: "black",
        margin: 10,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: 10,
        borderColor: "red",
        borderWidth: 1
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        margin: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "#38B6FF"
    },
    disabledButton: {
        alignSelf: "center",
        alignItems: "center",
        margin: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "darkgray"
    }
})