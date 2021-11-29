import React from "react";
import ExploreSearchBar from "../components/explore/ExploreSearchBar";
import EmptySearch from "../components/explore/EmptySearch";
import SearchResults from "../components/explore/SearchResults";
import { useSelector } from "react-redux";

export default function ExploreScreen() {

    const searchData = useSelector(state => state.search.data)

    return (
        <>
            <ExploreSearchBar />
            {searchData ?
                <SearchResults data={searchData} />
                :
                <EmptySearch />
            }
        </>
    );
}