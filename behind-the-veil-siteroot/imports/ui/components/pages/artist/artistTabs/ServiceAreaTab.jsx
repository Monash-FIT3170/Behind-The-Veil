/**
 * File Description: Artist's services area - bride's view
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import FormOutput from "../../request-booking/FormOutput";
import MarkerMap from "../../../map/MarkerMap";


/**
 * Tab to display artist's service area with a map
 *
 * @param serviceLocation address/city of artist
 * @param serviceRadius the radius which artist can service from that location
 */
export const ServiceAreaTab = ({serviceLocation, serviceRadius}) => {

    // todo: display radius on mapbox and search bar to search (?)
    if (!serviceLocation || serviceRadius === undefined || serviceRadius === null) {
        // if artist hasn't inputted a service location/radius
        return (
            <span className={"flex justify-center main-text text-dark-grey text-center w-full"}>Artist has not specified service location</span>
        );
    } else {
        // artist has inputted a service area and radius
        return (
            <div className={"flex flex-col xl:flex-row justify-center items-center lg:px-5 xl:px-16 gap-5"}>
                <div className="flex flex-col items-start gap-y-6 w-fit xl:mr-5 2xl:mr-10">
                    <FormOutput textColor="text-dark-grey" haveHelpText={false} label={"Location"}
                                input={serviceLocation}/>
                    <FormOutput textColor="text-dark-grey" haveHelpText={false} label={"Radius"}
                                input={serviceRadius + " km"}/>
                </div>

                <div className="w-3/4 lg:w-[600px]">
                    <MarkerMap location={serviceLocation} radius={serviceRadius}/>
                </div>

            </div>
        );
    }
}

export default ServiceAreaTab;
