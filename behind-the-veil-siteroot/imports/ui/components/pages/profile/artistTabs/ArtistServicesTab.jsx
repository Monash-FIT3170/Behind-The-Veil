/**
 * File Description: Artist my-services Tab
 * File version: 1.1
 * Contributors: Lucas Sharp
 */

import React, { useState } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import ServiceCollection from "/imports/api/collections/services";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../../button/Button.jsx";
import ServiceCard from "../../../card/ServiceCard.jsx";
import ImageCollection from "../../../../../api/collections/images";
import ArtistServicesFilter from "../../../../enums/ArtistServicesFilter";
import Loader from "../../../loader/Loader";
import Pagination from "../../../pagination/Pagination";

/**
 * Service tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistServicesTab = ({ username }) => {
    const navigateTo = useNavigate();

    const [itemsPerPage, setItemsPerPage] = useState(10);

    // todo: change to subscribing to all_user_services() after demo, currently displaying all services for every user
    const isLoadingUserServices = useSubscribe("all_services", username);

    // get service data from database
    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });

    // todo: only publish images relevant to this list of serviceIds (a group $OR ?? or an $IN operator??)
    const isLoadingServiceImages = useSubscribe("service_images", []);
    const isLoading = isLoadingUserServices() || isLoadingServiceImages();

    let imagesData = useTracker(() => {
        return ImageCollection.find({ imageType: "service" }).fetch();
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

    // Creating the state of the filter for the service cards (defaults to All)
    const [filterType, setFilterType] = useState(ArtistServicesFilter.ALL);

    if (isLoading) {
        // is loading, display loader
        return <Loader loadingText={"Services are loading . . ."} isLoading={isLoading} size={100} speed={1.5} />;
    } else {
        // filtered bookings array based on the selected filter
        const filteredServices = servicesData.filter((service) => {
            if (filterType === ArtistServicesFilter.ALL) {
                return true;
            } else if (filterType === ArtistServicesFilter.ACTIVE) {
                return service.serviceActive === true;
            } else if (filterType === ArtistServicesFilter.INACTIVE) {
                return service.serviceActive === false;
            }
        });

        const displayServices = filteredServices.map((service, index) => {
            return (
                <ServiceCard
                    key={index}
                    serviceId={service._id}
                    serviceName={service.serviceName}
                    serviceDesc={service.serviceDesc}
                    servicePrice={service.servicePrice}
                    serviceImageData={service.serviceImageData}
                    artistUsername={username}
                    artistAlias={""}
                    isEdit={true}
                />
            );
        });

        // The UI of the filter buttons based on whether they are active or not
        const activeFilterButtonClasses = "w-1/3 min-w-28 rounded-md p-2 bg-secondary-purple hover:bg-secondary-purple";
        const inactiveFilterButtonClasses = "w-1/3 min-w-28 rounded-md p-2 bg-light-grey hover:bg-light-grey-hover";

        return (
            <div className="flex flex-col gap-6 mt-2">
                {/*top button row*/}
                <div className={"flex flex-col-reverse gap-y-6 items lg:flex-row lg:items-center lg:justify-between"}>
                    {/* filter buttons on the left*/}
                    <div className="w-full sm:w-2/5 flex flex-wrap sm:flex-nowrap gap-5 items-center justify-center sm:justify-start">
                        <Button
                            className={
                                filterType === ArtistServicesFilter.ALL
                                    ? activeFilterButtonClasses
                                    : inactiveFilterButtonClasses
                            }
                            onClick={() => setFilterType(ArtistServicesFilter.ALL)}
                        >
                            Show All
                        </Button>
                        <Button
                            className={
                                filterType === ArtistServicesFilter.ACTIVE
                                    ? activeFilterButtonClasses
                                    : inactiveFilterButtonClasses
                            }
                            onClick={() => setFilterType(ArtistServicesFilter.ACTIVE)}
                        >
                            Active
                        </Button>
                        <Button
                            className={
                                filterType === ArtistServicesFilter.INACTIVE
                                    ? activeFilterButtonClasses
                                    : inactiveFilterButtonClasses
                            }
                            onClick={() => setFilterType(ArtistServicesFilter.INACTIVE)}
                        >
                            Inactive
                        </Button>
                    </div>

                    {/*add service button on the right*/}
                    <div
                        className={
                            "flex flex-col-reverse items-center justify-center sm:flex-row sm:items-center sm:justify-end gap-6"
                        }
                    >
                        <Button
                            className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center bg-secondary-purple hover:bg-secondary-purple-hover"
                            onClick={() => navigateTo("/services/addservice")}
                        >
                            <PlusIcon className="icon-base" /> Add Service
                        </Button>
                    </div>
                </div>

                {/*bottom tab with booking*/}
                <div className="flex flex-col items-center justify-center gap-8">
                    {/*the bookings and pagination*/}
                    <Pagination reset={true} itemsPerPage={itemsPerPage} displayItems={displayServices} />

                    {/*bottom component for the custom item per page*/}
                    <div className="flex flex-row items-center justify-center gap-x-2">
                        Items per page:
                        <select
                            defaultValue={10}
                            onChange={(event) => {
                                setItemsPerPage(event.target.value);
                            }}
                            className="input-base w-20"
                        >
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

export default ArtistServicesTab;
