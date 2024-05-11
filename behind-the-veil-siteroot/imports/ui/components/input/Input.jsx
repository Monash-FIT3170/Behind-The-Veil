/**
 * File Description: Input component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import classNames from "classnames";

/**
 * General input component.
 * @param children children of the input component, e.g. text, icons, other components. See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param inputProps encompasses all other props supplied to the input, such as type, placeholder, etc
 */
const Input = ({ children, className, ...inputProps }) => {
    const inputClasses = classNames("input-base", className);
    return (
        <input className={inputClasses} {...inputProps}>
            {children}
        </input>
    );
};

export default Input;
