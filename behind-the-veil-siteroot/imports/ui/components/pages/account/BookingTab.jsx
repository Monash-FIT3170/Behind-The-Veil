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
import {CurrencyDollarIcon, ArrowPathIcon, PencilSquareIcon, DocumentMagnifyingGlassIcon, CheckIcon, ClockIcon, SparklesIcon, XMarkIcon} from "@heroicons/react/24/outline"

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
    const statusConfirm = {
        status: "Confirmed",
        statusIcon: <CheckIcon className="icon-base w-5 h-5"/>,
        statusStyle: "flex flex-row gap-x-2 items-centers w-4/5 lg:w-1/2 min-w-60 text-sm text-green-400 pt-1",
        buttonIcon: statusIconConfirm,
        buttonText: "Service Completed"
    }
    const statusPending = {
        status: "Awaiting Artist Confirmation",
        statusIcon: <ClockIcon className="icon-base w-5 h-5"/>,
        statusStyle: "flex flex-row gap-x-2 items-centers w-4/5 lg:w-1/2 min-w-60 text-sm text-indigo-400 pt-1",

        buttonIcon: statusIconPending,
        buttonText: "Request Change"
    }
    const statusPast = {
        status: "Completed",
        statusIcon: <SparklesIcon className="icon-base w-5 h-5"/>,
        statusStyle: "flex flex-row gap-x-2 items-centers w-4/5 lg:w-1/2 min-w-60 text-sm text-green-400 pt-1",

        buttonIcon: statusIconPast,
        buttonText: "Leave Review"
    }
    const statusArchived = {
        status: "Cancelled",
        statusIcon: <XMarkIcon className="icon-base w-5 h-5"/>,
        statusStyle: "flex flex-row gap-x-2 items-centers w-4/5 lg:w-1/2 min-w-60 text-sm text-red-500 pt-1",

        buttonIcon: statusIconArchived,
        buttonText: "Service Completed"
    }

    
    // console.log(archived[0].bookingID)
    const confirmBookingPanel = (
        <ul className="p-4 flex gap-4 block">
            <li className="w-full">
            {confirm.map((booking, index) => (   
                <BridesBookingCards key={index} status={booking} elements={statusConfirm} />  
            ))}
            </li>
            </ul>
    );
    const pendingBookingPanel = (
        <ul className="p-4 flex gap-4 block">
            <li className="w-full">
            {pending.map((booking, index) => (   
                <BridesBookingCards key={index} status={booking} elements={statusPending} />  
            ))}
            </li>
            </ul>
    );
    const pastBookingPanel = (
        <ul className="p-4 flex gap-4 block">
            <li className="w-full">
            {past.map((booking, index) => (   
                <BridesBookingCards key={index} status={booking} elements={statusPast} />  
            ))}
            </li>
            </ul>
    );

    const archivedBookingPanel = (
        <ul className="p-4 flex gap-4 block">
            <li className="w-full">
            {archived.map((booking, index) => (   
                <BridesBookingCards key={index} status={booking} elements={statusArchived} />  
            ))}
            </li>
            </ul>
    );

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