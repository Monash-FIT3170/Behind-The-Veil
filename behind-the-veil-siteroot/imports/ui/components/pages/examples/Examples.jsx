/**
 * File Description: Examples page
 * File version: 1.2
 * Contributors: Josh, Nikki
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import ButtonExamples from "./button-examples/ButtonExamples";
import FontExamples from "./font-examples/FontExamples";
import CardExamples from "./card-examples/CardExamples";
import ServiceDetailsHeaderExamples from "./service-details-header-examples/ServiceDetailsHeaderExamples";

/**
 * Page to showcase examples
 */
const Examples = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="title-text">Examples</div>
            <ButtonExamples />
            <FontExamples />
            <CardExamples />
            <ServiceDetailsHeaderExamples />
        </WhiteBackground>
    );
};

export default Examples;

