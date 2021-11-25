import React, { useState, useCallback } from 'react';
import { ScrollView, TouchableOpacity, Text, ToastAndroid, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../../components/Loading';
import ModalContainer from '../../components/ModalContainer';
import PostForm from '../../components/PostForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function NewPost({ visible, onModalClose }) {

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    const [loading, setLoading] = useState(false)

    // POST HOOKS
    const [disableButton, setDisableButton] = useState(true);
    const [postData, setPostData] = useState(null);

    const createPost = async () => {
        setLoading(true)

        const formData = new FormData()
        formData.append('postText', postData.postText)

        if (postData.picture && Platform.OS !== 'web') {
            let fileType = postData.picture.substring(postData.picture.lastIndexOf(".") + 1);
            formData.append('images', { uri: postData.picture, name: `photo.${fileType}`, type: `image/${fileType}` })
        }

        const token = await AsyncStorage.getItem('TOKEN')
        axios.post('https://app-river.herokuapp.com/post', formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(async (response) => {
                console.log(response.data);
                setLoading(false)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
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
                onModalClose={closeModal}
                Component={
                    <ScrollView>
                        <Card containerStyle={styles.card}>
                            <PostForm onDataChange={setPostData} onValidityChange={setDisableButton} title="New post" />
                            <TouchableOpacity disabled={disableButton} style={disableButton ? styles.disabledButton : styles.button} onPress={createPost}>
                                <Text style={{ color: "white" }}>Create post</Text>
                            </TouchableOpacity>
                        </Card>
                    </ScrollView>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
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