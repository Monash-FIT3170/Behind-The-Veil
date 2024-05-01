/**
 * File Description: Services page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState, useEffect} from 'react';
import ReactPaginate from "react-paginate"
import axios from 'axios'

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import ServiceCard from "../../card/ServiceCard.jsx";
import {Pagination} from "./Pagination.jsx"


/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {

    // TODO: replace with actual database calls when DB is set up
    //  get the first X entries from Database, then there is a next page (?) for the next X entries

    const fakeData =
        [
            {
                "serviceId": 12345,
                "serviceName": "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff",
                "serviceDesc": "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword",
                "servicePrice": 112333294,
                "servicePhotoData": "",
                "artist": {
                    "artistUsername": "alice_smith",
                    "artistName": "Alice Smith"
                }
            }, {
            "serviceId": 2222222,
            "serviceName": "Bachelorette Glam Experience",
            "serviceDesc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis vulputate erat, tristique ultrices orci. Duis fringilla mollis sapien, eu condimentum nibh pharetra quis. In ultricies mauris vitae velit commodo congue. Donec placerat elit et ullamcorper laoreet. Morbi at bibendum quam. Nunc eu elit at ipsum vehicula.",
            "servicePrice": 1203,
            "servicePhotoData": "http://localhost:8000/aa.png",
            "artist": {
                "artistUsername": "Bobbyyy1",
                "artistName": "Bob"
            }
        }, {
            "serviceId": 1234567,
            "serviceName": "GlamourGlow Beauty",
            "serviceDesc": "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword",
            "servicePrice": 130,
            "servicePhotoData": "http://localhost:8000/Background.png",
            "artist": {
                "artistUsername": "ihavealonglonglongnameJones",
                "artistName": "LonglonglongnamedJones LongnamedDavis"
            }
        }
        ]

    // service cards currently displayed
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(5);

    // todo: change to database calls
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setServices(res.data);
            setLoading(false);
        }
        fetchServices();
    }, []);

    const aaaa = services.map((service) =>
        (
            <ServiceCard
                serviceId={service.id}
                serviceName={service.email}
                serviceDesc={service.phone}
                servicePrice={service.website}
                servicePhotoData={""}
                artistUsername={service.username}
                artistName={service.name}
            ></ServiceCard>
        ))

    const bbb = fakeData.map((service) =>
        (
            <ServiceCard
                serviceId={service.serviceId}
                serviceName={service.serviceName}
                serviceDesc={service.serviceDesc}
                servicePrice={service.servicePrice}
                servicePhotoData={service.servicePhotoData}
                artistUsername={service.artist.artistUsername}
                artistName={service.artist.artistName}
            ></ServiceCard>
        ))

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <span className={"title-text text-center"}>Services</span>

            {/* todo: put search bar component here once completed*/}
            <div className="flex flex-col items-center">
                <span>SEARCH BAR HERE!!!!!!</span>
            </div>

            <Pagination
                itemsPerPage={10}
                displayItems={bbb}
            />

        </WhiteBackground>
    );
};

export default ServicesPage;