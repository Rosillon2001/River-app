import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-elements';

import { useDispatch } from "react-redux";
import { getUser } from "../redux/ducks/user";

import NewPost from "./modals/NewPost";

export default function HomeScreen() {

    const dispatch = useDispatch();

    const [newPostModal, setNewPostModal] = useState(false)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text>Home</Text>
            </ScrollView>
            <FAB icon={{ name: 'add', color: 'white' }} color="#5271FF" placement="right" onPress={() => { setNewPostModal(true) }} />
            <NewPost visible={newPostModal} onModalClose={setNewPostModal} />
        </View>
    );
}