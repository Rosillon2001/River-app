import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LocationPicker from "../components/LocationPicker";
import ImageInput from "../components/ImageInput";

export default function UserForm({ onValidityChange, onDataChange, title }) {

    const changeFormValidity = useCallback((state) => {
        onValidityChange(state)
    }, [onValidityChange])

    const changeFormData = useCallback((data) => {
        onDataChange(data)
    }, [onDataChange])

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
            changeFormValidity(false)
        } else {
            changeFormValidity(true)
        }
    }, [username, email, password])

    // USE EFFECT FOR CHANGING FORM DATA VALUES
    useEffect(() => {
        const data = {
            username: username,
            email: email,
            password: password,
            name: name,
            bio: bio,
            location: location,
            picture: picture
        }
        changeFormData(data)
    }, [username, email, password, name, bio, location, picture])

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

    return (
        <View>
            <Text style={styles.title}>{title}</Text>

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
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "gray",
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
    }
})