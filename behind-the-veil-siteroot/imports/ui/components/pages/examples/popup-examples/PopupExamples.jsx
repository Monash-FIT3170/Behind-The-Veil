/**
 * File Description: Popup examples
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useState, useRef } from "react";
import Button from "../../../button/Button";
import { useFloating, useInteractions, useClick, offset, autoPlacement, arrow, FloatingArrow } from '@floating-ui/react';

const PopupExamples = () => {
    const [isOpen, setIsOpen] = useState(false)
    const arrowRef = useRef()

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset(10),
            autoPlacement(),
            arrow({ element: arrowRef })
        ],
    })

    const click = useClick(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
    ]);

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Popups:</div>
            <Button
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                Click for auto-placed popup
            </Button>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    className="border border-dark-grey rounded p-4 bg-white"
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
                    Floating element
                </div>
            )}
        </div>
    )
}

export default PopupExamples;