/**
 * File Description:
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import {useParams} from 'react-router-dom';

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";


export const SpecificServicePage = () => {
    const {serviceId} = useParams();

    console.log("my ID is: " + serviceId);

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <span>Specific Service Page Page to be done!!</span>

        </WhiteBackground>
    );
};

export default SpecificServicePage;