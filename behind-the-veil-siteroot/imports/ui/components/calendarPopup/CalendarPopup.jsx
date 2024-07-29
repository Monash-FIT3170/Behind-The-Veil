/**
 * File Description: Calendar popup component, handles popup logic
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useRef } from "react";
import CalendarPopupContent from "./CalendarPopupContent";
import { arrow, autoPlacement, autoUpdate, FloatingArrow, offset, useClick, useFloating, useInteractions } from "@floating-ui/react";


const CalendarPopup = ({
    bookingStatus,
    brideName,
    bookingTime,
    bookingLocation,
    activeElement,
    onClose
}) => {
    const arrowRef = useRef()

    const { refs, floatingStyles, context } = useFloating({
        middleware: [
            offset(10),
            autoPlacement(),
            arrow({ element: arrowRef })
        ],
        elements: { reference: activeElement },
        whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);

    const { getFloatingProps } = useInteractions([
        click,
    ]);

    return (
        activeElement && (
            <div
                ref={refs.setFloating}
                className="border border-dark-grey rounded-2xl p-4 bg-white flex flex-col gap-2"
                style={floatingStyles}
                {...getFloatingProps()}
            >
                <FloatingArrow
                    ref={arrowRef}
                    context={context}
                    className="
                        fill-white 
                        [&>path:first-of-type]:stroke-dark-grey
                        [&>path:last-of-type]:stroke-dark-grey
                        "
                />
                <CalendarPopupContent
                    bookingStatus={bookingStatus}
                    brideName={brideName}
                    bookingTime={bookingTime}
                    bookingLocation={bookingLocation}
                    onClose={onClose}
                />
            </div>
        )
    )
}

export default CalendarPopup