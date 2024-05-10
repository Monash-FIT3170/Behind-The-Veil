/**
 * File Description: Button component
 * File version: 1.2
 * Contributors: Josh
 */

import React from "react";
import classNames from "classnames";

/**
 * General button component.
 * forwardRef allows a component to accept a ref from a higher level component and assign it to a child component, see https://react.dev/reference/react/forwardRef
 * @param children children of the button component, e.g. text, icons, other components. See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param type
 * @param inputProps encompasses all other props supplied to the input, such as type, placeholder, etc
 */
const Input = ({ children, className, ...inputProps }) => {
    const buttonClasses = classNames("input-base", className);
    return (
        <input className={buttonClasses} {...inputProps}>
            {children}
        </input>
    );
};

export default Input;
