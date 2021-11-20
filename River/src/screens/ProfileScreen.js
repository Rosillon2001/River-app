import React, { useEffect } from "react";
import { Text, View } from 'react-native';
import { useSelector } from "react-redux";

export default function ProfileScreen() {

    const user = useSelector(state => state.user);

    useEffect(() => {
        console.log(user)
    }, []);

    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
}