/**
 * File Description: Services page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import ServiceCard from "../../card/ServiceCard.jsx";
import Card from "../../card/Card.jsx";

/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <span>Services Page to be done!!</span>
            <span>SEARCH BAR HERE</span>
            <div className={"flex flex-col " +
                "lg:flex-row gap-10 items-center justify-center flex-wrap"}>
                <ServiceCard
                    className=""
                    serviceName={"AAAAAAAAAAA"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicul.\n"}
                    servicePrice={123}
                    artistName={"Alice"}
                    artistPhoto={"PHOTO HERE"}
                    serviceId={1234567}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceName={"AAAAAAAAAAA"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    artistName={"Alice"}
                    artistPhoto={"PHOTO HERE"}
                    serviceId={1234567}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceName={"AAAAAAAAAAA"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    artistName={"Alice"}
                    artistPhoto={"PHOTO HERE"}
                    serviceId={1234567}
                ></ServiceCard>

            </div>
        </WhiteBackground>
    );
};

export default ServicesPage;