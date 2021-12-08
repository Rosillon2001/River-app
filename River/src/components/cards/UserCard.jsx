import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Avatar } from "react-native-elements";
import UserProfile from "../../screens/modals/UserProfile";

export default function UserCard({ user }) {

    const userSelector = useSelector(state => state.user.user)

    const [profileModal, setProfileModal] = useState(false);

    const followUser = () => {
        console.log('follow user', user.id);
    }

    return (
        <>
            <UserProfile visible={profileModal} onModalClose={setProfileModal} id={user.id}/>
            <Card containerStyle={styles.card}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setProfileModal(true)}>
                    {/* USER'S PROFILE PICTURE */}
                    <Avatar size='medium' rounded title={user.username.charAt(0)} source={{ uri: user.picture }} />
                    <View style={{ flexDirection: 'column' }}>
                        {/* USER'S NAME (IF IT HAS) NEXT TO USERNAME */}
                        <View style={{ flexDirection: 'row' }}>
                            {user.name && <Text style={styles.name}>{user.name}</Text>}
                            <Text style={styles.username}>{user.username}</Text>
                        </View>
                        {/* USER'S BIO BELOW NAME AND USERNAME */}
                        {/* {user.bio && <Text style={styles.bio}>{user.bio}</Text>} */}
                    </View>
                    {/* FOLLOW BUTTON */}
                    {userSelector?.id != user.id &&
                        <TouchableOpacity style={styles.followButton} onPress={followUser}>
                        <Text style={{ color: 'white' }}>{userSelector.follows.includes(user.id) ? 'Unfollow' : 'Follow'}</Text>
                    </TouchableOpacity>
                    }
                </TouchableOpacity>
            </Card>
        </>
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