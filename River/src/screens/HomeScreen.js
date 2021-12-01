import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-elements';

import { useDispatch } from "react-redux";
import { getUser } from "../redux/ducks/user";
import { getPosts } from "../redux/ducks/post"
import { useSelector } from "react-redux";
import HomePosts from "../components/homepage/HomePosts";

import NewPost from "./modals/NewPost";

export default function HomeScreen() {

    const dispatch = useDispatch();
    const postsData = useSelector(state => state.post.data)
    const [newPostModal, setNewPostModal] = useState(false)

    useEffect(() => {
        dispatch(getUser())
        dispatch(getPosts())
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <HomePosts totalPosts={postsData?.totalPosts}/>
            <FAB icon={{ name: 'add', color: 'white' }} color="#5271FF" placement="right" onPress={() => { setNewPostModal(true) }} />
            <NewPost visible={newPostModal} onModalClose={setNewPostModal} />
        </View>
    );
}