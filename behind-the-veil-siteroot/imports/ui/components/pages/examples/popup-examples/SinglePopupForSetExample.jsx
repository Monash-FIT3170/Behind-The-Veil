/**
 * File Description: Single popup for a set of buttons example
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useState, useRef } from "react";
import Button from "../../../button/Button";
import { arrow, autoPlacement, FloatingArrow, offset, useClick, useFloating, useInteractions } from "@floating-ui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SinglePopupForSetExample = () => {
    const [activeElement, setActiveElement] = useState(null)
    const [popupContent, setPopupContent] = useState(null)
    const arrowRef = useRef()

    const { refs, floatingStyles, context } = useFloating({
        middleware: [
            offset(10),
            autoPlacement(),
            arrow({ element: arrowRef })
        ],
        elements: { reference: activeElement }
    });

    const click = useClick(context);

    const { getFloatingProps } = useInteractions([
        click,
    ]);

    const closePopup = () => {
        setActiveElement(null)
        setPopupContent(null)
    }

    const buttonItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    return (
        <>
            <div className="large-text">One popup for a set of references:</div>
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
                            key={item}
                        >
                            {item}
                        </Button>
                    )
                })}
            </div>
            {activeElement && (
                <div
                    ref={refs.setFloating}
                    className="border border-dark-grey rounded p-4 bg-white flex flex-col gap-2"
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
                    <button
                        className="self-end"
                        onClick={closePopup}
                    >
                        <XMarkIcon className="icon-base" />
                    </button>
                    {`Popup for button ${popupContent}`}
                </div>
            )}
        </>
    )
}

export default SinglePopupForSetExample