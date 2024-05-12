/**
 * File Description: Services page
 * File version: 1.1
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"

import ServiceCollection from "/imports/api/collections/services";
import UserCollection from "/imports/api/collections/users";
import ImageCollection from "/imports/api/collections/images";

import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import Pagination from "/imports/ui/components/pagination/Pagination.jsx"
import ServiceCard from "/imports/ui/components/card/ServiceCard.jsx";
import SearchBar from "/imports/ui/components/searchBar/searchBar.jsx";
import Loader from "/imports/ui/components/loader/Loader";


/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {

    // default number of items on each page
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // set up subscription (publication is in the "publication" folder)
    const isLoadingService = useSubscribe('active_services');
    const isLoadingArtists = useSubscribe('all_artists');
    const isLoadingImages = useSubscribe('service_images');
    const isLoading = isLoadingService() || isLoadingArtists() || isLoadingImages();

    // get data from db
    let servicesData = useTracker(() => {
        return ServiceCollection.find({"serviceActive": true}).fetch();
    });
    let usersData = useTracker(() => {
        return UserCollection.find({"userType": "artist"}).fetch();
    });
    let imagesData = useTracker(() => {
        return ImageCollection.find().fetch();
    });

    // manual aggregation
    let combined = servicesData;
    for (let i = 0; i < servicesData.length; i++) {

        // aggregate with artist first
        for (let j = 0; j < usersData.length; j++) {
            // find matching artist and add their name
            if (servicesData[i].artistUsername === usersData[j]._id) {
                servicesData[i].artistAlias = usersData[j].userAlias;
                break;
            }
        }
        // then aggregate with the FIRST image (cover)
        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the service
            if (imagesData[j].imageType === "service" && servicesData[i]._id._str === imagesData[j].target_id) {
                servicesData[i].serviceImageData = imagesData[j].imageData;
                break;
            }
        }
    }

    const serviceCardList = combined.map((service) => (<ServiceCard
        key={service._id._str}
        serviceId={service._id._str}
        serviceName={service.serviceName}
        serviceDesc={service.serviceDesc}
        servicePrice={service.servicePrice}
        artistUsername={service.artistUsername}
        serviceImageData={service.serviceImageData}
        artistAlias={service.artistAlias}
    ></ServiceCard>))

    if (document.readyState === "complete" && !isLoading) {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>

                <span className={"title-text text-center"}>Services</span>

                {/*todo: functional search bar*/}
                <div className="flex flex-col items-center mb-10">
                    <SearchBar/>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-5">

                    <Pagination
                        itemsPerPage={itemsPerPage}
                        displayItems={serviceCardList}
                    />

                    <div className="flex flex-row items-center justify-center gap-x-2">
                        Items per page:
                        <input type={"number"}
                               value={itemsPerPage}
                               className="border-2 p-2 border-light-grey rounded-[6px] main-text h-12 max-w-20 sm:w-[361px]"
                               onChange={(event) => {
                                   // ensure no negative pages
                                   const newValue = Number(event.target.value);
                                   if (newValue > 0) {
                                       setItemsPerPage(newValue);
                                   }
                               }}
                               min={1}
                               max={100}
                        />
                    </div>
                </div>
            </WhiteBackground>
        );
    } else {
        // is loader, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <span className={"title-text text-center"}>Services</span>

                {/*todo: functional search bar*/}
                <div className="flex flex-col items-center mb-10">
                    <SearchBar/>
                </div>

                <Loader
                    loadingText={"Services are loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );
    }
};

export default ServicesPage;