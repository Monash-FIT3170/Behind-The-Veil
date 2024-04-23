/**
 * File Description: White background for almost all pages
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";

import PageLayout from "../../enums/PageLayout";
import "./whiteBackground.css"

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

    // all will have the class white-glass-base, and the standard shadow
    let pageDivClasses = classNames("white-glass-base standard-shadow", className);

    // the classes for the div outside the actual white page, determines its alignment (left/right/center)
    let outerDivClasses = "flex flex-row";

    if (!pageLayout || pageLayout === PageLayout.LARGE_CENTER) {
        // default to large center
        pageDivClasses = classNames("large-page", pageDivClasses);
        outerDivClasses = classNames("justify-center", outerDivClasses);

    } else if (pageLayout === PageLayout.SMALL_LEFT) {
        // small page on the left (if page becomes too small, then it returns into the center to give more space)
        pageDivClasses = classNames("small-page", pageDivClasses);
        outerDivClasses = classNames("full-outermost-div items-center justify-center lg:justify-start", outerDivClasses);

    } else if (pageLayout === PageLayout.SMALL_RIGHT) {
        // small page on the right (if page becomes too small, then it returns into the center to give more space)
        pageDivClasses = classNames("small-page", pageDivClasses);
        outerDivClasses = classNames("full-outermost-div items-center justify-center lg:justify-end", outerDivClasses);

    } else if (pageLayout === PageLayout.SMALL_CENTER) {
        // small page in the center
        pageDivClasses = classNames("small-page", pageDivClasses);
        outerDivClasses = classNames("full-outermost-div items-center justify-center", outerDivClasses);

    } else if (pageLayout === PageLayout.MESSAGES_PAGE) {
        // special case: message page which splits in the middle
        outerDivClasses = classNames("full-outermost-div items-end justify-center space-x-0 ", outerDivClasses);

        return (<div className={outerDivClasses}>
                <div className={"grey-glass-base standard-shadow inner-shadow message-left"}>
                    {children[0]}
                </div>

                <div className={"white-glass-base standard-shadow message-right"}>
                    {children[1]}
                </div>
            </div>
        );

    } else {
        // all other cases if it is not covered, default to large center
        pageDivClasses = classNames("large-page", pageDivClasses);
        outerDivClasses = classNames("justify-center", outerDivClasses);
    }

    return (<div className={outerDivClasses}>
        <div {...divProps} className={pageDivClasses}>
            {children}
        </div>
    </div>);
};

export default WhiteBackground;
