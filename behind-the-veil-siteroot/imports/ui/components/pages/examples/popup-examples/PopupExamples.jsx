/**
 * File Description: Popup examples
 * File version: 1.0
 * Contributors: Josh
 */

import React, { useState } from "react";
import Button from "../../../button/Button";
import { useFloating, useInteractions, useClick } from '@floating-ui/react';

const PopupExamples = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen
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
                Click for popup
            </Button>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    Floating element
                </div>
            )}
        </div>
    )
}

export default PopupExamples;