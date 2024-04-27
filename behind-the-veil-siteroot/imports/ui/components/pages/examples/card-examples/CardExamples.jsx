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


        </div>
    )
}

export default CardExamples;