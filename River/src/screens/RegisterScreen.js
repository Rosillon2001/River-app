import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, ToastAndroid, StyleSheet, Platform } from 'react-native';
import { Card } from "react-native-elements";
import Loading from "../components/Loading";
import axios from "axios";
import UserForm from "../components/UserForm";

export default function RegisterScreen({ navigation }) {

    const [disabledRegister, setDisabledRegister] = useState(true)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(data)
    }, [data])

    const register = () => {
        setLoading(true)

        let formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('name', data.name)
        formData.append('bio', data.bio)
        formData.append('location', data.location)
        formData.append('birthDate', "")

        if (data.picture && Platform.OS !== 'web') {
            let fileType = data.picture.substring(data.picture.lastIndexOf(".") + 1);
            formData.append('picture', { uri: data.picture, name: `photo.${fileType}`, type: `image/${fileType}` })
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
            <Card containerStyle={styles.registerCard}>
                <UserForm onValidityChange={setDisabledRegister} onDataChange={setData} title="Register" />
                <TouchableOpacity disabled={disabledRegister} style={disabledRegister ? styles.disabledButton : styles.button} onPress={register}>
                    <Text style={{ color: "white" }}>Register</Text>
                </TouchableOpacity>
                <Loading activated={loading} />
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    registerCard: {
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25,
        width: "80%",
        backgroundColor: "#dddddd",
        borderRadius: 25,
        padding: 25
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