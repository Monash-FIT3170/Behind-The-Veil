/**
 * File Description: Service details header examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import ServiceDetailsHeader from "../../../service-details-header/ServiceDetailsHeader";

const ServiceDetailsHeaderExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Service Details Header:</div>
            <ServiceDetailsHeader
                service="Super Awesome Makeover"
                date="1 Apr 2000"
                artist="Bruce Wayne"
                price="$9999"
            />
        </div>
    )
}

export default ServiceDetailsHeaderExamples;