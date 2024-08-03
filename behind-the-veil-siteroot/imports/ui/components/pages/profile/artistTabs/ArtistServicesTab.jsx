/**
 * File Description: Artist's Services Tab
 * File version: 2.0
 * Contributors: Lucas Sharp, Nikki
 */

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/outline";

import Button from "../../../button/Button.jsx";
import ServiceCard from "../../../card/ServiceCard.jsx";
import ArtistServicesFilter from "../../../../enums/ArtistServicesFilter";
import Loader from "../../../loader/Loader";
import Pagination from "../../../pagination/Pagination";
import UrlBasePath from "../../../../enums/UrlBasePath.tsx";

import {getServices} from "../../../DatabaseHelper";

/**
 * Service tab of an artist's profile.
 * Loads differently depending on if viewed by artist them self (internally on their profile page), or externally
 * through artist details page.
 *
 * @param username {string} - username of the current user's profile
 * @param external {boolean} - if viewing from an external view (viewed on artist detail page)
 */
export const ArtistServicesTab = ({username, external = false}) => {
    const navigateTo = useNavigate();

    // pagination number of items
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // load different data depending on if your own profile, or viewing from externally
    let servicePublication, serviceFilter;
    if (external) {
        // viewing on the artist details page, see only active services
        servicePublication = "all_user_active_services";
        serviceFilter = {
            $and: [
                {artistUsername: username},
                {serviceActive: true}
            ]
        }
    } else {
        // viewing your own profile, see all your services
        servicePublication = "all_user_services"
        serviceFilter = { artistUsername: username }
    }
    const [isLoading, servicesData] = getServices(servicePublication, [username], serviceFilter)


    // Creating the state of the filter for the service cards (defaults to All)
    const [filterType, setFilterType] = useState(ArtistServicesFilter.ALL);

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

        let filteredServices;
        if (external) {
            // external view cannot filter, only see active ones
            filteredServices = servicesData;
        } else {
            // own view can filter based on if service is active or not
            // filtered bookings array based on the selected filter
            filteredServices = servicesData.filter((service) => {
                if (filterType === ArtistServicesFilter.ALL) {
                    return true;
                } else if (filterType === ArtistServicesFilter.ACTIVE) {
                    return service.serviceActive === true;
                } else if (filterType === ArtistServicesFilter.INACTIVE) {
                    return service.serviceActive === false;
                }
            });
        }

        const displayServices = filteredServices.map((service) => {
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
                    isEdit={!external}
                    viewArtistDetails={false}
                />
            );
        });

        // The UI of the filter buttons based on whether they are active or not - only visible on own profile
        const activeFilterButtonClasses = "w-1/3 min-w-28 rounded-md p-2 bg-secondary-purple hover:bg-secondary-purple";
        const inactiveFilterButtonClasses = "w-1/3 min-w-28 rounded-md p-2 bg-light-grey hover:bg-light-grey-hover";
        const topFilterButtons = (
            <div className={"flex flex-col-reverse gap-y-6 items lg:flex-row lg:items-center lg:justify-between"}>
                {/* filter buttons on the left*/}
                <div
                    className="w-full sm:w-2/5 flex flex-wrap sm:flex-nowrap gap-5 items-center justify-center sm:justify-start">
                    <Button
                        className={
                            filterType === ArtistServicesFilter.ALL
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses}
                        onClick={() => setFilterType(ArtistServicesFilter.ALL)}>
                        Show All
                    </Button>

                    <Button
                        className={
                            filterType === ArtistServicesFilter.ACTIVE
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses}
                        onClick={() => setFilterType(ArtistServicesFilter.ACTIVE)}>
                        Active
                    </Button>

                    <Button
                        className={
                            filterType === ArtistServicesFilter.INACTIVE
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses}
                        onClick={() => setFilterType(ArtistServicesFilter.INACTIVE)}>
                        Inactive
                    </Button>
                </div>

                {/*add service button on the right*/}
                <div className={"flex flex-col-reverse items-center justify-center sm:flex-row sm:items-center sm:justify-end gap-6"}>
                    <Button
                        className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center bg-secondary-purple hover:bg-secondary-purple-hover"
                        onClick={() => navigateTo(`/${UrlBasePath.SERVICES}/addservice`)}
                    >
                        <PlusIcon className="icon-base"/> Add Service
                    </Button>
                </div>
            </div>
        )

        return (
            <div className="flex flex-col gap-6">

                {/*top button row, only display on own profile view*/}
                {
                    external ? null : topFilterButtons
                }

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
