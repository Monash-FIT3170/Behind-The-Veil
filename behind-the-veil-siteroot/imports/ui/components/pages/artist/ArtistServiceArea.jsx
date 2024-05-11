/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.0
 * Contributors: Hirun
 */
import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Tabs from "../../tabs/Tabs.jsx";
import Button from "../../button/Button.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";

/**
 * This page allows the artist to enter to enter a location as well as provide a radius in which they can travel from that location
 * The design is set up that there can only be a single service location
 * The service location can be edited within the input field and when "Save Changes" is pressed the new service location is reflected
 */

export const ArtistServiceArea = () => {
  const ServiceAreaPanel = (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4">{/* creates 3 columns with desired ratio */}
      {/* titles */}
      <div className="large-text">Service Location</div>
      <div className="large-text">Radius (km)</div>
      <div></div>
      {/* inputs */}
      <input
        type="text"
        placeholder="Please enter a location"
        className="rounded outline outline-1 outline-light-grey p-2"
      />
      <input
        type="text"
        placeholder="Please enter travel radius"
        className="rounded outline outline-1 outline-light-grey p-2 w-55"
      />
      {/* empty div for spacing*/}
      <div></div>
      <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2">
        <CheckIcon className="size-6" />
        Save Changes
      </Button>
    </div>
  );

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <Button className="bg-transparent text-dark-grey flex gap-2">
        <ArrowLeftIcon className="size-6" />
        Back
      </Button>
      <div className="title-text text-center">Settings</div>
      <Tabs
        tabs={["Payment Details","Change Password","Service Area"]}
        tabPanels={["Tab Panel 1","Tab Panel 2", ServiceAreaPanel]}
      />
    </WhiteBackground>
  );
};

export default ArtistServiceArea;
