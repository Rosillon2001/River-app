import React from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Avatar, Image } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

export default function PostCard({ post }) {

    const user = useSelector(state => state.user.user);

    const openUserProfile = () => {
        console.log('Open this profile:', post.userID)
    }

    const deletePost = () => {
        console.log('delete post', post.id);
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
            {/* USER'S DATA SECTION */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems:'center' }} onPress={openUserProfile}>
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
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={deletePost}>
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
                    <TouchableOpacity disabled onPress={openComments}>
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
        margin: 20,
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