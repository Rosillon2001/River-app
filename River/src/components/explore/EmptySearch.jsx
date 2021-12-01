import React from "react";
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from "react-native-elements";

export default function EmptySearch() {
    return (
        <ScrollView>
            <Card containerStyle={styles.card}>
                <Card.Image style={styles.cardImage} source={require('../../../assets/images/user-asset.png')} />
                <Text style={styles.cardText}>Find users</Text>
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Image style={styles.cardImage} source={require('../../../assets/images/post-asset.png')} />
                <Text style={styles.cardText}>Search posts</Text>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        borderWidth: 0,
        shadowColor: 'transparent',
        margin: 20,
        padding: 20,
    },
    cardImage:{
        resizeMode: "contain",
        height: 175,
    },
    cardText: {
        color: 'gray',
        fontSize: 24,
        alignSelf: 'center',
        marginTop: 15
    }
})