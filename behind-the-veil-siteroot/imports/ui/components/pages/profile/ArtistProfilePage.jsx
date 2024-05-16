/**
 * File Description: Artist Profile
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React, { useState, useEffect } from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout.tsx";
import Tabs from "../../tabs/Tabs.jsx";
import ProfilePhoto from "../../profilePhoto/ProfilePhoto.jsx";
import Button from "../../button/Button.jsx";
import { PlusIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import ServiceCard from "../../card/ServiceCard.jsx";
/**
 * Page for artist profile
 */
export const ArtistProfilePage = () => {

    // set up subscription (publication is in the "publication" folder)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const subscription = Meteor.subscribe('all_services', {
            onReady: () => setIsLoading(false),
            onStop: () => setIsLoading(false),
            onError: () => setIsLoading(false)
        });

        return () => {
            if (subscription) {
                subscription.stop();
                setIsLoading(true);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once


    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });
    let services = servicesData;


    //import plusIcon from heroicons for "add photo" button
    const plusIcon = <PlusIcon className="icon-base" />;

    //import gearIcon from heroicons for "settings" button.
    const gearIcon = <Cog8ToothIcon className="icon-base" />;

    const handleShowCardTypeChange = (type) => {
        console.log(type);
    }

    const servicePanel = (  
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:items-start md:justify-start">
                <div className="flex flex-row gap-6">
                    <Button
                        className="rounded-md"
                        onClick={() => handleShowCardTypeChange("All")}
                    >
                        Show All
                    </Button>
                    <Button
                        className="rounded-md"
                        onClick={() => handleShowCardTypeChange("Active")}
                    >
                        Active
                    </Button>
                    <Button
                        className="rounded-md"
                        onClick={() => handleShowCardTypeChange("Inactive")}
                    >
                        Inactive
                    </Button>
                </div>
                <Button className="md:absolute md:right-[66px] flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover">
                    {plusIcon} Add Service
                </Button>
            </div>
            <div className="flex items-center justify-center">
                {isLoading ? (<div>Loading...</div>) : (<div className="flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap">
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                <ServiceCard
                    className=""
                    serviceId={111111}
                    serviceName={
                        "AnExtremelyLongServiceNameWithNoSpacesInBetweenWillBeTruncatedOff"
                    }
                    serviceDesc={
                        "Areallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallyreallylongword.\n"
                    }
                    servicePrice={112333294}
                    serviceImageData={
                        "https://docs.material-tailwind.com/img/team-3.jpg"
                    }
                    artistUsername={"alice_smith"}
                    artistName={"Alice Smith"}
                    isEdit={true}
                ></ServiceCard>
                </div>
                )}
            </div>
        </div>
    );

    // Photos Gallery code: https://www.material-tailwind.com/docs/react/gallery
    // When completing the dynamic version for this page, probably a good idea to setup the photos as components and importing them in.
    const galleryTab = (
        <div className="relative">
            <div className="sticky top-20 z-20 flex justify-end">
                <Button className="absolute top-5 flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover">
                    {plusIcon} Add Photo
                </Button>
            </div>
            <div className="px-10 relative flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="grid gap-4">
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center "
                                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center "
                                src="https://docs.material-tailwind.com/img/team-3.jpg"
                                alt="gallery-photo"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center "
                                src="https://docs.material-tailwind.com/img/team-3.jpg"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                        <div>
                            <img
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                                alt="gallery-photo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    //Utilise Tab components to create page schematics.
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="flex justify-end">
                <Button className="flex flex-row gap-x-1.5">
                    {" "}
                    {gearIcon} Settings
                </Button>
            </div>
            <ProfilePhoto className="flex container mx-auto" />
            <div className="text-center main-text">Name</div>
            <div className="text-center main-text">Tag</div>
            <Tabs
                tabs={[
                    "Dashboard",
                    "Bookings",
                    "My Services",
                    "Gallery",
                    "Reviews",
                ]}
                tabPanels={[
                    "Dashboard Panel",
                    "Bookings Panel",
                    servicePanel,
                    galleryTab,
                    "Reviews Panel",
                ]}
                tabsClassName="flex justify-between"
            />
        </WhiteBackground>
    );
};

export default ArtistProfilePage;
