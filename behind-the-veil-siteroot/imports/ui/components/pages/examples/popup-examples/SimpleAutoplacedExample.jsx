/**
 * File Description: Simple autoplaced popup example
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useState, useRef } from "react";
import Button from "../../../button/Button";
import { arrow, autoPlacement, FloatingArrow, offset, useClick, useFloating, useInteractions } from "@floating-ui/react";

const SimpleAutoplacedExample = () => {
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
        <>
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
        </>
    )
}

export default SimpleAutoplacedExample