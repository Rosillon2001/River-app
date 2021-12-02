import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { Card, Avatar, Image } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import Comments from "../../screens/modals/Comments";
import { performSearch } from "../../redux/ducks/search";
import { getPosts, deletePost, likePost, repost } from "../../redux/ducks/post";
import { getUserPosts } from "../../redux/ducks/user";

export default function PostCard({ post }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const searchKeyword = useSelector(state => state.search.keyword);
    const postSelector = useSelector(state => state.post)

    const [loading, setLoading] = useState(false);
    const [commentsModal, setCommentsModal] = useState(false);

    const openUserProfile = (userID) => {
        console.log('Open this profile:', userID)
    }

    const confirmPostDeletion = () => {
        // CONFIRMATION ALERT
        Alert.alert(
            "Delete this post?",
            "This action cannot be undone.",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setLoading(true)
                        dispatch(deletePost(post.id))
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
        if (postSelector.status && loading) {
            setLoading(false)
            ToastAndroid.show(postSelector.message, ToastAndroid.LONG)
            if (postSelector.status === 200) {
                dispatch(performSearch(searchKeyword))
                dispatch(getPosts())
                dispatch(getUserPosts())
            }
        }
    }, [postSelector])

    const performLikePost = () => {
        setLoading(true)
        dispatch(likePost(post.id))
    }

    const performRepost = () => {
        setLoading(true)
        dispatch(repost(post.id))
    }

    const openComments = () => {
        setCommentsModal(true)
    }

    return (
        <Card containerStyle={styles.card}>
            <Loading activated={loading} />
            <Comments visible={commentsModal} onModalClose={setCommentsModal} post={post} />
            {/* REPOST INFORMATION */}
            {post.type == 'repost' && 
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' , marginBottom: 8, marginLeft: 5}} onPress={() => openUserProfile(post.reposterID)}>
                    <Ionicons name="arrow-redo" size={14} color="gray" style={{marginRight:3}}/>
                    <Text style={{color:'gray'}}>{post.reposterUsername} reposteando</Text>
                </TouchableOpacity>
            }
            {/* USER'S DATA SECTION */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => openUserProfile(post.userID)}>
                    {/* USER'S PROFILE PICTURE */}
                    <Avatar size='small' rounded title={post.username.charAt(0)} source={{ uri: post.picture }} />
                    {/* USER'S NAME (IF IT HAS) NEXT TO USERNAME */}
                    <View style={{ flexDirection: 'row' }}>
                        {post.name && <Text style={styles.name}>{post.name}</Text>}
                        <Text style={styles.username}>{post.username}</Text>
                    </View>
                </TouchableOpacity>
                {/* DELETE POST BUTTON IF OWNER */}
                {user.id === post.userID &&
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={confirmPostDeletion}>
                        <Ionicons name="trash-bin-outline" size={24} color="gray" />
                    </TouchableOpacity>
                }
            </View>
            {/* POST CONTENT SECTION */}
            <View style={styles.postContent}>
                {/* POST TEXT */}
                <Text style={styles.postText}>{post.text}</Text>
                {/* POST IMAGES */}
                {post.images?.length &&
                    <ScrollView horizontal={post.images?.length > 1 ? true : false}>{
                        post.images.map((image, index) => {
                            return <Image key={index} source={{ uri: image }} containerStyle={styles.postImage} PlaceholderContent={<ActivityIndicator animating size="large" color="#38B6FF" />} />
                        })
                    }</ScrollView>
                }
                {/* POST ACTION SECTION (LINE, REPOST, COMMENTS) */}
                <View style={styles.actionView}>
                    <TouchableOpacity onPress={performLikePost} style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Ionicons name={post.likes.includes(user.id) ? "heart" : "heart-outline"} size={24} color={post.likes.includes(user.id) ? "#ed576b" : "gray"} />
                        <Text style={{ color: 'gray' }}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={user.id === post.userID ? true : false} onPress={performRepost} style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Ionicons name={post.reposters.includes(user.id) ? "arrow-redo" : "arrow-redo-outline"} size={24} color="gray" />
                        <Text style={{ color: 'gray' }}>{post.repostNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openComments}>
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        borderWidth: 0,
        shadowColor: 'transparent',
        marginBottom: 10,
        padding: 15,
        paddingBottom: 0,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 14,
        marginLeft: 10
    },
    username: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 10
    },
    postContent: {
        margin: 10,
    },
    postText: {
        fontSize: 18
    },
    postImage: {
        alignSelf: 'center',
        borderRadius: 12.5,
        width: 200,
        height: 200,
        margin: 10,
        marginBottom: 0
    },
    actionView: {
        marginTop: 15,
        paddingTop: 5,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})