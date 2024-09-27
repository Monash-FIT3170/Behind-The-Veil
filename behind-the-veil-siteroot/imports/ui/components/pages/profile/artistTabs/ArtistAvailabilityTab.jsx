/**
 * File Description: Artist bookings tab
 * File version: 1.3
 * Contributors: Phillip, Laura, Nikki
 */

import React from "react";
import AddAvailabilityTabElement from "../../add-availability/AddAvailabilityTabElement";
/**
 * Availability tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistAvailabilityTab = ({ username }) => {
  return (
    <div>
      <AddAvailabilityTabElement
        username={username}
      ></AddAvailabilityTabElement>
    </div>
  );
};

export default ArtistAvailabilityTab;
