/**
 * File Description: Tabs examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Tabs from "../../tabs/Tabs";
import Card from "../../card/Card";
import Button from "../../button/Button";
import BridesBookingCards from "./BridesBookingCards";

/**
 * Examples of simple tabs. Tabs component uses headless UI: https://headlessui.com/react/tabs
 */
const BookingTab = () => {
    const confirmBookingPanel = (
        <div className="p-4 flex gap-4 h-ful">
            <Button className="h-fit">{":)"}</Button>
            <Button className="h-fit">{":|"}</Button>
            <Button className="h-fit">{":("}</Button>
            <BridesBookingCards/>
        </div>
    )

    const pendingBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
        </div>
    )

    const pastBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
        </div>
    )

    const archivedBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
        </div>
    )

    return (
        <div className="h-full">
                <Tabs
                    tabs={['Confirmed Bookings', 'Pending Bookings', 'Past Bookings', 'Archived Bookings']}
                    tabPanels={[confirmBookingPanel, pendingBookingPanel, pastBookingPanel, archivedBookingPanel]}
                />
            
        </div>
    )
}

export default BookingTab;