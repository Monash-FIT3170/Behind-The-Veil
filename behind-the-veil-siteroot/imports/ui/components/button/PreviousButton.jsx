/**
 * File Description: Previous button component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Button from "/imports/ui/components/button/Button.jsx"
import {ChevronLeftIcon} from "@heroicons/react/24/outline";

/**
 * Previous button component.
 * A button that always redirects the user to from where they came from. Same function as the browser back button.
 * This is different to the "BackButton" component which takes you one layer up in the URL.
 *
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 */
const PreviousButton = (className) => {
    const buttonClasses = classNames("flex flex-row items-center gap-x-2 " +
        "bg-transparent hover:bg-transparent text-dark-grey hover:text-our-black", className);
    let navigate = useNavigate();

    return (
        <Button className={buttonClasses} type="button" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className={"h-7 w-7 cursor-pointer"}/> Prev
        </Button>
    );
};

export default PreviousButton;