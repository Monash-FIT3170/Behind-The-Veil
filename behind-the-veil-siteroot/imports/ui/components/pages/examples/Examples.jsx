/**
 * File Description: Examples page
 * File version: 1.2
 * Contributors: Josh, Nikki
 */

import React from "react";
import ButtonExamples from "./button-examples/ButtonExamples";
import FontExamples from "./font-examples/FontExamples";
import CardExamples from "./card-examples/CardExamples";
import ServiceDetailsHeaderExamples from "./service-details-header-examples/ServiceDetailsHeaderExamples";

/**
 * Page to showcase examples
 */
const Examples = () => {
    return (
        <div className="flex flex-col gap-5 p-10">
            <div className="title-text">Examples</div>
            <ButtonExamples />
            <FontExamples />
            <CardExamples />
            <ServiceDetailsHeaderExamples />
        </div>
    );
};

export default Examples;
