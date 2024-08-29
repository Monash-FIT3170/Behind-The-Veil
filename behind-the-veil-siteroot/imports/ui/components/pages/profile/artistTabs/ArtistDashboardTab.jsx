/**
 * File Description: Artist dashboard tab
 * File version: 1.3
 * Contributors: Kefei (Phillip) Li, Nikki, Ryan
 */

import React from "react";
import DashboardCard from "../../../card/DashboardCard";
import {
  useArtistDashboardData,
  useArtistBookings,
} from "../../../DatabaseHelper";
import Loader from "../../../loader/Loader";
import FilterLocationSearchBar from "../../../searchBar/filterLocationSearchBar.jsx";

/**
 * Dashboard tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistDashboardTab = ({ username }) => {
  //Utilise DashboardCard component as basis for the dashboard.
  //The dashboardCardValue will have to be dynamic. Title and Desc can be static given it's the same across all accounts.

  const serviceYears = useArtistBookings(username).bookingYearArray;
  const serviceLocations = useArtistBookings(username).bookingSuburbArray;

  const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Fetch the dashboard data
  const {
    isLoading,
    totalCustomersLifetime,
    totalCustomersThisMonth,
    bookingCompleteRevenue,
    bookingPendingRevenue,
  } = useArtistDashboardData(username);

  if (isLoading) {
    return (
      <Loader
        loadingText={"Dashboard is loading . . ."}
        isLoading={isLoading}
        size={100}
        speed={1.5}
      />
    );
  }

  //const artistDashboardData = useArtistBooking(username);

  /// Dashboard Filter Strategy
  // To get location data, search database for all locations user has a booking in.
  // Collate all locations into an array and then when choosing a location to filter, allow search for one of these locations.
  // Do the same for year.

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <FilterLocationSearchBar
          placeholder={"Enter a location..."}
          servedLocationList={serviceLocations}
          servedYearList={serviceYears}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap pt-8">
        <DashboardCard
          key="customer-lifetime"
          dashboardCardTitle="Total Customers - Lifetime"
          dashboardCardDesc="Celebrate your achievement in helping brides with their special day!"
          dashboardCardValue={totalCustomersLifetime}
        />
        <DashboardCard
          key="customer-month"
          dashboardCardTitle="Total Customers - This Month"
          dashboardCardDesc="People you have glowed up this month!"
          dashboardCardValue={totalCustomersThisMonth}
        />
        <DashboardCard
          key="earnings-received"
          dashboardCardTitle="Total Earnings"
          dashboardCardDesc="Count your dollars!"
          dashboardCardValue={currencyFormatter.format(bookingCompleteRevenue)}
        />
        <DashboardCard
          key="earnings-pending"
          dashboardCardTitle="Pending Earnings"
          dashboardCardDesc="Cash currently in transit!"
          dashboardCardValue={currencyFormatter.format(bookingPendingRevenue)}
        />
      </div>
    </>
  );
};

export default ArtistDashboardTab;
