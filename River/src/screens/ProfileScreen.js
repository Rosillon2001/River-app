import React, { useEffect, useState } from "react";
import { Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../components/Loading";
import { Card, Avatar } from "react-native-elements";
import { getUser, setUser } from "../redux/ducks/user";
import EditUser from "./modals/EditUser";

export default function ProfileScreen() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const user = useSelector(state => state.user.user);

    const [loading, setLoading] = useState(false)
    const [profileEditModal, setProfileEditModal] = useState(false);

    const logout = async () => {
        setLoading(true)
        await AsyncStorage.removeItem('TOKEN')
        dispatch(setUser(undefined))
        setLoading(false)
    }

    return (
        <View>
            <Loading activated={loading} />
            <EditUser visible={profileEditModal} onModalClose={setProfileEditModal} />

            <Card containerStyle={{ borderRadius: 25 }}>
                <Avatar rounded size="large" title={user?.username.charAt(0)} source={{ uri: user?.picture }} containerStyle={{ alignSelf: "center" }} />
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <Text style={{ fontSize: 24 }}>{user?.name ? user?.name : user?.username}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{user?.email}</Text>
                </View>
                <Card.Divider />
                <Button title="Manage account" onPress={() => { setProfileEditModal(true) }} />
                <Button title="Logout" onPress={logout} />
            </Card>
        </View>
    );
}