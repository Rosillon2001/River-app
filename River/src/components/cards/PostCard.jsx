import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { Card, Avatar, Image } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../Loading";
import { performSearch } from "../../redux/ducks/search";

export default function PostCard({ post }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const searchKeyword = useSelector(state => state.search.keyword);

    const [loading, setLoading] = useState(false);

    const openUserProfile = () => {
        console.log('Open this profile:', post.userID)
    }

    const confirmPostDeletion = () => {

        // DELETE FUNCTION (API CALL)
        const deletePost = async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem('TOKEN')
            axios.delete(`https://app-river.herokuapp.com/post/${post.id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(async (response) => {
                    if (response.status === 200) {
                        dispatch(performSearch(searchKeyword))
                        setLoading(false)
                        ToastAndroid.show(response.data.message, ToastAndroid.LONG);
                    }
                })
                .catch(error => {
                    setLoading(false)
                    ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
                });
        }

        // CONFIRMATION ALERT
        Alert.alert(
            "Delete this post?",
            "This action cannot be undone.",
            [
                {
                    text: "OK",
                    onPress: deletePost,
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

    const likePost = () => {
        console.log('Like this post:', post.id)
    }

    const repost = () => {
        console.log('Repost this:', post.id)
    }

    const openComments = () => {
        console.log('Open post comments:', post.id)
    }

    return (
        <Card containerStyle={styles.card}>
            <Loading activated={loading} />
            {/* USER'S DATA SECTION */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openUserProfile}>
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
                    <TouchableOpacity onPress={likePost} style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Ionicons name="heart-outline" size={24} color="gray" />
                        <Text style={{ color: 'gray' }}>{post.likes.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={user.id === post.userID ? true : false} onPress={repost} style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Ionicons name="arrow-redo-outline" size={24} color="gray" />
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