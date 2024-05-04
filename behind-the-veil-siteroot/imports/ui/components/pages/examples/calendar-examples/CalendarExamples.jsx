import React, { useState } from 'react';
import Button from "../../../button/Button";
import ServiceCard from "../../../card/ServiceCard";
import CalendarPopup from "../../../calendar/CalendarPopup";

const CardExamples = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => setPopupOpen(true);
    const closePopup = () => setPopupOpen(false);

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Calendar:</div>
            <Button onClick={openPopup}>Open Popup</Button>
            <CalendarPopup 
                isOpen={isPopupOpen} 
                onClose={closePopup}
                className=""
                bookingId={111111}
                brideName={"Jane Doe"}
                bookingTime={"Thu 21/03/23 10:00AM - 12:00PM"}
                bookingLocation={"123 Arts Studio, Painting Avenue 555, NSW"}
                ></CalendarPopup>
        </div>
    )
}

export default CardExamples;