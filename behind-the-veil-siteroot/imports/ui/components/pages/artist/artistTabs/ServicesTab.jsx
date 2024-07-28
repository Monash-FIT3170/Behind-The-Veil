/**
 * File Description: Artist's services tab - bride's view
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from "react";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import ServiceCollection from "/imports/api/collections/services";
import ImageCollection from "../../../../../api/collections/images";

import ServiceCard from "../../../card/ServiceCard.jsx";
import Loader from "../../../loader/Loader";
import Pagination from "../../../pagination/Pagination";


/**
 * Service tab of an artist's profile, viewed as a bride
 *
 * @param username {string} - username of the artist
 */
export const ServicesTab = ({username}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // get service data from database
    const isLoadingUserServices = useSubscribe("all_user_active_services", username);
    let servicesData = useTracker(() => {
        return ServiceCollection.find({
            $and: [
                { artistUsername:username },
                { serviceActive: true }
            ]
        }).fetch();
    });

    const isLoadingServiceImages = useSubscribe('service_images', []);
    const isLoading = isLoadingUserServices() || isLoadingServiceImages();

    let imagesData = useTracker(() => {
        return ImageCollection.find({"imageType": "service"}).fetch();
    });

    // manual aggregation of each service with their image
    for (let i = 0; i < servicesData.length; i++) {

        // then aggregate with the ALL images that belong to it
        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the service

            if (imagesData[j].imageType === "service" && servicesData[i]._id === imagesData[j].target_id) {
                servicesData[i].serviceImageData = imagesData[j].imageData;
                break;
            }
        }
    }

    if (isLoading) {
        // is loading, display loader
        return (
            <Loader
                loadingText={"Services are loading . . ."}
                isLoading={isLoading}
                size={100}
                speed={1.5}
            />
        );
    } else {

        const displayServices = servicesData.map((service) => {
            return (
                <ServiceCard
                    key={service._id}
                    serviceId={service._id}
                    serviceName={service.serviceName}
                    serviceDesc={service.serviceDesc}
                    servicePrice={service.servicePrice}
                    serviceImageData={service.serviceImageData}
                    artistUsername={username}
                    artistAlias={""}
                    isEdit={false}
                    viewArtistDetails={false}
                />
            );
        });

        return (
            <div className="flex flex-col gap-6">

                {/*bottom tab with services*/}
                <div className="flex flex-col items-center justify-center gap-8">
                    {/*the services and pagination*/}
                    <Pagination
                        reset={true}
                        itemsPerPage={itemsPerPage}
                        displayItems={displayServices}
                    />

                    {/*bottom component for the custom item per page*/}
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        Items per page:
                        <select defaultValue={10}
                                onChange={(event) => {
                                    setItemsPerPage(event.target.value)
                                }}
                                className="input-base w-20">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
};

export default ServicesTab;
