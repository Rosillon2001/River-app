import React, { useEffect } from "react";
import { Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { getUser, getUserPosts } from "../redux/ducks/user";
import ProfileCard from "../components/cards/ProfileCard";
import PostCard from '../components/cards/PostCard'

export default function ProfileScreen() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getUserPosts())
    }, [])

    const user = useSelector(state => state.user);

    return (
        <ScrollView>
            <ProfileCard user={user?.user} />
            {user.posts?.length ? (
                user.posts.map((post, index) => {
                    return <PostCard key={index} post={post} />
                })
            ) :
                <Text style={{ fontSize: 24, color: 'gray', alignSelf: 'center', margin: 20 }}>No Posts Yet!</Text>
            }
        </ScrollView>
    );
}