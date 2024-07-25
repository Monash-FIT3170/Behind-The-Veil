/**
 * File Description: Specific Services page
 * File version: 1.2
 * Contributors: Nhu, Nikki
 */

import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ServiceCollection from "../../../../api/collections/services";
import UserCollection from "../../../../api/collections/users";
import ImageCollection from "../../../../api/collections/images";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, Squares2X2Icon} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import FormOutput from "../request-booking/FormOutput";
import PreviousButton from "../../button/PreviousButton";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Displays a page for a specific service
 */
const SpecificServicePage = () => {

    const navigateTo = useNavigate();

    // image carousel handler
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    // grab the service ID from the URL
    const {serviceId} = useParams();

    // set up subscription and get data from db for this service
    const isLoadingService = useSubscribe('specific_service', serviceId);

    let serviceData = useTracker(() => {
        return ServiceCollection.find({"_id": serviceId}).fetch()[0];
    });

    // grab the artist and image data depending on if service is loaded or not
    const isLoadingArtist = useSubscribe('specific_user', serviceData ? serviceData.artistUsername : "");
    const isLoadingServiceImages = useSubscribe('specific_service_images', serviceData ? serviceData._id : "");
    const isLoadingArtistProfile = useSubscribe('specific_profile_image', serviceData ? serviceData.artistUsername : "");
    const isLoading = isLoadingService() || isLoadingArtist() || isLoadingServiceImages() || isLoadingArtistProfile();

    let artistData = useTracker(() => {
        return UserCollection.find({username:serviceData ? serviceData.artistUsername : "" }).fetch()[0];
    });

    let serviceImagesData = useTracker(() => {
        return ImageCollection.find({$and: [
                {"imageType": "service"},
                {"target_id": serviceData ? serviceData._id : ""}
            ]}).fetch();
    });

    let profileImagesData = useTracker(() => {
        return ImageCollection.find({$and: [
                {"imageType": "profile"},
                {"target_id": serviceData ? serviceData.artistUsername : ""}
            ]}).fetch()[0];
    });

    const imageUrls = serviceImagesData.map((image) => (
        image.imageData
    ))
    const durationTip = "Duration does not include travel. It is the required time to performing the service for the bride.";

    if (isLoading) {
        // is loader, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoadingService()}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );

    } else {

        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                {/* Title container for centering */}
                <PreviousButton/>
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="large-text md:title-text text-center mb-5 grow">{serviceData.serviceName}</div>
                </div>

                {/* Content container */}
                <div className="flex flex-col xl:flex-row xl:items-start justify-center w-full gap-y-10">

                    {/* Left side: image carousel with navigation buttons */}
                    <div className="flex flex-col items-center justify-start gap-y-8">

                        <div className={"flex flex-row items-center justify-center"}>

                            {/* Backward Button */}
                            <Button onClick={handlePrevClick}
                                    className="hidden sm:flex bg-transparent hover:bg-white-hover active:bg-light-grey">
                                <ChevronLeftIcon className="size-10 stroke-[4] text-dark-grey"/>
                            </Button>

                            {/* Image */}
                            <img className="rounded-2xl object-contain
                             h-full w-4/5
                             sm:min-w-[500px]
                             xl:min-w-[300px] xl:max-w-[400px] xl:max-h-[600px]
                             2xl:min-w-[500px] 2xl:max-w-[600px]"
                                 src={imageUrls[currentImageIndex]}
                                 alt="Service image"/>

                            {/* Forward Button */}
                            <Button onClick={handleNextClick}
                                    className="hidden sm:flex bg-transparent hover:bg-white-hover active:bg-light-grey">
                                <ChevronRightIcon className="size-10 stroke-[4] text-dark-grey"/>
                            </Button>
                        </div>

                        {/*bottom of photo div*/}
                        <div className={"flex flex-row items-center justify-center gap-x-4"}>
                            {/* Backward Button on tiny screens at the bottom*/}
                            <Button onClick={handlePrevClick}
                                    className="sm:hidden bg-transparent hover:bg-white-hover active:bg-light-grey">
                                <ChevronLeftIcon className="size-10 stroke-[4] text-dark-grey"/>
                            </Button>

                            {/* Dots Indicator */}
                            <div className="flex">
                                {imageUrls.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`size-4 mx-1  rounded-full ${currentImageIndex === index ? 'bg-dark-grey' : 'bg-light-grey'}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>

                            {/* Forward Button on tiny screens at the bottom */}
                            <Button onClick={handleNextClick}
                                    className="sm:hidden bg-transparent hover:bg-white-hover active:bg-light-grey">
                                <ChevronRightIcon className="size-10 stroke-[4] text-dark-grey"/>
                            </Button>
                        </div>
                    </div>

                    {/* Right side - User Info and Details */}
                    <div className="flex flex-col gap-y-10 items-center justify-center">
                        {/* User Info Container */}
                        <Card
                            className="flex flex-row items-center justify-center space-x-2 w-fit sm:min-w-[450px] rounded-2xl">
                            <img src={profileImagesData.imageData} alt="Artist profile image"
                                 className="rounded-[10px] object-cover size-24"/>


                            <div className="flex flex-col items-start justify-center gap-y-1 w-full">
                                <div className="flex flex-col items-start justify-center gap-y-1 pl-3">
                                    <span className="large-text line-clamp-1">{artistData.profile.alias}</span>
                                    <span
                                        className="medium-text text-dark-grey line-clamp-1"> @{artistData.username}</span>
                                </div>

                                <Button
                                    className="flex flex-row gap-2 min-w-40 w-full justify-center items-center mt-2"
                                    onClick={() => navigateTo(`/${UrlBasePath.ARTISTS}/${artistData.username}`)}>
                                    {/*this is the BRIDE's view of the artist, not the artist profile*/}
                                    <Squares2X2Icon className={"icon-base"}/>
                                    All services
                                </Button>
                            </div>
                        </Card>

                        {/* Service Details */}
                        <div className="flex flex-col items-start gap-y-6 w-4/5">
                            <FormOutput textColor="text-dark-grey" haveHelpText={false} label={"Service Type:"}
                                        input={serviceData.serviceType}></FormOutput>
                            <FormOutput textColor="text-dark-grey" haveHelpText={false} label={"Price:"}
                                        input={"$" + serviceData.servicePrice}></FormOutput>
                            <FormOutput textColor="text-dark-grey" haveHelpText={true} tipText={durationTip}
                                        label={"Duration:"} input={serviceData.serviceDuration + " hours"}></FormOutput>
                            <FormOutput textColor="text-dark-grey" haveHelpText={false} label={"Description:"}
                                        input={serviceData.serviceDesc}></FormOutput>

                        </div>

                        <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 sm:w-1/3 min-w-60
                            bg-secondary-purple hover:bg-secondary-purple-hover"
                                onClick={() => navigateTo(`/${UrlBasePath.SERVICES}/${serviceId}/request-booking`)}>
                            <CalendarDaysIcon className="icon-base"/>
                            Request Booking
                        </Button>
                    </div>
                </div>

            </WhiteBackground>
        );
    }
};

export default SpecificServicePage;
