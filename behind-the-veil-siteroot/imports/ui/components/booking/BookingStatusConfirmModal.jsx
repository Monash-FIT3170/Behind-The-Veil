/**
 * File Description: Bookings status confirmation modal
 * File version: 1.0
 * Contributors:  Nikki
 */

import React from 'react';
import {Modal} from "react-responsive-modal";
import {useNavigate} from "react-router-dom";
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/24/outline";
import Button from "../button/Button";
import BookingStatus from "../../enums/BookingStatus";
import {updateBookingStatus} from "../DatabaseHelper";
import bookings from "../../../api/collections/bookings";
import { useUserInfo } from '../util';

/**
 * Confirmation dialog that comes up when you accept/reject/complete/cancel a booking
 * @param open - if model is opened
 * @param closeHandler - function for closing model
 * @param bookingId - ID of booking to confirm status change
 * @param toBeStatus - status to change to
 * @param cancelAttributes - if changing to cancel, need extra attributes for canceled user data and reason
 * @param sideEffects - list of functions to call afterward, if any
 */
export const BookingStatusConfirmModal = ({open, closeHandler, bookingId, toBeStatus, cancelAttributes, sideEffects=[]}) => {
    const navigate = useNavigate();
    const userInfo = useUserInfo();

    const isBride = userInfo.type === 'bride';

    let statusText = ""
    let warningText = ""

    switch (toBeStatus) {
        case BookingStatus.COMPLETED:
            statusText = "Complete"
            warningText = "You won't be able to cancel a booking after it is completed."
            break
        case BookingStatus.CONFIRMED:
            statusText = "Accept"
            break
        case BookingStatus.REJECTED:
            statusText = "Reject"
            warningText = "This action cannot be reversed."
            break
        case BookingStatus.CANCELLED:
            statusText = "Cancel"
            warningText = "This action cannot be reversed."
            break
    }

    return (
        <Modal classNames={{
            modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue"
        }} open={open} onClose={closeHandler} center showCloseIcon={false}>
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col gap-3">
                    <h2 className="text-center title-text mb-3">
                        {statusText} booking?
                    </h2>
                    <span className="text-center main-text">Are you sure you want to {statusText.toLowerCase()} the booking?</span>
                    {warningText && <span className={"text-center main-text text-cancelled-colour"}>{warningText}</span>}
                    <div className="flex justify-center space-x-6 mt-5">
                        <Button className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[30px] pe-[30px] flex gap-1"
                                onClick={() => {
                                    updateBookingStatus(bookingId, toBeStatus, cancelAttributes, isBride);
                                    closeHandler();
                                    if (toBeStatus === BookingStatus.CANCELLED) {
                                        navigate(`/booking/${bookingId}`);
                                    }
                                    for (let i=0; i<sideEffects.length; i++) {
                                        sideEffects[i]();
                                    }
                                }}>
                            <CheckIcon className="icon-base" />
                            Yes
                        </Button>
                        <Button className="btn-base ps-[30px] pe-[30px] flex gap-1"
                                onClick={closeHandler}>
                            <NoSymbolIcon className="icon-base" />
                            No
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default BookingStatusConfirmModal;
