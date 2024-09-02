/**
 * File Description: Artist dashboard tab
 * File version: 1.3
 * Contributors: Phillip Li, Nikki, Ryan
 */

import React, { useState } from "react";
import DashboardCard from "../../../card/DashboardCard";
import {
  useArtistDashboardData,
  useArtistBookings,
  useBookings,
  useUserBookings,
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
  const [filterYear, setFilterYear] = useState("All Years");
  const [filterLocation, setFilterLocation] = useState("");
  const [totalFilterEarnings, setTotalFilterEarnings] = useState(null);
  const [totalFilterPendingEarnings, setTotalFilterPendingEarnings] =
    useState(null);
  const [totalFilterCustomers, setTotalFilterCustomers] = useState(null);
  const [filterActive, setFilterActive] = useState(false);

  const artistBookingData = useUserBookings(username).artistBookingData;

  function filterDataCalculator(location, year) {
    let bookingInYear = [];
    if (year === -1) {
      bookingInYear = artistBookingData;
    } else {
      for (let i = 0; i < artistBookingData.length; i++) {
        const dateObject = artistBookingData[i].bookingStartDateTime;
        const bookingYear = dateObject.getFullYear();
        if (bookingYear == year) {
          bookingInYear.push(artistBookingData[i]);
        }
      }
    }

    let filterBookingData = [];
    if (location == "") {
      filterBookingData = artistBookingData;
    } else {
      for (let i = 0; i < bookingInYear.length; i++) {
        const split_address = bookingInYear[i].bookingLocation.split(",");
        const suburb = split_address[1].trim();
        if (suburb == location) {
          filterBookingData.push(bookingInYear[i]);
        }
      }
    }

    const completedBookings = [];

    for (let i = 0; i < filterBookingData.length; i++) {
      if (filterBookingData[i].bookingStatus == "completed") {
        completedBookings.push(filterBookingData[i]);
      }
    }
    const totalCompletedCustomersInYear = completedBookings.length;

    let bookingCompleteRevenue = 0;
    let bookingPendingRevenue = 0;

    for (let i = 0; i < filterBookingData.length; i++) {
      if (filterBookingData[i].bookingStatus === "completed") {
        bookingCompleteRevenue += filterBookingData[i].bookingPrice;
      }
      if (filterBookingData[i].bookingStatus === "pending") {
        bookingPendingRevenue += filterBookingData[i].bookingPrice;
      }
    }

    return {
      totalCompletedCustomersInYear,
      bookingCompleteRevenue,
      bookingPendingRevenue,
    };
  }

  // const filterData = useBookingFilterSearch(
  //   filterLocation,
  //   filterYear,
  //   username
  // );

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

  function handleFilter(location, year) {
    if (year == -1 && location == "") {
      setFilterActive(false);
      return;
    } else {
      setFilterActive(true);
    }

    if (year == -1) {
      setFilterYear("All Years");
    }

    setFilterLocation(location);

    const filterData = filterDataCalculator(location, year);
    setTotalFilterCustomers(filterData.totalCompletedCustomersInYear);
    setTotalFilterEarnings(filterData.bookingCompleteRevenue);
    setTotalFilterPendingEarnings(filterData.bookingPendingRevenue);
    //setFilterData();
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
          filterData={handleFilter}
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
          dashboardCardTitle={
            filterActive ? `Total Customers` : "Total Customers - This Month"
          }
          dashboardCardDesc="People you have glowed up this month!"
          dashboardCardValue={
            filterActive ? totalFilterCustomers : totalCustomersThisMonth
          }
        />
        <DashboardCard
          key="earnings-received"
          dashboardCardTitle="Total Earnings"
          dashboardCardDesc="Count your dollars!"
          dashboardCardValue={
            filterActive
              ? `${currencyFormatter.format(totalFilterEarnings)}`
              : `${currencyFormatter.format(bookingCompleteRevenue)}`
          }
        />
        <DashboardCard
          key="earnings-pending"
          dashboardCardTitle="Pending Earnings"
          dashboardCardDesc="Cash currently in transit!"
          dashboardCardValue={
            filterActive
              ? `${currencyFormatter.format(totalFilterPendingEarnings)}`
              : `${currencyFormatter.format(bookingPendingRevenue)}`
          }
        />
      </div>
    </>
  );
};

export default ArtistDashboardTab;
