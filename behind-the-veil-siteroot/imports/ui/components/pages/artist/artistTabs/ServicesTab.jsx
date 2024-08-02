/**
 * File Description: Artist's services tab - bride's view
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from "react";

import ServiceCard from "../../../card/ServiceCard.jsx";
import Loader from "../../../loader/Loader";
import Pagination from "../../../pagination/Pagination";
import {getServices} from "../../../util";


/**
 * Service tab of an artist's profile, viewed as a bride
 *
 * @param username {string} - username of the artist
 */
export const ServicesTab = ({username}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const serviceFilter = {
        $and: [
            { artistUsername:username },
            { serviceActive: true }
        ]
    }
    const [isLoading, servicesData] = getServices("active_services", username, serviceFilter)

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
