import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { follow } from '../../redux/ducks/profile';
import UserList from '../../screens/modals/UserList';

export default function ProfileCard({ user }) {

    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.user.user)

    const [userListModal, setUserListModal] = useState(false);
    const [userListContent, setUserListContent] = useState(undefined);
    const [userListTitle, setUserListTitle] = useState(undefined);

    const openUserListModal = (type) => {
        if (type === "Followers") {
            setUserListTitle("Followers")
            setUserListContent(user.followerUsers)
        }
        else if (type === "Following") {
            setUserListTitle("Following")
            setUserListContent(user.followingUsers)
        }
        setUserListModal(true)
    }

    return (
        <>
            <UserList visible={userListModal} onModalClose={setUserListModal} users={userListContent} title={userListTitle} />
            <View style={styles.profileContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                        <Avatar containerStyle={{ borderWidth: 1, borderColor: '#cccccc' }} titleStyle={{ marginBottom: 5, color: 'gray' }} rounded size="large" title={user?.username.charAt(0)} source={user?.picture ? { uri: user?.picture } : null} />
                        <Text style={{ fontSize: 24 }}>{user?.name ? user?.name : user?.username}</Text>
                        <Text style={{ fontSize: 16, color: 'gray' }}>{user?.email}</Text>
                        {user?.location &&
                            <Text style={{ fontSize: 16, color: 'gray' }}>{user?.location}</Text>
                        }
                        <Text>Member since {user?.dateCreated}</Text>
                    </View>
                    <View style={styles.statsView}>
                        <View style={styles.statView}>
                            <Text>Posts</Text>
                            <Text style={styles.statNumber}>{user?.postsNumber}</Text>
                        </View>
                        <TouchableOpacity style={styles.statView} onPress={() => openUserListModal("Followers")}>
                            <Text>Followers</Text>
                            <Text style={styles.statNumber}>{user?.followers.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.statView} onPress={() => openUserListModal("Following")}>
                            <Text>Following</Text>
                            <Text style={styles.statNumber}>{user?.follows.length}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {user?.bio &&
                    <View style={styles.bioView}>
                        <Text style={styles.bioText}>{user.bio}</Text>
                    </View>
                }
                {userSelector?.id != user?.id &&
                    <TouchableOpacity style={styles.followButton} onPress={() => dispatch(follow(user?.id))}>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>{userSelector.follows.includes(user?.id) ? "Unfollow" : "Follow"}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        backgroundColor: 'white'
    },
    bioText: {
        color: 'gray',
        fontSize: 16
    },
    statsView: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-around',
    },
    statView: {
        alignItems: 'center'
    },
    statNumber: {
        fontSize: 20
    },
    followButton: {
        backgroundColor: '#5271FF',
        alignSelf: 'center',
        width: '25%',
        padding: 10,
        borderRadius: 25,
        marginTop: 10
    }
})