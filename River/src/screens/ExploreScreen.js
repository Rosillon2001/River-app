import React, { useState } from "react";
import { View } from 'react-native';
import ExploreSearchBar from "../components/explore/ExploreSearchBar";
import EmptySearch from "../components/explore/EmptySearch";
import SearchResults from "../components/explore/SearchResults";

export default function ExploreScreen() {

    const [searchData, setSearchData] = useState(null);

    return (
        <View>
            <ExploreSearchBar onDataSearch={setSearchData} />
            {searchData ?
                <SearchResults data={searchData} />
                :
                <EmptySearch />
            }
        </View>
    );
}