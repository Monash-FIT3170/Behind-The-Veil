/**
 * File Description: Examples page
 * File version: 1.1
 * Contributors: Josh, Nikki
 */

import React from "react";
import Card from "../../card/Card.jsx";
import ServiceDetailsHeader from "../../service-details-header/ServiceDetailsHeader.jsx";
import Button from "../../button/Button.jsx";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Page to showcase examples
 */
const Examples = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="title-text">Examples</div>
            <div className="flex flex-col gap-3">
                <div className="large-text underline">Buttons:</div>
                <Button>Unstyled button</Button>
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover">
                    Main purple with hover
                </Button>
                <Button className="bg-gradient-to-r from-bg-gradient-start to-bg-gradient-end">
                    Background gradient
                </Button>
                <Button onClick={() => console.log("Hello")}>
                    Click me and look at your console
                </Button>
            </div>
            <div className="flex flex-col gap-3">
                <div className="large-text underline">Font styles:</div>
                <div className="title-text">title-text</div>
                <div className="main-text">main-text</div>
                <div className="large-text">large-text</div>
                <div className="medium-text">medium-text</div>
                <div className="small-text">small-text</div>
                <div className="large-number-text">large-number-text</div>
                <div className="logo-text">logo-text</div>
                <div className="message-tag-text">message-tag-text</div>
                <div className="message-receiver-name-text">
                    message-receiver-name-text
                </div>
                <div className="message-read-text">message-read-text</div>
                <div className="message-unread-text">message-unread-text</div>
                <div className="message-name-read-text">message-name-read-text</div>
                <div className="message-name-unread-text">message-name-unread-text</div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="large-text underline">Cards:</div>
                <Card>
                    This text is written on a card component.
                </Card>
                <Card className="bg-dark-grey text-white">
                    You can also supply custom classes to this component to override the base styling if you really need
                    to.
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
            <div className="flex flex-col gap-3">
                <div className="large-text underline">Service Details Header</div>
                <ServiceDetailsHeader
                    service="Super Awesome Makeover"
                    date="1 Apr 2000"
                    artist="Bruce Wayne"
                    price="$9999"
                />
            </div>
        </WhiteBackground>
    );
};

export default Examples;

