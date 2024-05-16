/**
 * File Description: Artist Profile
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React, { useState, useEffect } from "react";
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
import ServiceCollection from "/imports/api/collections/services";
import UserCollection from "../../../../api/collections/users.js";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout.tsx";
import Tabs from "../../tabs/Tabs.jsx";
import ProfilePhoto from "../../profilePhoto/ProfilePhoto.jsx";
import Button from "../../button/Button.jsx";
import ServiceCard from "../../card/ServiceCard.jsx";
import DashboardCard from "../../card/DashboardCard.jsx";
import {
  PlusIcon,
  Cog8ToothIcon,
  StarIcon as OutStarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolStarIcon } from "@heroicons/react/24/solid";
/**
 * Page for artist profile
 */
export const ArtistProfilePage = () => {

    // set up subscription (publication is in the "publication" folder)

    const [filterType, setFilterType] = useState("All")

    const isLoading = useSubscribe('all_services');

    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });
    let services = servicesData;

    //import plusIcon from heroicons for "add photo" button
    const plusIcon = <PlusIcon className="icon-base" />;

    //import gearIcon from heroicons for "settings" button.
    const gearIcon = <Cog8ToothIcon className="icon-base" />;

  const serviceCardList = services.map((service) => (<ServiceCard
            key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}
    ></ServiceCard>));

     const activeServices = services.filter(service => service.serviceActive);
     const activeServiceCardList = activeServices.map((service) => (<ServiceCard
            key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}
    ></ServiceCard>));

    const inactiveServices = services.filter(service => !service.serviceActive);
     const inactiveServiceCardList = inactiveServices.map((service) => (<ServiceCard
            key={service._id._str}
            serviceId={service._id._str}
            serviceName={service.serviceName}
            serviceDesc={service.serviceDesc}
            servicePrice={service.servicePrice}
            artistUsername={service.artistUsername}
            serviceImageData={service.serviceImageData}
            artistAlias={service.artistAlias}
            isEdit={true}
    ></ServiceCard>));

        console.log(serviceCardList);
    
    const [serviceCardsShown, setServiceCardsShown] = useState(serviceCardList);

    const handleShowCardTypeChange = (type) => {
        console.log(serviceCardsShown);
        setFilterType(type);
        if (type === "All") {
            setServiceCardsShown(serviceCardList);
        } else if (type === "Active") {
            setServiceCardsShown(activeServiceCardList);
        } else if (type === "Inactive") {
            setServiceCardsShown(inactiveServiceCardList);
        }
    }

    const activeFilterButtonClasses = "bg-secondary-purple hover:bg-secondary-purple rounded-md";
    const inactiveFilterButtonClasses = "bg-light-grey hover:bg-light-grey-hover rounded-md";

    const servicePanel = (  
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:items-start md:justify-start">
                <div className="flex flex-row gap-6">
                    <Button
                        className={filterType === "All" ? activeFilterButtonClasses : inactiveFilterButtonClasses}
                        onClick={() => handleShowCardTypeChange("All")}
                    >
                        Show All
                    </Button>
                    <Button
                        className={filterType === "Active" ? activeFilterButtonClasses : inactiveFilterButtonClasses}
                        onClick={() => handleShowCardTypeChange("Active")}
                    >
                        Active
                    </Button>
                    <Button
                        className={filterType === "Inactive" ? activeFilterButtonClasses : inactiveFilterButtonClasses}
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
                {(document.readyState != "complete" || isLoading()) ? (<div>Loading...</div>) : (<div className="flex flex-col lg:flex-row lg:min-w-[1000px] gap-10 items-center justify-center flex-wrap">
                {serviceCardsShown}
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
    
    //Utilise DashboardCard component as basis for the dashboard.
  //The dashboardCardValue will have to be dynamic. Title and Desc can be static given it's the same across all accounts.
  const dashboardTab = (
    <div className="grid lg:grid-cols-2 gap-8 justify-items-center">
      <DashboardCard
        dashboardCardTitle="Total Customers - Lifetime"
        dashboardCardDesc="Celebrate your achievement in helping brides with their special
              day!"
        dashboardCardValue="273"
      ></DashboardCard>
      <DashboardCard
        dashboardCardTitle="Total Customers - This Month"
        dashboardCardDesc="People you have glowed 
        up this month!"
        dashboardCardValue="5"
      ></DashboardCard>
      <DashboardCard
        dashboardCardTitle="Total Earnings"
        dashboardCardDesc="Count your dollars!"
        dashboardCardValue="$32,760"
      ></DashboardCard>
      <DashboardCard
        dashboardCardTitle="Pending Earnings"
        dashboardCardDesc="Cash currently in transit!"
        dashboardCardValue="$480"
      ></DashboardCard>
    </div>
  );

  //Utilise Tab components to create page schematics.
  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <div className="flex justify-end">
        <Button className="flex flex-row gap-x-1.5">{gearIcon} Settings</Button>
      </div>
      <ProfilePhoto className="flex container mx-auto" />
      <div className="text-center main-text">Name</div>
      <div className="text-center main-text">Tag</div>
      <Tabs
        tabs={["Dashboard", "Bookings", "My Services", "Gallery", "Reviews"]}
        tabPanels={[
          dashboardTab,
          "Bookings Panel",
          servicePanel,
          galleryTab,
          "reviewTab",
        ]}
        tabsClassName="flex justify-between"
      />
    </WhiteBackground>
  );
};

export default ArtistProfilePage;
