import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements';
import ImageInput from "../components/ImageInput";

export default function PostForm({ onValidityChange, onDataChange, title, post }) {

    const changeFormValidity = useCallback((state) => {
        onValidityChange(state)
    }, [onValidityChange])

    const changeFormData = useCallback((data) => {
        onDataChange(data)
    }, [onDataChange])

    // FORM FIELD HOOKS
    const [postText, setPostText] = useState(post ? post.postText : "");
    const [picture, setPicture] = useState(post ? post.picture : null);
    const [characterCounter, setCharacterCounter] = useState(0);

    // USE EFFECT FOR ENABLING/DISABLING POST CREATION/EDIT BUTTON AND CHANGING TEXT CHARACTERS
    useEffect(() => {
        if (postText != "" && postText.length <= 140) {
            changeFormValidity(false)   //DISABLED BUTTON: FALSE
        } else {
            changeFormValidity(true)    //DISABLED BUTTON: TRUE
        }
        setCharacterCounter(postText.length)
    }, [postText])

    // USE EFFECT FOR CHANGING FORM DATA VALUES
    useEffect(() => {
        const data = {
            postText,
            picture
        }
        changeFormData(data)
    }, [postText, picture])

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textLable}>Post content</Text>
            <TextInput
                style={styles.inputText}
                multiline={true}
                numberOfLines={10}
                maxLength={140}
                placeholder="Post text"
                placeholderTextColor="gray"
                onChangeText={text => setPostText(text)}
            />
            <Text style={styles.characterCounter}>{characterCounter}/140</Text>
            {picture &&
                <>
                    <Text style={styles.textLable}>Picture</Text>
                    <Card containerStyle={styles.previewCard}>
                        <Image source={{ uri: picture }} style={styles.imagePreview} />
                        <TouchableOpacity style={styles.button} onPress={() => { setPicture(null) }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Remove</Text>
                        </TouchableOpacity>
                    </Card>
                </>
            }
            <ImageInput onImageSelected={setPicture} text="Select post picture" />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "gray",
        textAlign: "center",
        marginBottom: 20
    },
    textLable: {
        color: 'gray',
        marginLeft: 20,
    },
    inputText: {
        height: 150,
        textAlignVertical: 'top',
        color: "black",
        margin: 10,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        padding: 12,
        fontSize: 16
    },
    characterCounter: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
        color: 'gray'
    },
    previewCard: {
        alignSelf: "center",
        marginBottom: 25,
        backgroundColor: "#cccccc",
        borderRadius: 25,
        borderWidth: 0
    },
    imagePreview: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        borderRadius: 12.5
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 25,
        padding: 10,
        width: "50%",
        backgroundColor: "#eb445a"
    }
})