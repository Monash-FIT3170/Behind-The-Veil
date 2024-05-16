/**
 * File Description: White background for almost all pages
 * File version: 2.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";

import PageLayout from "../../enums/PageLayout";
import "./whiteBackground.css"
import LoginRegisterVisual from "../visuals/LoginRegisterVisual";

/**
 * Depending on the given pageLayout, returns a <div> which serves as the outermost component of any PAGE.
 * Large pages will reach the bottom of the screen always and small pages will mostly be aligned in the center of
 * the page (hence why the outer div has extra classes to ensure correct alignment in both axis). A single special
 * case is for the Messages page which splits into left and right.
 *
 * @param children of the div, e.g. text, icons, any other components. Can be indexed with [0], [1], etc.
 *   See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param pageLayout the layout required of the page, such as full sized (large) or small, center/left/right aligned,
 *   will be a value of Enum PageLayout class
 * @param divProps encompasses all other props supplied and applies them to the div
 */
export const WhiteBackground = ({children, className, pageLayout, ...divProps}) => {

    // the classes for the div outside the actual white page, determines its alignment (left/right/center)
    let outerDivClasses = "flex flex-row";

    // all pages will have a background with white-glass-base, and the standard shadow
    let pageMainDivClasses = classNames("white-glass-base standard-shadow", className);

    // some layouts have an extra background div on the left, like messages and sign in/up pages
    let pageSubDivClasses = null;

    if (!pageLayout || pageLayout === PageLayout.LARGE_CENTER) {
        // default to large center
        outerDivClasses = classNames("justify-center", outerDivClasses);
        pageMainDivClasses = classNames("large-page", pageMainDivClasses);

    } else if (pageLayout === PageLayout.SMALL_RIGHT) {
        // small page on the right (if page becomes too small, then it returns into the center to give more ui space)
        outerDivClasses = classNames("full-outermost-div items-center justify-center lg:justify-end", outerDivClasses);
        pageMainDivClasses = classNames("small-page", pageMainDivClasses);

        // has a left circular div for the visual - hides visual if screen is too small
        pageSubDivClasses = "white-glass-base hidden lg:flex " +
            "rounded-full h-[85vw] w-[100vw] translate-x-[-50%] fixed left-0 -top-[25vh]";

    } else if (pageLayout === PageLayout.SMALL_CENTER) {
        // small page in the center
        outerDivClasses = classNames("full-outermost-div items-center justify-center", outerDivClasses);
        pageMainDivClasses = classNames("small-page", pageMainDivClasses);

    } else if (pageLayout === PageLayout.MESSAGES_PAGE) {
        // message page which splits in the middle
        outerDivClasses = classNames("full-outermost-div items-end justify-center space-x-0", outerDivClasses);
        pageMainDivClasses = classNames("message-right", pageMainDivClasses);

        // has a left dark grey div for the list of contacts
        pageSubDivClasses = "grey-glass-base standard-shadow inner-shadow message-left";

    } else {
        // all other cases if it is not covered, default to large center
        outerDivClasses = classNames("justify-center", outerDivClasses);
        pageMainDivClasses = classNames("large-page", pageMainDivClasses);
    }

    if (!pageSubDivClasses) {
        // if there is no sub div, only 1 main div, then return that main one
        return (<div className={outerDivClasses}>
            <div {...divProps} className={pageMainDivClasses}>
                {children}
            </div>
        </div>);
    } else if (pageLayout === PageLayout.SMALL_RIGHT) {
        // sub-div, on the right with visual on the left
        return (
            <div className={outerDivClasses}>

                {/*left white semicircle*/}
                <div className={pageSubDivClasses}></div>
                {/*left visual*/}
                <LoginRegisterVisual/>

                <div className={pageMainDivClasses}>
                    {children}
                </div>
            </div>
        );
    } else {
        // sub-div, for Messages page
        return (
            <div className={outerDivClasses}>
                <div className={pageSubDivClasses}>
                    {children[0]}
                </div>
                <div className={pageMainDivClasses}>
                    {children[1]}
                </div>
            </div>
        );
    }
};

export default WhiteBackground;
