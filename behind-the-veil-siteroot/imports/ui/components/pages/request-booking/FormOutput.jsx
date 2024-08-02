/**
 * File Description: Form output component
 * File version: 1.1
 * Contributors: Neth, Nikki
 */

import React from "react";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames";

/**
 * FormOutput component displays a label and input field, with an optional tooltip.
 * @param {string} label - The label for the input field.
 * @param {string} input - The input value.
 * @param {string} textColor - The color of the label text.
 * @param {boolean} haveHelpText - Indicates if the tooltip should be displayed.
 * @param {string} tipText - The text to be displayed in the tooltip.
 * @param {string} className - custom classes that override the base style, e.g. background color, font, etc
 * @returns {JSX.Element} - The rendered FormOutput component.
 */
const FormOutput = ({ label, input, textColor, haveHelpText, tipText, className}) => {
    const classes = classNames("flex flex-col sm:flex-row gap-y-2 text", className);

    return (
        <div className={classes}>
            <span className={`min-w-[150px] ${textColor} font-semibold`}>
                {label}
            </span>
            <span className="input font-semibold">
                {input}
            </span>
            {haveHelpText && (
                <span className="content-center ml-2">
                    <Tippy
                        render={attrs => (
                            <div className="box border border-main-blue rounded-lg mt-1 px-4 py-2 white-glass-base shadow-lg w-80" tabIndex="-1" {...attrs}>
                                {tipText}
                            </div>
                        )}>
                        <QuestionMarkCircleIcon className="tooltip-icon size-4 text-hyperlink-colour"/>
                    </Tippy>
                </span>
            )}
        </div>
    );
};

export default FormOutput;