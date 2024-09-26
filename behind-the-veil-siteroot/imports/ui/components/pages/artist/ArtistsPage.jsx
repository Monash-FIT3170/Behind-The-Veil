/**
 * File Description: Artists page
 * File version: 1.1
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import URLSearchParams from "@ungap/url-search-params";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import ArtistCard from "../../card/ArtistCard";
import Pagination from "../../pagination/Pagination";
import SearchBar from "/imports/ui/components/searchBar/searchBar.jsx";
import Loader from "../../loader/Loader";
import {useUsers} from "../../DatabaseHelper";

/**
 * Page of a list of Artist cards for users to see
 */
export const ArtistsPage = () => {

    // default number of items on each page
    const [itemsPerPage, setItemsPerPage] = useState(25);

    // get artist data
    const userFilter = {"profile.type": "artist"}
    const {isLoading, usersData} = useUsers("all_artists", [], userFilter)

    // get any search parameters and filter
    let searchInput = new URLSearchParams(useLocation().search).get("search");
    searchInput = searchInput ? searchInput.trim() : ''

    // filter then map data into artist cards
    const displayedArtistJsx = usersData
        .filter((user) => {
            return user.profile.alias.toLowerCase().includes(searchInput.toLowerCase()) ||
                user.username.toLowerCase().includes(searchInput.toLowerCase())
        })
        .map((user) => (
            <ArtistCard
                key={user.username}
                artistUsername={user.username}
                artistAlias={user.profile.alias}
                artistProfileImageData={user.profile.profileImage ? user.profile.profileImage.imageData : user.profile.profileImage}/>)
        )

    // checks if the page and data has loaded
    if (document.readyState === "complete" && !isLoading) {

        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <span className={"title-text text-center"}>Artists</span>

                <div className="flex flex-col items-center mb-10">
                    <SearchBar placeholder={"Search artist name or username"}
                               defaultType={"artists"}
                               startingValue={searchInput}
                               suggestionsDown={true}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-y-5">

                    <Pagination
                        reset={false}
                        itemsPerPage={itemsPerPage}
                        displayItems={displayedArtistJsx}
                    />

                    <div className="flex flex-row items-center justify-center gap-x-2">
                        Items per page:
                        <select defaultValue={25} onChange={(event) => {
                            setItemsPerPage(event.target.value)
                        }} className="input-base w-20">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </WhiteBackground>
        );
    } else {
        // is loading, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <span className={"title-text text-center"}>Artists</span>

                <Loader
                    loadingText={"Artists are loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );
    }
};

export default ArtistsPage;