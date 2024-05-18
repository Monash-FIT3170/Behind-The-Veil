/**
 * File Description: Artist dashboard tab
 * File version: 1.1
 * Contributors: Kefei (Phillip) Li, Nikki
 */

import React from 'react';
import DashboardCard from "../../card/DashboardCard";

/**
 * Dashboard tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistDashboardTab = ({username}) => {
    //Utilise DashboardCard component as basis for the dashboard.
    //The dashboardCardValue will have to be dynamic. Title and Desc can be static given it's the same across all accounts.
    return (
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap">
            <DashboardCard
                dashboardCardTitle="Total Customers - Lifetime"
                dashboardCardValue="273"
                dashboardCardDesc="Celebrate your achievement in helping brides with their special day!"
            ></DashboardCard>
            <DashboardCard
                dashboardCardTitle="Total Customers - This Month"
                dashboardCardDesc="People you have glowed up this month!"
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
};

export default ArtistDashboardTab;