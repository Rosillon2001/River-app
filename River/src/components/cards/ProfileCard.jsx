import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { follow } from '../../redux/ducks/profile';

export default function ProfileCard({ user }) {

    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.user.user)

    return (
        <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                    <Avatar containerStyle={{ borderWidth: 1, borderColor: '#cccccc' }} titleStyle={{ marginBottom: 5, color: 'gray' }} rounded size="large" title={user?.username.charAt(0)} source={ user?.picture ? { uri: user?.picture } : null} />
                    <Text style={{ fontSize: 24 }}>{user?.name ? user?.name : user?.username}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{user?.email}</Text>
                    {user?.location &&
                        <Text style={{ fontSize: 16, color: 'gray' }}>{user?.location}</Text>
                    }
                </View>
                <View style={styles.statsView}>
                    <View style={styles.statView}>
                        <Text>Posts</Text>
                        <Text style={styles.statNumber}>{user?.postsNumber}</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text>Followers</Text>
                        <Text style={styles.statNumber}>{user?.followers.length}</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text>Following</Text>
                        <Text style={styles.statNumber}>{user?.follows.length}</Text>
                    </View>
                </View>
            </View>
            {user?.bio &&
                <View style={styles.bioView}>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>
            }
            {userSelector?.id != user?.id && 
                <TouchableOpacity style={styles.followButton} onPress={() => dispatch(follow(user?.id))}>
                    <Text style={{alignSelf:'center', color:'white'}}>{userSelector.follows.includes(user?.id) ? "Unfollow" : "Follow"}</Text>
                </TouchableOpacity>
            }
        </View>
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
    bioView: {
        marginTop: 5
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