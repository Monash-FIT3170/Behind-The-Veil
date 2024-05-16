/**
 * File Description: Artist Services Tab
 * File version: 1.0
 * Contributors: Lucas Sharp
 */

import React, { useState, useEffect } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import ServiceCollection from "/imports/api/collections/services";

import Loader3 from "react-spinners/BounceLoader";
import Button from "../../button/Button.jsx";
import ServiceCard from "../../card/ServiceCard.jsx";
import { PlusIcon } from "@heroicons/react/24/outline";


/**
 * Services Tab for Artists Profile
 */
export const ArtistServicesTab = () => {
    // set up subscription (publication is in the "publication" folder)
    const isLoading = useSubscribe("all_services");

    // get serive data from database
    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });

    
// Creating the state of the filter for the service cards (defaults to All)
    const [filterType, setFilterType] = useState("All");

    const [serviceCardsShown, setServiceCardsShown] = useState(<div>Loading...</div>);

    useEffect(() => {
    // Once the data is fetched, update serviceCardsShown based on the filterType
    if (!isLoading()) {
        const allServices = servicesData;
        const activeServices = servicesData.filter(service => service.serviceActive);
        const inactiveServices = servicesData.filter(service => !service.serviceActive);
        if (filterType === "All") {
            setServiceCardsShown(allServices.map(service => (
                <ServiceCard
                key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}/>
            )));
        } else if (filterType === "Active") {
            setServiceCardsShown(activeServices.map(service => (
                <ServiceCard
                    key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}
                />
            )));
        } else if (filterType === "Inactive") {
            setServiceCardsShown(inactiveServices.map(service => (
                <ServiceCard
                    key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}
                />
            )));
        }
    }
}, [isLoading(), filterType]);

    // The UI of the filter buttons based on whether they are active or not
    const activeFilterButtonClasses =
        "bg-secondary-purple hover:bg-secondary-purple rounded-md";
    const inactiveFilterButtonClasses =
        "bg-light-grey hover:bg-light-grey-hover rounded-md";

    //import plusIcon from heroicons for "add services" button
    const plusIcon = <PlusIcon className="icon-base" />;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:items-start md:justify-start">
                <div className="flex flex-row gap-6">
                    <Button
                        className={
                            filterType === "All"
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses
                        }
                        onClick={() => setFilterType("All")}
                    >
                        Show All
                    </Button>
                    <Button
                        className={
                            filterType === "Active"
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses
                        }
                        onClick={() => setFilterType("Active")}
                    >
                        Active
                    </Button>
                    <Button
                        className={
                            filterType === "Inactive"
                                ? activeFilterButtonClasses
                                : inactiveFilterButtonClasses
                        }
                        onClick={() => setFilterType("Inactive")}
                    >
                        Inactive
                    </Button>
                </div>
                <Button className="md:absolute md:right-[66px] flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover">
                    {plusIcon} Add Service
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {document.readyState != "complete" || isLoading() ? (
                    <div className={"flex flex-col items-center justify-center"}>
                <Loader3/>
                </div>
                ) : (
                    <div className="flex flex-col lg:flex-row lg:min-w-[1000px] gap-10 items-center justify-center flex-wrap">
                        {serviceCardsShown}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistServicesTab;
