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
import {useUserInfo} from "../../util";
import UrlBasePath from "../../../enums/UrlBasePath";
import AddAvailabilityTabElement from "./AddAvailabilityTabElement.jsx";

/**
 * Page for artist to add availability
 */
const AddAvailability = () => {
    const navigateTo = useNavigate();

    if (useUserInfo().type === "bride") {
        navigateTo(`/${UrlBasePath.HOME}`);
    }
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
