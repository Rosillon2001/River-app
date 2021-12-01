import React, { useEffect, useCallback, useState } from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { Card } from "react-native-elements";
import ModalContainer from "../../components/ModalContainer";
import UserForm from "../../components/UserForm";
import { deleteUser, getUser, updateUser } from "../../redux/ducks/user";

export default function EditUser({ visible, onModalClose }) {

    // REDUX HOOKS
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    // GET USER WHEN MOUNTING COMPONENT
    useEffect(() => {
        dispatch(getUser())
    }, [])

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    const [loading, setLoading] = useState(false)

    //USER EDIT HOOKS
    const [disableUserUpdate, setDisableUserUpdate] = useState(true);
    const [userEditedData, setUserEditedData] = useState(null);

    const performUpdateUser = async () => {
        setLoading(true)
        // BUILD FORMDATA
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
        // DISPATCH USER UPDATE ACTION
        dispatch(updateUser(formData))
    }

    const confirmUserDeletion = () => {
        // CONFIRMATION ALERT
        Alert.alert(
            "Delete user?",
            "This action cannot be undone.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setLoading(true)
                        dispatch(deleteUser())
                    },
                    style: "destructive",
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
            {
                cancelable: true
            }
        );
    }

    // USEEFFECT FOR CHECKING USER UPDATE STATE
    useEffect(() => {
        if (user.status && loading) {
            setLoading(false)
            ToastAndroid.show(user.message, ToastAndroid.LONG)
            if (user.status === 200) {
                closeModal()
            }
        }
    }, [user])

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
                            <UserForm onDataChange={setUserEditedData} onValidityChange={setDisableUserUpdate} title="Update user" user={user.user} />
                            <TouchableOpacity disabled={disableUserUpdate} style={disableUserUpdate ? styles.disabledButton : styles.button} onPress={performUpdateUser}>
                                <Text style={{ color: "white" }}>Update user</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dangerButton} onPress={confirmUserDeletion}>
                                <Text style={{ color: "white" }}>Delete user</Text>
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
    },
    dangerButton: {
        alignSelf: "center",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "#eb445a"
    }
})