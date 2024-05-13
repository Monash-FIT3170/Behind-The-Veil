/**
 * File Description: Card examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Card from "../../card/Card";
import Button from "../../button/Button";

const BridesBookingCards = () => {
    return (
        <div className="flex flex-col gap-3">
            
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

export default BridesBookingCards;