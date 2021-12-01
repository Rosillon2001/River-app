import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Avatar } from "react-native-elements";

export default function UserCard({ user }) {

    const openUserProfile = () => {
        console.log('Open this profile:', user.id)
    }

    const followUser = () => {
        console.log('follow user', user.id);
    }

    return (
        <Card containerStyle={styles.card}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={openUserProfile}>
                {/* USER'S PROFILE PICTURE */}
                <Avatar size='medium' rounded title={user.username.charAt(0)} source={{ uri: user.picture }} />
                <View style={{ flexDirection: 'column' }}>
                    {/* USER'S NAME (IF IT HAS) NEXT TO USERNAME */}
                    <View style={{ flexDirection: 'row' }}>
                        {user.name && <Text style={styles.name}>{user.name}</Text>}
                        <Text style={styles.username}>{user.username}</Text>
                    </View>
                    {/* USER'S BIO BELOW NAME AND USERNAME */}
                    {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
                </View>
                {/* FOLLOW BUTTON */}
                <TouchableOpacity style={styles.followButton} onPress={followUser}>
                    <Text style={{ color: 'white' }}>Follow</Text>
                </TouchableOpacity>
            </TouchableOpacity>
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
        width: '90%',
        alignSelf: 'center',
        height: 75,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        marginLeft: 10
    },
    username: {
        color: 'gray',
        fontSize: 18,
        marginLeft: 10
    },
    bio: {
        color: 'gray',
        fontSize: 16,
        marginLeft: 10
    },
    followButton: {
        marginLeft: 'auto',
        backgroundColor: '#38B6FF',
        borderRadius: 25,
        padding: 5
    }
})