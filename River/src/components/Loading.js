import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading({ activated }) {

    return (
        <Modal animationType="fade" transparent={true} visible={activated}>
            <View style={styles.modalView}>
                <ActivityIndicator animating={activated} hidesWhenStopped size="large" color="#38B6FF" />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})