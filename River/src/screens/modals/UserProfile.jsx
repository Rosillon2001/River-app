import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, setProfile } from '../../redux/ducks/profile'
import Loading from '../../components/Loading';
import ModalContainer from '../../components/ModalContainer';
import ProfileCard from '../../components/cards/ProfileCard';
import PostCard from '../../components/cards/PostCard';


export default function UserProfile({ visible, onModalClose, id }) {

    const dispatch = useDispatch();
    const profileSelector = useSelector(state => state.profile)
    const user = useSelector(state => state.user.user)

    console.log(profileSelector)

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const closeModal = useCallback(() => {
        onModalClose(false)
    }, [onModalClose])

    useEffect(() => {
        if (visible) {
            setLoading(true)
            dispatch(setProfile(undefined))
            dispatch(getProfile(id))
        }
    }, [visible]);

    useEffect(() => {
        setLoading(false)
        setRefreshing(false)
    }, [profileSelector]);

    const refreshProfile = () => {
        setRefreshing(true)
        dispatch(getProfile(id))
    }

    return (
        <>
            <Loading activated={loading} />
            <ModalContainer
                visible={visible}
                onModalClose={closeModal}
                title="Profile"
                Component={
                    <>
                        <ScrollView refreshControl={<RefreshControl colors={['#5271FF', '#38B6FF', '#5CE1E6']} refreshing={refreshing} onRefresh={refreshProfile} />}>
                           <ProfileCard user={profileSelector.profile}/>
                           {profileSelector.posts?.length ? (
                                profileSelector.posts.map((post, index) => {
                                    return <PostCard key={index} post={post} />
                                })
                            ) :
                                <Text style={{ fontSize: 24, color: 'gray', alignSelf: 'center', margin: 20 }}>No Posts Yet!</Text>
                            }
                        </ScrollView>
                        
                    </>
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    noCommentsText: {
        alignSelf: 'center',
        fontSize: 24,
        color: 'gray',
        margin: 20
    }
})