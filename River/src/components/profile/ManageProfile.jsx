import React, { useCallback, useState } from 'react'
import { BottomSheet, ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { setUser, setUserPosts } from '../../redux/ducks/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../Loading'
import EditUser from '../../screens/modals/EditUser'

export default function ManageProfile({ visible, onClose }) {

    // REDUX HOOKS
    const dispatch = useDispatch();

    // CALLBACK HOOK FOR CLOSING MANAGE PROFILE BOTTOM SHEET
    const closeBottomSheet = useCallback(() => {
        onClose(false)
    }, [onClose])

    const [loading, setLoading] = useState(false);
    const [profileEditModal, setProfileEditModal] = useState(false);

    const logout = async () => {
        closeBottomSheet()
        setLoading(true)
        await AsyncStorage.removeItem('TOKEN')
        dispatch(setUser(undefined))
        dispatch(setUserPosts(undefined))
        setLoading(false)
    }

    return (
        <>
            <Loading activated={loading} />
            <EditUser visible={profileEditModal} onModalClose={setProfileEditModal} />
            <BottomSheet isVisible={visible} containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
                <ListItem onPress={() => {setProfileEditModal(true); closeBottomSheet()}} containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <ListItem.Content>
                        <ListItem.Title>Edit profile</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem onPress={logout}>
                    <ListItem.Content>
                        <ListItem.Title>Logout</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem containerStyle={{ backgroundColor: 'red' }} onPress={() => closeBottomSheet()}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white' }}>Close</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </BottomSheet>
        </>
    )
}