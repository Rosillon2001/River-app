import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import LocationPicker from "../components/LocationPicker";
import ImageInput from "../components/ImageInput";

export default function UserForm({ onValidityChange, onDataChange, title, user }) {

    const changeFormValidity = useCallback((state) => {
        onValidityChange(state)
    }, [onValidityChange])

    const changeFormData = useCallback((data) => {
        onDataChange(data)
    }, [onDataChange])

    const [optionalInfo, setOptionalInfo] = useState(true);

    // FORM FIELD HOOKS
    const [username, setUsername] = useState(user ? user.username : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [validEmail, setValidEmail] = useState(user ? true : false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // OPTIONAL FORM FIELD HOOKS
    const [name, setName] = useState(user ? user.name : "");
    const [bio, setBio] = useState(user ? user.bio : "");
    const [location, setLocation] = useState(user ? user.location : "");
    const [picture, setPicture] = useState(user ? user.picture : null);

    // USE EFFECT FOR ENABLING/DISABLING REGISTER BUTTON
    useEffect(() => {
        if (username != "" && validEmail && password != "" && password.length >= 6 && password === confirmPassword) {
            changeFormValidity(false)
        } else {
            changeFormValidity(true)
        }
    }, [username, email, password, confirmPassword])

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

            {picture && <Avatar rounded size="xlarge" source={{ uri: picture }} containerStyle={{ alignSelf: "center" }} />}

            <Text style={styles.textLable}>Username</Text>
            <TextInput
                style={styles.inputText}
                textContentType="username"
                placeholder="Username"
                placeholderTextColor="gray"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <Text style={styles.textLable}>Email address</Text>
            <TextInput
                style={styles.inputText}
                textContentType="emailAddress"
                placeholder="Email"
                placeholderTextColor="gray"
                onChangeText={text => validateEmail(text)}
                value={email}
            />
            <Text style={styles.textLable}>Password</Text>
            <TextInput
                style={styles.inputText}
                textContentType="password"
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="gray"
                onChangeText={text => setPassword(text)}
            />
            <Text style={styles.textLable}>Confirm password</Text>
            <TextInput
                style={styles.inputText}
                textContentType="password"
                secureTextEntry={true}
                placeholder="Confirm password"
                placeholderTextColor="gray"
                onChangeText={text => setConfirmPassword(text)}
            />
            <View style={styles.optionalInfo}>
                <Ionicons name={optionalInfo ? 'chevron-up' : 'chevron-down'} size={20} color='gray' />
                <Text style={{ color: 'gray' }} onPress={() => { setOptionalInfo(!optionalInfo) }}>Optional info</Text>
            </View>
            <View style={optionalInfo ? {} : { display: 'none' }}>
                <Text style={styles.textLable}>Name</Text>
                <TextInput
                    style={styles.inputText}
                    textContentType="name"
                    placeholder="Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Text style={styles.textLable}>Bio</Text>
                <TextInput
                    style={styles.inputText}
                    textContentType="none"
                    placeholder="Bio"
                    placeholderTextColor="gray"
                    onChangeText={text => setBio(text)}
                    value={bio}
                />
                <LocationPicker onLocationChange={setLocation} location={location} />
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
    textLable: {
        color: 'gray',
        marginLeft: 20,
    },
    inputText: {
        height: 50,
        color: "black",
        margin: 10,
        marginTop: 5,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: 10
    },
    optionalInfo: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 15
    }
})