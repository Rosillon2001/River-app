import React, { useCallback } from 'react';
import { View, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalContainer({ visible, onModalClose, title, Component }) {

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="close-outline" size={40} color="black" onPress={closeModal} style={{ margin: 10 }} />
                <Text style={{ fontSize: 24 }}>{title}</Text>
            </View>
            <>
                {Component}
            </>
        </Modal>
    );
}