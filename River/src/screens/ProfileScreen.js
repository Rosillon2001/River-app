import React, { useEffect, useState } from "react";
import { Text, View, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "../components/Loading";
import { Card, Avatar } from "react-native-elements";
import { getUser, getUserPosts, setUser } from "../redux/ducks/user";
import EditUser from "./modals/EditUser";
import PostCard from '../components/cards/PostCard'

export default function ProfileScreen() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getUserPosts())
    }, [])

    const user = useSelector(state => state.user);

    const [loading, setLoading] = useState(false)
    const [profileEditModal, setProfileEditModal] = useState(false);

    const logout = async () => {
        setLoading(true)
        await AsyncStorage.removeItem('TOKEN')
        dispatch(setUser(undefined))
        setLoading(false)
    }

    return (
        <ScrollView>
            <Loading activated={loading} />
            <EditUser visible={profileEditModal} onModalClose={setProfileEditModal} />

            <Card containerStyle={{ borderRadius: 25 }}>
                <Avatar rounded size="large" title={user?.user.username.charAt(0)} source={{ uri: user?.user.picture }} containerStyle={{ alignSelf: "center" }} />
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <Text style={{ fontSize: 24 }}>{user?.user.name ? user?.user.name : user?.user.username}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{user?.user.email}</Text>
                </View>
                <Card.Divider />
                <Button title="Manage account" onPress={() => { setProfileEditModal(true) }} />
                <Button title="Logout" onPress={logout} />
            </Card>

            {user.posts?.length ? (
                user.posts.map((post, index) => {
                    return <PostCard key={index} post={post} />
                })
            ) :
                <Text style = {{fontSize: 24, color: 'gray', alignSelf: 'center',margin: 20}}>No Posts Yet!</Text>
            }

        </ScrollView>
    );
}