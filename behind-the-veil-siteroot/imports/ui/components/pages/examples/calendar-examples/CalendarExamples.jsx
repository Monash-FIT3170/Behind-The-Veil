import React, { useState, useRef } from 'react';
import Button from "../../../button/Button";
import CalendarPopup from "../../../calendar/CalendarPopup";
import { BookingStatus } from "../../../../enums/BookingStatus"

const CardExamples = () => {
    const buttonRef1 = useRef(null);
    const buttonRef2 = useRef(null);
    const [isPopupOpen1, setPopupOpen1] = useState(false);
    const [isPopupOpen2, setPopupOpen2] = useState(false);

    const openPopup1 = () => setPopupOpen1(true);
    const closePopup1 = () => setPopupOpen1(false);

    const openPopup2 = () => setPopupOpen2(true);
    const closePopup2 = () => setPopupOpen2(false);

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Calendar:</div>
            <div className='relative'>
                <div ref={buttonRef1} style={{ display: 'inline-block' }}>
                    <Button onClick={openPopup1}>Open Popup</Button>
                </div>
                <CalendarPopup
                    isOpen={isPopupOpen1}
                    onClose={closePopup1}
                    className="absolute left-2"
                    bookingId={111111}
                    brideName={"Jane Doe"}
                    bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                    bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                    bookingStatus={BookingStatus.PENDING}
                    buttonRef={buttonRef1}
                    isPopupOnRight={true}
                ></CalendarPopup>
            </div>
            <div className='relative' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div ref={buttonRef2} style={{ display: 'inline-block' }}>
                    <Button onClick={openPopup2}>Open Popup</Button>
                </div>
                <CalendarPopup
                    isOpen={isPopupOpen2}
                    onClose={closePopup2}
                    className="absolute left-2"
                    bookingId={111111}
                    brideName={"Jane Doe"}
                    bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                    bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                    bookingStatus={BookingStatus.PENDING}
                    buttonRef={buttonRef2}
                    isPopupOnRight={false}
                ></CalendarPopup>
            </div>
        </div>
    )
}

export default CardExamples;