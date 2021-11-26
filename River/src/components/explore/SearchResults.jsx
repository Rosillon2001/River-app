import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserCard from "../cards/UserCard";
import PostCard from "../cards/PostCard";

export default function SearchResults({ data }) {

    const [showUsers, setShowUsers] = useState(true);
    const [showPosts, setShowPosts] = useState(true);

    return (
        <ScrollView style={{marginBottom: 65}}>
            {/* USERS TOGGLE */}
            <TouchableOpacity style={styles.toggle} activeOpacity={1} onPress={() => { setShowUsers(!showUsers) }}>
                <Ionicons name={showUsers ? 'chevron-up' : 'chevron-down'} size={20} color='gray' />
                <Text style={{ color: 'gray' }}>Users</Text>
            </TouchableOpacity>
            {/* USER SEARCH RESULTS */}
            <View style={!showUsers && { display: 'none' }}>
                {data.users.length ? (
                    data.users.map((user, index) => {
                        return <UserCard key={index} user={user} />
                    })
                ) :
                    <Text style={styles.noResults}>No users were found</Text>
                }
            </View>

            {/* POSTS TOGGLE */}
            <TouchableOpacity style={styles.toggle} activeOpacity={1} onPress={() => { setShowPosts(!showPosts) }}>
                <Ionicons name={showPosts ? 'chevron-up' : 'chevron-down'} size={20} color='gray' />
                <Text style={{ color: 'gray' }}>Posts</Text>
            </TouchableOpacity>
            {/* POST SEARCH RESULTS */}
            <View style={!showPosts && { display: 'none' }}>
                {data.posts.length ? (
                    data.posts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })
                ) :
                    <Text style={styles.noResults}>No posts were found</Text>
                }
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    toggle: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 15,
        marginBottom: 0,
        height: 30
    },
    noResults: {
        fontSize: 24,
        color: 'gray',
        alignSelf: 'center',
        margin: 20
    }
})