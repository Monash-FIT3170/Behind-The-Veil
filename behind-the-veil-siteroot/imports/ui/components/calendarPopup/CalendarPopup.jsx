/**
 * File Description: Calendar popup component, handles popup logic
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useRef } from "react";
import CalendarPopupContent from "./CalendarPopupContent";
import { arrow, autoPlacement, autoUpdate, FloatingArrow, offset, shift, useClick, useFloating, useInteractions } from "@floating-ui/react";


const CalendarPopup = ({
    bookingStatus,
    brideName,
    bookingTime,
    bookingLocation,
    activeElement,
    onClose
}) => {
    const arrowRef = useRef()
    const ARROW_HEIGHT = 20;
    const ARROW_WIDTH = 40;

    const { refs, floatingStyles, context } = useFloating({
        middleware: [
            offset(ARROW_HEIGHT), // distance from reference. from docs: "offset() should generally be placed at the beginning of your middleware array."
            autoPlacement(), // auto places in area with most space
            shift({ padding: 8 }), // auto shifts so that it stays in viewport
            arrow({ element: arrowRef }), // provides data for popup arrow. from docs: "arrow() should generally be placed toward the end of your middleware array, after shift() (if used)."
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
                    height={ARROW_HEIGHT}
                    width={ARROW_WIDTH}
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