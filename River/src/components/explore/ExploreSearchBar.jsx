import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { performSearch } from '../../redux/ducks/search';

export default function ExploreSearchBar() {

    // REDUX HOOKS 
    const dispatch = useDispatch();
    const searchSelector = useSelector(state => state.search)

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        dispatch(performSearch(keyword))
    }, [keyword])

    useEffect(() => {
        setLoading(false)
    }, [searchSelector])

    return (
        <SearchBar
            placeholder="Search"
            onChangeText={setKeyword}
            value={keyword}
            showLoading
            loadingProps={{
                animating: loading,
                color: "#38B6FF",
            }}
            platform="android"
        />
    );
}