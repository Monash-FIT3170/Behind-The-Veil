/**
 * File Description: Card examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Card from "../../../card/Card";
import Button from "../../../button/Button";

const CardExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Cards:</div>
            <Card>
                This text is written on a card component.
            </Card>
            <Card className="bg-dark-grey text-white">
                You can also supply custom classes to this component to override the base styling if you really need to.
                To demonstrate, I've styled this card with a dark grey background and white text.
            </Card>
            <Card className="flex flex-col gap-2">
                Any component can be placed inside a card.
                For example, other divs:
                <div className="bg-light-grey w-fit p-2 rounded">Div with light grey background</div>
                Or buttons:
                <Button>Hello</Button>
            </Card>
        </div>
    )
}

export default CardExamples;