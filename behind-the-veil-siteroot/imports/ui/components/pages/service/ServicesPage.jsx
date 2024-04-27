/**
 * File Description: Services page
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import ServiceCard from "../../card/ServiceCard.jsx";

/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <span>Services Page to be done!!</span>
            <span>SEARCH BAR HERE</span>

            {/* TODO: replace with actual database calls when DB is set up
                 get the first X entries from Database, then there is a next page (?) for the next X entries */}

            <div className={"flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap"}>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"}
                    serviceDesc={"Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"}
                    servicePrice={1123294}
                    artistId={800091}
                    artistName={"Alice Smith"}
                    artistPhotoData={""}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={2222222}
                    serviceName={"AAAAAAAAAAA"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    artistId={800092}
                    artistName={"Bob"}
                    artistPhotoData={""}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={1234567}
                    serviceName={"AAAAAAAAAAA"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    artistId={800093}
                    artistName={"Longnamed Jones"}
                    artistPhotoData={""}
                ></ServiceCard>
            </div>
        </WhiteBackground>
    );
};

export default ServicesPage;