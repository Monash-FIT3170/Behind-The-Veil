/**
 * File Description: Login page
 * File version: 1.0
 * Contributors:
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

const mockBrides =   {
        username: "sarah price",
        tag: "@thisbride34",
        type:"bride"

    }

const bookingMock = [
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$200",
        bookingStatus: "confirmed",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "serving"

    },
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "confirmed",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "serving"

    },
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "pending",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "some string other"

    },
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$23424234",
        bookingStatus: "past",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "some string other"

    },
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "past",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "serving"

    },
    {
        bookingID: "some string",
        bookingStartDate: "01/02/2022",
        bookingDuration: "1 hour",
        bookingLocation: "ringwood",
        bookingPrice: "$300",
        bookingStatus: "archived",
        brideUserName: "looking_fint555",
        artistUserName: "bob_ross333",
        serviceID: "serving"

    }

]
let confirmedBookings = [];
let pendingBookings = [];
let pastBookings = [];
let archivedBookings = [];

// Loop through the bookingMock array and separate bookings based on status
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

console.log(confirmedBookings[0].bookingID)


/**
 * Page of a list of Artist cards for users to see
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
        
            <div className='booking-tab'>
                <BookingTab confirm={confirmedBookings} pending={pendingBookings} past={pastBookings} archived={archivedBookings}></BookingTab>
            </div>


        </WhiteBackground>
    );
};

export default BridePage;