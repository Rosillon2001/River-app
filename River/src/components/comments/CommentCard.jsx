import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, ToastAndroid, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getPostComments } from '../../redux/ducks/comment';
import Loading from '../Loading';

export default function CommentCard({ comment, user }) {

    // REDUX HOOKS
    const dispatch = useDispatch();
    const commentSelector = useSelector(state => state.comment)

    const [loading, setLoading] = useState(false);

    const confirmDeleteComment = () => {
        Alert.alert(
            "Delete this comment?",
            "This action cannot be undone.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setLoading(true)
                        dispatch(deleteComment(comment.id))
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

    useEffect(() => {
        if (commentSelector.status && loading) {
            setLoading(false)
            ToastAndroid.show(commentSelector.message, ToastAndroid.LONG)
            if (commentSelector.status === 200) {
                dispatch(getPostComments(comment.postID))
            }
        }
    }, [commentSelector]);

    const getRefactoredDate = (date) => {
        const postDate = new Date(date)
        const hour = ((postDate.getUTCHours() + 20) % 12 || 12)
        const minutes = postDate.getUTCMinutes().toString().length == 1 ? '0' + postDate.getUTCMinutes() : postDate.getUTCMinutes()
        let period;
        if(hour <= 12){
            period = 'PM'
        }else{
            period = 'AM'
        }

        return (postDate.toDateString() + ", " + hour + ':' + minutes + " " + period)
    }

    return (
        <>
            <Loading activated={loading} />
            <Card containerStyle={styles.commentCard}>
                <View style={styles.userView}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar size='small' rounded title={"a"} source={{ uri: comment.picture }} />
                        <Text style={{ color: 'gray', marginLeft: 10 }}>{comment.username}</Text>
                    </TouchableOpacity>
                    {comment.userID == user.id &&
                        <TouchableOpacity onPress={confirmDeleteComment}>
                            <Ionicons name="trash-bin-outline" size={24} color="gray" />
                        </TouchableOpacity>
                    }
                </View>
                <Text style={styles.textContent}>{comment.content}</Text>
                <Text style={styles.dateText}>{getRefactoredDate(comment.dateCreated)}</Text>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    commentCard: {
        margin: 10,
        padding: 10,
        borderRadius: 25,
        shadowColor: 'transparent',
    },
    textContent: {
        margin: 5,
    },
    userView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateText: {
        marginTop: 5,
        alignSelf: "flex-end",
        color: '#aaaaaa',
        fontSize: 12
    }
})