/**
 * File Description: Services page
 * File version: 1.2
 * Contributors: Nikki
 */

import React, {useState} from 'react';

import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import Pagination from "/imports/ui/components/pagination/Pagination.jsx"
import ServiceCard from "/imports/ui/components/card/ServiceCard.jsx";
import SearchBar from "/imports/ui/components/searchBar/searchBar.jsx";
import Loader from "/imports/ui/components/loader/Loader";
import {getServices} from "../../DatabaseHelper";

/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {

    // default number of items on each page
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // set up subscription (publication is in the "publication" folder)
    const serviceFilter = { serviceActive: true }
    const {isLoading, servicesData} = getServices("active_services", [], serviceFilter, true )

    // map data into service cards
    const displayedServicesJsx = servicesData.map((service) => (
        <ServiceCard
            key={service._id}
            serviceId={service._id}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
        />)
    )

    // checks if the page and data has loaded
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
                        reset={false}
                        itemsPerPage={itemsPerPage}
                        displayItems={displayedServicesJsx}
                    />

                    <div className="flex flex-row items-center justify-center gap-x-2">
                        Items per page:
                        <select defaultValue={10} onChange={(event) => {
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