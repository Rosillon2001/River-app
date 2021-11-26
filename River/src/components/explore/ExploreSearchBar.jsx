import React, { useState, useEffect, useCallback } from 'react';
import { ToastAndroid } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

export default function ExploreSearchBar({ onDataSearch }) {

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const changeSearchData = useCallback((data) => {
        onDataSearch(data)
    }, [onDataSearch])

    useEffect(() => {
        if (keyword != "") {
            setLoading(true)
            axios.get(`https://app-river.herokuapp.com/search/${keyword}`)
                .then(async (response) => {
                    data = {
                        users: response.data.users,
                        posts: response.data.posts
                    }
                    console.log(data.posts);
                    changeSearchData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response.data);
                    setLoading(false)
                    ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
                });
        }else{
            changeSearchData(null)
        }
    }, [keyword])

    return (
        <SearchBar
            placeholder="Search"
            onChangeText={setKeyword}
            value={keyword}
            onCancel={() => {
                if(!keyword){
                    changeSearchData(null)
                }
            }}
            showLoading
            loadingProps={{
                animating: loading,
                color: "#38B6FF",
            }}
            platform="android"
        />
    );
}