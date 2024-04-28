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
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * This page allows the artist to enter to enter a location as well as provide a radius in which they can travel from that location
 */

export const ArtistServiceArea = () => {
  const ServiceAreaPanel = (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 ml-9 large-text">Location</div>
      <div className="col-span-1 text-center large-text">Radius (Km)</div>
      <div className="col-span-7"></div> {/* Empty div for spacing */}
      <div className="col-span-4 ml-9 main-text text-dark-grey">
        Melbourne CBD
      </div>
      <div className="col-span-1 text-center main-text text-dark-grey">15</div>
      <div className="col-span-5 text-right">
        {/* the delete icon would go here */}
      </div>
      <div className="col-span-4 ml-9 main-text text-dark-grey">
        Melbourne Airport
      </div>
      <div className="col-span-1 text-center main-text text-dark-grey">3</div>
      <div className="col-span-7 text-right">
        {/* the delete icon would go here */}
      </div>
      <div className="col-span-4 ml-9">
        <input
          type="text"
          style={{
            height: "30px",
            width: "450px",
            paddingLeft: "10px",
            outline: "1px solid lightgray",
            borderRadius: "3px",
          }}
        />
      </div>
      <div className="col-span-1 text-center main-text text-dark-grey">
        <input
          type="text"
          style={{
            height: "30px",
            width: "50px",
            paddingLeft: "10px",
            outline: "1px solid lightgray",
            borderRadius: "3px",
          }}
        />
      </div>
      <div className="col-span-7 ml-2">
        <Button>Add</Button>
      </div>
      <div className="col-span-4 ml-9">
        <Button className="bg-secondary-purple hover:bg-secondary-purple-hover">
          Save Changes
        </Button>
      </div>
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
        tabs={["Payment Details", "Service Area"]}
        tabPanels={["Tab Panel 1", ServiceAreaPanel]}
      />
    </WhiteBackground>
  );
};

export default ArtistServiceArea;
