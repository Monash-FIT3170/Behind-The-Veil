/**
 * File Description: Artist profile page tabs
 * File version: 2.0
 * Contributors: Kefei (Phillip) Li, Laura, Nikki, Lucas
 */

import React from "react";

import Tabs from "../../tabs/Tabs.jsx";
import ArtistDashboardTab from "./artistTabs/ArtistDashboardTab";
import ArtistGalleryTab from "./artistTabs/ArtistGalleryTab";
import ArtistBookingsTab from "./artistTabs/ArtistBookingsTab";
import ArtistServicesTab from "./artistTabs/ArtistServicesTab";
import ArtistReviewsTab from "./artistTabs/ArtistReviewsTab";

/**
 * Component for artist's profile tabs
 *
 * @param userInfo - logged-in user information passed in
 */
export const ArtistProfileTabs = ({ userInfo }) => {
  // Utilise Tab components to create page schematics.
  return (
    <Tabs
      tabs={[
        <span key={1}>Dashboard</span>,
        <span key={2}>Bookings</span>,
        <span key={3}>My Services</span>,
        <span key={4}>Gallery</span>,
        <span key={5}>Reviews</span>,
      ]}
      tabPanels={[
        // pass in the username so that it doesn't have to be queried again
        <ArtistDashboardTab key={"dashboard"} username={userInfo.username} />,
        <ArtistBookingsTab key={"bookings"} username={userInfo.username} />,
        <ArtistServicesTab key={"my-services"} username={userInfo.username} />,
        <ArtistGalleryTab key={"gallery"} username={userInfo.username} />,
        <ArtistReviewsTab key={"reviews"} username={userInfo.username} />,
      ]}
      tabsClassName="lg:flex lg:justify-between"
    />
  );
};

export default ArtistProfileTabs;
