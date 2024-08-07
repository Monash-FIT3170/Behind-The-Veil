/**
 * File Description: Examples page
 * File version: 1.3
 * Contributors: Josh, Nikki
 */

import React from "react";
import ButtonExamples from "./button-examples/ButtonExamples";
import FontExamples from "./font-examples/FontExamples";
import CardExamples from "./card-examples/CardExamples";
import ServiceDetailsHeaderExamples from "./service-details-header-examples/ServiceDetailsHeaderExamples";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import TabsExamples from "./tabs-examples/TabsExamples";
import MapExamples from "./map-examples/MapExamples.jsx";
import PaginationExample from "./pagination-example/PaginationExample";
import InputExamples from "./input-examples/InputExamples.jsx";
import LoaderExamples from "./loaderExamples/LoaderExamples";
import ModalExamples from "./modal-examples/ModalExamples";
import PopupExamples from "./popup-examples/PopupExamples.jsx";

/**
 * Page to showcase examples
 */
const Examples = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="title-text">Examples</div>
            <ButtonExamples/>
            <ModalExamples/>
            <FontExamples/>
            <CardExamples/>
            <ServiceDetailsHeaderExamples/>
            <TabsExamples/>
            <InputExamples/>
            <MapExamples/>
            <PaginationExample/>
            <LoaderExamples/>
            <PopupExamples />
        </WhiteBackground>
    );
};

export default Examples;

