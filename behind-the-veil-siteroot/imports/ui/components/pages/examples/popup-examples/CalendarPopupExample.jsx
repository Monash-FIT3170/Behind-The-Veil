/**
 * File Description: Calendar popup example
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useState } from "react";
import Button from "../../../button/Button";
import BookingStatus from "../../../../enums/BookingStatus";
import CalendarPopup from "../../../calendarPopup/CalendarPopup";

const CalendarPopupExample = () => {
    const [activeElement, setActiveElement] = useState(null)
    const [popupContent, setPopupContent] = useState({
        bookingStatus: null,
        brideName: null,
        bookingTime: null,
        bookingLocation: null,
    })

    const closePopup = () => {
        setActiveElement(null)
        setPopupContent(null)
    }

    const buttonItems = [
        {
            bookingId: '0',
            bookingStatus: BookingStatus.PENDING,
            brideName: 'Annie',
            bookingTime: 'Thu 21/03/23 10:00AM - 12:00PM',
            bookingLocation: '123 Arts Studio, Painting Avenue 555, NSW',
        },
        {
            bookingId: '1',
            bookingStatus: BookingStatus.CONFIRMED,
            brideName: 'Bonnie',
            bookingTime: 'Fri 22/03/23 10:00AM - 12:00PM',
            bookingLocation: 'Somewhere else',
        },
        {
            bookingId: '2',
            bookingStatus: BookingStatus.CANCELLED,
            brideName: 'Charlie',
            bookingTime: 'Sat 23/03/23 10:00AM - 12:00PM',
            bookingLocation: 'Another place',
        },
    ]

    return (
        <>
            <div className="large-text">Calendar popups:</div>
            <div>
                Click on these buttons to view the corresponding type of popup that you would see in the artist's calendar view.
            </div>
            <div className="grid grid-cols-3 gap-4">
                {buttonItems.map((item) => {
                    return (
                        <Button
                            onClick={(e) => {
                                // close popup if the same reference is clicked again
                                if (e.target === activeElement) {
                                    closePopup()
                                }
                                else {
                                    setActiveElement(e.target)
                                    setPopupContent(item)
                                }
                            }}
                            key={item.bookingId}
                        >
                            {item.bookingStatus}
                        </Button>
                    )
                })}
            </div>
            <CalendarPopup
                bookingStatus={popupContent?.bookingStatus}
                brideName={popupContent?.brideName}
                bookingTime={popupContent?.bookingTime}
                bookingLocation={popupContent?.bookingLocation}
                onClose={closePopup}
                activeElement={activeElement}
            />
        </>
    )
}

export default CalendarPopupExample