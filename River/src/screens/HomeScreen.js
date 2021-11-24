import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from 'react-native';
import { FAB } from 'react-native-elements';

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/ducks/user";

import ModalContainer from "../components/ModalContainer";

export default function HomeScreen() {

    const dispatch = useDispatch();

    const [postModal, setPostModal] = useState(false)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    // const user = useSelector(state => state.user.user);
    // console.log(user);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text>Home</Text>
            </ScrollView>
            <FAB icon={{ name: 'add', color: 'white' }} color="#5271FF" placement="right" onPress={() => { setPostModal(true) }} />
            <ModalContainer visible={postModal} onModalClose={setPostModal} />
        </View>
    );
}