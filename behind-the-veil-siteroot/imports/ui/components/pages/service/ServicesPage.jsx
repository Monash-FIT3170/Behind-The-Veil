/**
 * File Description: Services page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useTracker, useSubscribe} from "meteor/react-meteor-data"
import ServiceCollection from "/imports/api/collections/services";
import { Promise } from "meteor/promise"

import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import PageLayout from "/imports/ui/enums/PageLayout";
import {Pagination} from "/imports/ui/components/pagination/Pagination.jsx"
import ServiceCard from "/imports/ui/components/card/ServiceCard.jsx";
import Button from "../../button/Button";


/**
 * Page of a list of Service cards for users to see
 */
export const ServicesPage = () => {

    // set up subscription (publication is in the "publication" folder)
    useSubscribe('all_services');
    useSubscribe('all_artists');

    // get services data from db
    let servicesData = useTracker(() => {
        // return ServiceCollection.find( {"artistUsername":"cwoodrooffe0"} ).fetch();
        return ServiceCollection.find( {} ).fetch();

        // Meteor.call("get_services_whole");
        // return Meteor.call("get_service");

    });

    console.log(servicesData);

    const serviceCardList = servicesData.map((service) =>
        (
            <div>{1}</div>
            // <ServiceCard
            //     key={service._id._str}
            //     serviceId={service._id._str}
            //     serviceName={service.serviceName}
            //     serviceDesc={service.serviceDesc}
            //     servicePrice={service.servicePrice}
            //     artistUsername={service.artistUsername}
            //
            //     servicePhotoData={service.servicePhotoData}
            //     artistAlias={"place holder"}
            // ></ServiceCard>
        ))

    // console.log("serviceCardList!!!!!!!!!!!!!");
    // console.log(serviceCardList);

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <span className={"title-text text-center"}>Services</span>

            {/* todo: put search bar component here once completed*/}
            <div className="flex flex-col items-center">
                <span>SEARCH BAR HERE!!!!!!</span>
            </div>

            {/* Test button */}
            <Button onClick={() => {
                let a = Meteor.call("get_service")
                return new Promise((resolve, reject) => {
                    Meteor.call(
                        "get_service",
                        (error, retrievedRes) => {
                            if (error) {
                                reject(error);
                            } else {
                            resolve(retrievedRes)
                            }
                        }
                    )})
                    .then(
                    retrievedRes => {
                        a = retrievedRes;
                        console.log(a);
                    })
                    .catch(error => {
                    console.log(error)
                });
            }}>temp button
            </Button>

            <Pagination
                itemsPerPage={5}
                displayItems={serviceCardList}
            />


        </WhiteBackground>
    );
};

export default ServicesPage;