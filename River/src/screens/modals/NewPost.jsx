import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, ToastAndroid, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../../components/Loading';
import ModalContainer from '../../components/ModalContainer';
import PostForm from '../../components/PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/ducks/post';
import { getPosts } from '../../redux/ducks/post';
import { getUserPosts } from '../../redux/ducks/user';

export default function NewPost({ visible, onModalClose }) {

    const dispatch = useDispatch();
    const postSelector = useSelector(state => state.post)

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    const [loading, setLoading] = useState(false)

    // POST HOOKS
    const [disableButton, setDisableButton] = useState(true);
    const [postData, setPostData] = useState(null);

    const createNewPost = async () => {
        setLoading(true)
        // BUILD FORMDATA
        const formData = new FormData()
        formData.append('postText', postData.postText)
        if (postData.pictures && Platform.OS !== 'web') {
            postData.pictures.map((picture, index) => {
                let fileType = picture.substring(picture.lastIndexOf(".") + 1);
                formData.append('images', { uri: picture, name: `photo-${index}.${fileType}`, type: `image/${fileType}` })
            })
        }
        // DISPATCH CREATION ACTION
        dispatch(createPost(formData))
    }

    useEffect(() => {
        if (postSelector.status && loading) {
            setLoading(false)
            ToastAndroid.show(postSelector.message, ToastAndroid.LONG)
            if (postSelector.status === 200) {
                closeModal();
                dispatch(getPosts())
                dispatch(getUserPosts())
            }
        }
    }, [postSelector])

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
                            <TouchableOpacity disabled={disableButton} style={disableButton ? styles.disabledButton : styles.button} onPress={createNewPost}>
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