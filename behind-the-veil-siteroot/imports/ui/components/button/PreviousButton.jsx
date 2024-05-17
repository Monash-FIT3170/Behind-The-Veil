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
 * @param {string} className - custom classes that override the base button style, e.g. background color, font, etc
 * @param {string} to - option parameter to hard code where this button leads to
 */
const PreviousButton = ({className, to}) => {
    const buttonClasses = classNames("flex flex-row items-center gap-x-2 " +
        "bg-transparent hover:bg-transparent hover:bg-white-hover text-dark-grey hover:text-our-black", className);
    let navigate = useNavigate();

    return (
        <Button className={buttonClasses} type="button" onClick={() => to ? navigate(to) : navigate(-1)}>
            <ChevronLeftIcon className={"size-7 stroke-2 cursor-pointer"}/> Prev
        </Button>
    );
};

export default PreviousButton;
