/**
 * File Description: Back button component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import classNames from "classnames";
import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";

/**
 * Back button component.
 * A button that redirects one level above in the URL. e.g. from /bookings/1234556 -> /bookings even
 * if they arrived onto the /booking/1234556/ page from another page.
 *
 * This is different to the "PrevButton" component which takes you back the page you came from.
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param {string} to - option parameter to hard code where this button leads to
 */
const BackButton = ({className, to}) => {

    const buttonClasses = "flex flex-row items-center justify-start gap-x-2 py-2 px-4 full w-fit min-w-28 rounded-full " +
        "main-text font-bold text-dark-grey hover:bg-white-hover hover:text-our-black transition duration-500"
    const classes = classNames(buttonClasses, className);

    return (
        <Link className={classes} to={to ? to : ".."}>
            <ChevronLeftIcon className={"size-7 stroke-2 cursor-pointer"}/> Back
        </Link>
    );
};

export default BackButton;
