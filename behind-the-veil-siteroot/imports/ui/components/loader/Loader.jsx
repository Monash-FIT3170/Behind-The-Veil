/**
 * File Description: Loader component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import LoaderComponent from "react-spinners/BounceLoader";
import classNames from "classnames";

/**
 * General loader component.
 *
 * @param {string} className - custom classes for the outer container class that override the base style
 * @param {string} loadingText - the text that displays under the loader
 * @param {boolean} isLoading - boolean parameter that responds when page is loading/not loading
 * @param {number} size - size of the loader
 * @param {number} speed - speed of the loader's animation
 * @param loaderProps - other properties to pass into the loader
 */
const Loader = ({className, loadingText, isLoading, size, speed,...loaderProps}) => {

    const loaderClasses = classNames("flex flex-col items-center justify-center gap-y-10", className);

    // text that is displayed under the moving loading icon
    const [text, setText] = React.useState(loadingText);

    if (!loadingText) {
        // if not given a loader text, put in default loader text
        setText("Loading . . .");
    }
    return (<div className={loaderClasses}>
            <LoaderComponent
                speedMultiplier={speed}
                color={"#818FF8"}
                loading={isLoading}
                size={size}
                {...loaderProps}
            />
            <div className={"main-text"}> {text}</div>
        </div>
    );
};

export default Loader;
