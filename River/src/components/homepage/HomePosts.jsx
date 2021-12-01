import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/ducks/post";
import PostCard from "../cards/PostCard";

export default function HomePosts({ totalPosts }) {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts)

    const [refreshing, setRefreshing] = useState(false);

    const refreshPosts = () => {
        dispatch(getPosts());
    }

    useEffect(() => {
        setRefreshing(false)
    },[posts])

    return (
        <>
            <ScrollView refreshControl={<RefreshControl colors={['#5271FF', '#38B6FF', '#5CE1E6']} refreshing={refreshing} onRefresh={refreshPosts} />}>
            {totalPosts?.length ? (
                    totalPosts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })
                ) :
                    <Text style = {{fontSize: 24, color: 'gray', alignSelf: 'center',margin: 20}}>No Posts Yet!</Text>
                }
            </ScrollView>
        </>
    )

}
