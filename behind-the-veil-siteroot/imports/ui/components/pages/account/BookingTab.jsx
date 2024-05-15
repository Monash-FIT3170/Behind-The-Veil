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
import {CurrencyDollarIcon, ArrowPathIcon, PencilSquareIcon, DocumentMagnifyingGlassIcon, } from "@heroicons/react/24/outline"

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

/**
 * Examples of simple tabs. Tabs component uses headless UI: https://headlessui.com/react/tabs
 */
const BookingTab = ({confirm, pending, past, archived}) => {
    const statusIconConfirm = <CurrencyDollarIcon className="icon-base"/>
    const statusIconPending = <ArrowPathIcon className="icon-base"/>
    const statusIconPast = <PencilSquareIcon className="icon-base"/>
    const statusIconReviewed = <DocumentMagnifyingGlassIcon className="icon-base"/>
    const statusIconArchived = ""
    console.log(archived[0])
    
    // console.log(archived[0].bookingID)
    const confirmBookingPanel = (
        <ul className="p-4 flex gap-4 block">
            <li>
            {confirm.map((booking, index) => (   
                <BridesBookingCards key={index} status={booking} button={statusIconConfirm} />  
            ))}
            </li>
            </ul>
    );
    const pendingBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <BridesBookingCards status={pending[0]} button={statusIconPending}></BridesBookingCards>
        </div>
    )
    const pastBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <BridesBookingCards status={past[0]} button={statusIconPast}></BridesBookingCards>
        </div>
    )

    const archivedBookingPanel = (
        <div className="h-full p-4 gap-4 flex">
            <BridesBookingCards status={archived[0]} button={statusIconArchived}></BridesBookingCards>
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