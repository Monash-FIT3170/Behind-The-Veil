import React, { useState, useRef } from 'react';
import Button from "../../../button/Button";
import CalendarPopup from "../../../calendar/CalendarPopup";
import { BookingStatus } from "../../../../enums/BookingStatus"

const CardExamples = () => {
    const buttonRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => setPopupOpen(true);
    const closePopup = () => setPopupOpen(false);

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Calendar:</div>
            <div className='relative'>
                <div ref={buttonRef} style={{ display: 'inline-block' }}>
                    <Button onClick={openPopup}>Open Popup</Button>
                </div>
                <CalendarPopup
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    className="absolute left-2"
                    bookingId={111111}
                    brideName={"Jane Doe"}
                    bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                    bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                    bookingStatus={BookingStatus.PENDING}
                    buttonRef={buttonRef}
                ></CalendarPopup>
            </div>
            {/* <CalendarPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                className=""
                bookingId={111111}
                brideName={"Jane Doe"}
                bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                bookingStatus={BookingStatus.CONFIRMED}
            ></CalendarPopup>
            <CalendarPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                className=""
                bookingId={111111}
                brideName={"Jane Doe"}
                bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                bookingStatus={BookingStatus.PENDING_CANCELLATION}
            ></CalendarPopup> */}
        </div>
    )
}

export default CardExamples;