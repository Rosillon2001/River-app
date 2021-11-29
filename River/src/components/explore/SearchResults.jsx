import React from "react";
import { Text, ScrollView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserCard from "../cards/UserCard";
import PostCard from "../cards/PostCard";

export default function SearchResults({ data }) {

    const Tab = createMaterialTopTabNavigator();

    return (
        <>
            <Tab.Navigator keyboardDismissMode='none'>
                <Tab.Screen name="Users" component={Users} />
                <Tab.Screen name="Posts" component={Posts} />
            </Tab.Navigator>
        </>
    );

    function Users() {
        return (
            <ScrollView>
                {data.users.length ? (
                    data.users.map((user, index) => {
                        return <UserCard key={index} user={user} />
                    })
                ) :
                    <Text style={styles.noResults}>No users were found</Text>
                }
            </ScrollView>

        );
    }

    function Posts() {
        return (
            <ScrollView>
                {data.posts.length ? (
                    data.posts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })
                ) :
                    <Text style={styles.noResults}>No posts were found</Text>
                }
            </ScrollView>
        );
    }

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