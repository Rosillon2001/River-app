import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

export default function ProfileCard({ user }) {
    return (
        <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                    <Avatar rounded size="large" title={user.username.charAt(0)} source={{ uri: user.picture }} />
                    <Text style={{ fontSize: 24 }}>{user.name ? user.name : user.username}</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{user.email}</Text>
                    {user.location &&
                        <Text style={{ fontSize: 16, color: 'gray' }}>{user.location}</Text>
                    }
                </View>
                <View style={styles.statsView}>
                    <View style={styles.statView}>
                        <Text>Posts</Text>
                        <Text style={styles.statNumber}>10</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text>Reposts</Text>
                        <Text style={styles.statNumber}>5</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text>Followers</Text>
                        <Text style={styles.statNumber}>2</Text>
                    </View>
                </View>
            </View>
            {user.bio &&
                <View style={styles.bioView}>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>
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
        alignItems: 'baseline',
        justifyContent: 'space-around',
    },
    statView: {
        alignItems: 'center'
    },
    statNumber: {
        fontSize: 20
    }
})