/**
 * File Description: Add Availability page
 * File version: 2.0
 * Contributors: Laura, Josh, Phillip
 */

import React from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import PreviousButton from "../../button/PreviousButton";
import { useParams } from "react-router-dom";
import AddAvailabilityTabElement from "./AddAvailabilityTabElement.jsx";

/**
 * Page for artist to add availability
 */
const AddAvailability = () => {
  const { artistUsername } = useParams();

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <PreviousButton />
      <AddAvailabilityTabElement
        username={artistUsername}
      ></AddAvailabilityTabElement>
    </WhiteBackground>
  );
};

export default AddAvailability;
