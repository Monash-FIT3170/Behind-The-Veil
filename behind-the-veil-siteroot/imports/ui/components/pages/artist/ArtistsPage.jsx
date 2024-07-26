/**
 * File Description: Artists page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import PageLayout from "../../../enums/PageLayout";
import UserCollection from "../../../../api/collections/users";
import ImageCollection from "../../../../api/collections/images";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import ArtistCard from "../../card/ArtistCard";
import Pagination from "../../pagination/Pagination";
import SearchBar from "/imports/ui/components/searchBar/searchBar.jsx";
import Loader from "../../loader/Loader";

/**
 * Page of a list of Artist cards for users to see
 */
export const ArtistsPage = () => {

    // default number of items on each page
    const [itemsPerPage, setItemsPerPage] = useState(25);

    // set up subscription (publication is in the "publication" folder)
    const isLoadingArtists = useSubscribe('all_artists');
    const isLoadingImages = useSubscribe('profile_images');
    const isLoading = isLoadingArtists() || isLoadingImages();

    // get data from db
    let usersData = useTracker(() => {
        return UserCollection.find({"profile.type": "artist"}).fetch();
    });
    let imagesData = useTracker(() => {
        return ImageCollection.find({"imageType": "profile"}).fetch();
    });


    // manual aggregation into serviceData with its artist and images
    for (let i = 0; i < usersData.length; i++) {

        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the artist
            if (imagesData[j].imageType === "profile" && usersData[i].username === imagesData[j].target_id) {
                usersData[i].profileImageData = imagesData[j].imageData;
                break;
            }
        }
    }

    // map data into artist cards
    const displayedArtistJsx = usersData.map((user) => (
        <ArtistCard
            key={user.username}
            artistUsername={user.username}
            artistAlias={user.profile.alias}
            artistProfileImageData={user.profileImageData}/>)
    )
    // checks if the page and data has loaded
    if (document.readyState === "complete" && !isLoading) {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <span className={"title-text text-center"}>Artists</span>

                {/*todo: functional search bar*/}
                <div className="flex flex-col items-center mb-10">
                    <SearchBar/>
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

                {/*todo: functional search bar*/}
                <div className="flex flex-col items-center mb-10">
                    <SearchBar/>
                </div>

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