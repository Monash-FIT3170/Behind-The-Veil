/**
 * File Description: The Brides profile page
 * File version: 1.0
 * Contributors: Katie
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import {Cog8ToothIcon} from "@heroicons/react/24/outline"
import ProfilePhoto from '../../profilePhoto/ProfilePhoto.jsx';
import ProfileDisplay from '../../profilePhoto/ProfileDisplay.jsx';
import BookingTab from './BookingTab.jsx';
import Card from '../../card/Card.jsx';

// mock data for the brides user information
const mockBrides =   {
        username: "sarah price",
        tag: "@thisbride34",
        type:"bride"
    }

// mock data for the bookings the bride has made
const bookingMock = [
    {
        bookingID: "a",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$200",
        bookingStatus: "confirmed",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "a"

    },
    {
        bookingID: "b",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "confirmed",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "b"

    },
    {
        bookingID: "c",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$1",
        bookingStatus: "pending",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "c"

    },
    {
        bookingID: "d",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$23424234",
        bookingStatus: "past",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "a"

    },
    {
        bookingID: "e",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "past",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "b"

    },
    {
        bookingID: "f",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "archived",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "c"

    }

]

// grouping the bookings into their status
let confirmedBookings = [];
let pendingBookings = [];
let pastBookings = [];
let archivedBookings = [];
for (let booking of bookingMock) {
    switch (booking.bookingStatus) {
        case "confirmed":
            confirmedBookings.push(booking);
            break;
        case "pending":
            pendingBookings.push(booking);
            break;
        case "past":
            pastBookings.push(booking);
            break;
            case "archived":
                archivedBookings.push(booking);
                break;
        default:

            break;
    }
}

/**
 * The brides profile, with the profile display, settings button, and booking tabs
 */
export const BridePage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}> 
            <div className="profile">
                {/* <!-- profile picture --> */}
                <div className="profile-photo">
                    <ProfileDisplay className={"h-full w-1/2"} profileData={mockBrides} ></ProfileDisplay>
                </div>
                {/* <!-- settings --> */}
                <div className="corner-button">
                        <Button className="word-icon-button">
                            <span>Settings</span>
                            <span><Cog8ToothIcon className="icon-base" /></span>
                        </Button>
                </div>
            </div>
            {/* booking tab */}
            <div className='booking-tab'>
                <BookingTab confirm={confirmedBookings} pending={pendingBookings} past={pastBookings} archived={archivedBookings}></BookingTab>
            </div>
        </WhiteBackground>
    );
};

export default BridePage;