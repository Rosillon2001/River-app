import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments, createComment } from '../../redux/ducks/comment';
import Loading from '../Loading';

export default function CommentInput({ postID }) {

    // REDUX HOOKS
    const dispatch = useDispatch();
    const commentSelector = useSelector(state => state.comment)

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)

    const performCreateComment = () => {
        setContent("")
        setLoading(true)
        dispatch(createComment(postID, content))
    }

    useEffect(() => {
        if (commentSelector.status && loading) {
            setLoading(false)
            ToastAndroid.show(commentSelector.message, ToastAndroid.LONG)
            if (commentSelector.status === 200) {
                dispatch(getPostComments(postID))
            }
        }
    }, [commentSelector]);

    return (
        <>
            <Loading activated={loading} />
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'lightgray' }}>
                    <TextInput placeholder="Comment" value={content} onChangeText={setContent} style={styles.textInput} />
                    <TouchableOpacity disabled={content == "" || content.length > 140 ? true : false} style={styles.postButton} onPress={performCreateComment}>
                        <Ionicons name="arrow-forward" size={32} color={content == "" || content.length > 140 ? "darkgray" : "#5271FF"} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgray'
    },
    textInput: {
        width: '85%',
        height: 50,
        padding: 10
    },
    postButton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})