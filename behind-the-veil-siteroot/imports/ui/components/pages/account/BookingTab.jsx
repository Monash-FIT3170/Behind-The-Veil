/**
 * File Description: Tabs examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Tabs from "../../tabs/Tabs";
import Card from "../../card/Card";
import Button from "../../button/Button";

/**
 * Examples of simple tabs. Tabs component uses headless UI: https://headlessui.com/react/tabs
 */
const BookingTab = () => {
    const confirmBookingPanel = (
        <div className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <Button className="h-fit">{":)"}</Button>
            <Button className="h-fit">{":|"}</Button>
            <Button className="h-fit">{":("}</Button>
        </div>
    )

    const pendingBookingPanel = (
        <div className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
        </div>
    )

    const pastBookingPanel = (
        <div className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
        </div>
    )

    const archivedBookingPanel = (
        <div className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
        </div>
    )

    return (
        <div className="flex flex-col gap-3">
                <Tabs
                    tabs={['Confirmed Bookings', 'Pending Bookings', 'Past Bookings', 'Archived Bookings']}
                    tabPanels={[confirmBookingPanel, pendingBookingPanel, pastBookingPanel, archivedBookingPanel]}
                />
            
        </div>
    )
}

export default BookingTab;