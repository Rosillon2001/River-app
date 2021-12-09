import React, { useCallback } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import ModalContainer from '../../components/ModalContainer'
import UserCard from '../../components/cards/UserCard'

export default function UserList({ visible, onModalClose, users, title }) {

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    return (
        <ModalContainer
            visible={visible}
            onModalClose={closeModal}
            title={title}
            Component={
                <ScrollView style={{ backgroundColor: '#eeeeee' }}>
                    {users?.length ? (
                        users.map((user, index) => {
                            return <UserCard key={index} user={user} />
                        }))
                        :
                        <Text style={styles.empty}>No {title?.toLowerCase()} around here...</Text>
                    }
                </ScrollView>
            }
        />
    )
}

const styles = StyleSheet.create({
    empty: {
        fontSize: 24,
        color: 'gray',
        alignSelf: 'center',
        margin: 20
    }
})