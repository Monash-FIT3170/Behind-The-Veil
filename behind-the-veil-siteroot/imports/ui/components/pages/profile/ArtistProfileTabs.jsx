/**
 * File Description: Artist profile page tabs
 * File version: 2.1
 * Contributors: Kefei (Phillip) Li, Laura, Nikki, Lucas, Vicky
 */

import React, { useState, useEffect } from "react";

import Tabs from "../../tabs/Tabs.jsx";
import ArtistDashboardTab from "./artistTabs/ArtistDashboardTab";
import ArtistGalleryTab from "./artistTabs/ArtistGalleryTab";
import ArtistBookingsTab from "./artistTabs/ArtistBookingsTab";
import ArtistAvailabilityTab from "./artistTabs/ArtistAvailabilityTab.jsx";
import ArtistServicesTab from "./artistTabs/ArtistServicesTab";
import ArtistReviewsTab from "./artistTabs/ArtistReviewsTab";
import BookingStatus from "../../../enums/BookingStatus";

import { useUserBookings } from "../../DatabaseHelper.jsx";

/**
 * Component for artist's profile tabs
 *
 * @param userInfo - logged-in user information passed in
 */
export const ArtistProfileTabs = ({ userInfo }) => {
  // Variable for tracking if there bookings the artist hasn't yet responded to
  const [unrespondedBookings, setUnrespondedBookings] = useState(false);

  // Get the artist booking details
  const { isLoadingUserBooking, artistBookingData } = useUserBookings(
    userInfo.username
  );
  const isLoading = isLoadingUserBooking();

  // Loop through artist booking data to identify if there is a booking the artist hasn't responded to
  useEffect(() => {
    if (isLoading || artistBookingData == undefined) return;

    let hasPendingBooking = false;

    if (artistBookingData.length > 0) {
      for (let i = 0; i < artistBookingData.length; i++) {
        if (artistBookingData[i].bookingStatus == BookingStatus.PENDING) {
          hasPendingBooking = true;
          break;
        }
      }
    }

    if (unrespondedBookings !== hasPendingBooking) {
      setUnrespondedBookings(hasPendingBooking);
    }
  }, [isLoading, artistBookingData, unrespondedBookings]);

  // Utilise Tab components to create page schematics.
  return (
    <Tabs
      tabs={[
        <span key={1}>Dashboard</span>,
        <span key={2} className="relative">
          Bookings
          {/* Display a red dot to indicate that a booking has not been responded to */}
          {unrespondedBookings && (
            <span className="absolute top-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </span>,
        <span key={3}>Availability</span>,
        <span key={4}>My Services</span>,
        <span key={5}>Gallery</span>,
        <span key={6}>Reviews</span>,
      ]}
      tabPanels={[
        // pass in the username so that it doesn't have to be queried again
        <ArtistDashboardTab key={"dashboard"} username={userInfo.username} />,
        <ArtistBookingsTab key={"bookings"} username={userInfo.username} />,
        <ArtistAvailabilityTab
          key={"availability"}
          username={userInfo.username}
        />,
        <ArtistServicesTab key={"my-services"} username={userInfo.username} />,
        <ArtistGalleryTab key={"gallery"} username={userInfo.username} />,
        <ArtistReviewsTab key={"reviews"} username={userInfo.username} />,
      ]}
      tabsClassName="lg:flex lg:justify-between"
    />
  );
};

export default ArtistProfileTabs;
