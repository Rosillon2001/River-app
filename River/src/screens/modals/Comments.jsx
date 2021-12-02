import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments, setComments } from '../../redux/ducks/comment';
import Loading from '../../components/Loading';
import ModalContainer from '../../components/ModalContainer';
import CommentCard from '../../components/comments/CommentCard';
import CommentInput from '../../components/comments/CommentInput';

export default function Comments({ visible, onModalClose, post }) {

    const dispatch = useDispatch();
    const commentSelector = useSelector(state => state.comment)
    const user = useSelector(state => state.user.user)

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    useEffect(() => {
        if (visible) {
            setLoading(true)
            dispatch(getPostComments(post.id))
        } else {
            dispatch(setComments(undefined))
        }
    }, [visible]);

    useEffect(() => {
        setLoading(false)
        setRefreshing(false)
    }, [commentSelector]);

    const refreshComments = () => {
        setRefreshing(true)
        dispatch(getPostComments(post.id))
    }

    return (
        <>
            <Loading activated={loading} />
            <ModalContainer
                visible={visible}
                onModalClose={closeModal}
                title="Comments"
                Component={
                    <>
                        <ScrollView refreshControl={<RefreshControl colors={['#5271FF', '#38B6FF', '#5CE1E6']} refreshing={refreshing} onRefresh={refreshComments} />}>
                            {commentSelector.comments?.length ?
                                commentSelector.comments.map((comment, index) => {
                                    return (
                                        <CommentCard key={index} comment={comment} user={user} />
                                    )
                                })
                                :
                                <Text style={styles.noCommentsText}>No comments yet</Text>
                            }
                        </ScrollView>
                        <CommentInput postID={post.id} />
                    </>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    noCommentsText: {
        alignSelf: 'center',
        fontSize: 24,
        color: 'gray',
        margin: 20
    }
})