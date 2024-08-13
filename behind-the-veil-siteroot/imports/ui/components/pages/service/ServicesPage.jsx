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
import {useServices} from "../../DatabaseHelper";
import URLSearchParams from "@ungap/url-search-params";
import {useLocation} from "react-router-dom";

/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {

    // default number of items on each page
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // set up subscription (publication is in the "publication" folder)
    const serviceFilter = {serviceActive: true}
    const {isLoading, servicesData} = useServices("active_services", [], serviceFilter, true)

    // get any search parameters and filter
    let searchInput = new URLSearchParams(useLocation().search).get("search");
    searchInput = searchInput ? searchInput.trim() : ''


    // map data into service cards
    const displayedServicesJsx = servicesData
        .filter((service) => {
            return service.serviceName.toLowerCase().includes(searchInput.toLowerCase()) ||
                service.serviceDesc.toLowerCase().includes(searchInput.toLowerCase())
        })
        .map((service) => (
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

                <div className="flex flex-col items-center mb-10">
                    <SearchBar placeholder={"Search service name or description"}
                               defaultType={"services" }
                               startingValue={searchInput}
                               suggestionsDown={true}
                    />
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