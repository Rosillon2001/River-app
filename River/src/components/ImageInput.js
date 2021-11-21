import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageInput({ onImageSelected }) {

    const changeImageSelected = useCallback((state) => {
        onImageSelected(state)
    }, [onImageSelected])

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            changeImageSelected(result.uri);
        }
    };

    return (
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={{ color: "gray" }}>Upload profile picture</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    uploadButton: {
        alignItems: "center",
        justifyContent: 'center',
        height: 50,
        color: "black",
        margin: 10,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: 10
    }
})