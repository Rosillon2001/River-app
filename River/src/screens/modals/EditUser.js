import React, { useEffect, useCallback, useState } from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet, Platform, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../../components/Loading";
import { Card } from "react-native-elements";
import ModalContainer from "../../components/ModalContainer";
import UserForm from "../../components/UserForm";
import axios from "axios";
import { getUser } from "../../redux/ducks/user";

export default function EditUser({ visible, onModalClose }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    const user = useSelector(state => state.user.user);

    const [loading, setLoading] = useState(false)

    //USER EDIT HOOKS
    const [disableUserUpdate, setDisableUserUpdate] = useState(true);
    const [userEditedData, setUserEditedData] = useState(null);

    const updateUser = async () => {
        setLoading(true)

        let formData = new FormData()
        formData.append('username', userEditedData.username)
        formData.append('email', userEditedData.email)
        formData.append('password', userEditedData.password)
        formData.append('name', userEditedData.name ? userEditedData.name : "")
        formData.append('bio', userEditedData.bio ? userEditedData.bio : "")
        formData.append('location', userEditedData.location)
        formData.append('birthDate', "")

        if (userEditedData.picture && Platform.OS !== 'web' && (!userEditedData.picture.includes('app-river'))) {
            let fileType = userEditedData.picture.substring(userEditedData.picture.lastIndexOf(".") + 1);
            formData.append('picture', { uri: userEditedData.picture, name: `photo.${fileType}`, type: `image/${fileType}` })
        }

        const token = await AsyncStorage.getItem('TOKEN')

        axios.put("https://app-river.herokuapp.com/user", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                console.log(response.data);
                setLoading(false)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
                dispatch(getUser())
                closeModal()
            })
            .catch(error => {
                console.log(error.response.data);
                setLoading(false)
                ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
            });
    }

    return (
        <>
            <Loading activated={loading} />
            <ModalContainer
                visible={visible}
                title="Edit profile"
                onModalClose={closeModal}
                Component={
                    <ScrollView>
                        <Card containerStyle={styles.updateUserCard}>
                            <UserForm onDataChange={setUserEditedData} onValidityChange={setDisableUserUpdate} title="Update user" user={user} />
                            <TouchableOpacity disabled={disableUserUpdate} style={disableUserUpdate ? styles.disabledButton : styles.button} onPress={updateUser}>
                                <Text style={{ color: "white" }}>Update user</Text>
                            </TouchableOpacity>
                        </Card>
                    </ScrollView>
                }
            />
        </>
    );
}

const styles = StyleSheet.create({
    updateUserCard: {
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