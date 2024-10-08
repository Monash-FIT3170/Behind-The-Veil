/**
 * File Description: Card examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Card from "../../../card/Card";
import Button from "../../../button/Button";
import ServiceCard from "../../../card/ServiceCard";

const CardExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Cards:</div>
            <Card>
                This text is written on a card component.
            </Card>
            <Card className="bg-dark-grey text-white">
                You can also supply custom classes to this component to override the base styling if you really need to.
                To demonstrate, I've styled this card with a dark grey background and white text.
            </Card>
            <Card className="flex flex-col gap-2">
                Any component can be placed inside a card.
                For example, other divs:
                <div className="bg-light-grey w-fit p-2 rounded">Div with light grey background</div>
                Or buttons:
                <Button>Hello</Button>
            </Card>

            <div className="large-text underline">Service Cards:</div>
            <div className={"flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap"}>
                <ServiceCard
                    className=""
                    serviceId={1}
                    serviceName={"AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"}
                    serviceDesc={"Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"}
                    servicePrice={112333294}
                    serviceImageData={"/images/unsplash-valerie-elash-bI8Yv7AH6b0.jpg"}
                    artistUsername={"alice_smith"}
                    artistAlias={"Alice Smith"}
                />
                <ServiceCard
                    className=""
                    serviceId={2}
                    serviceName={"Bachelorette Glam Experience"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    serviceImageData={"/images/unsplash-amir-seilsepour.png"}
                    artistUsername={"Bobbyyy1"}
                    artistAlias={"Bob"}
                />
                <ServiceCard
                    className=""
                    serviceId={3}
                    serviceName={"GlamourGlow Beauty"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    serviceImageData={"/images/pexels-kristina-polianskaia-2617447-4241704.jpg"}
                    artistUsername={"ihavealonglonglongnameJones"}
                    artistAlias={"LonglonglongnamedJones LongnamedDavis"}
                />
                <ServiceCard
                    className=""
                    serviceId={4}
                    serviceName={"GlamourGlow Beauty"}
                    serviceDesc={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula  a.\n"}
                    servicePrice={123}
                    serviceImageData={"/images/pexels-christian-diokno-1666462-3260852.jpg"}
                    artistUsername={"ihavealonglonglongnameJones"}
                    artistAlias={"LonglonglongnamedJones LongnamedDavis"}
                    isEdit={true}
                />
            </div>


        </div>
    )
}

export default CardExamples;