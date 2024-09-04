/**
 * File Description: Input component
 * File version: 1.1
 * Contributors: Nikki
 */

import React from "react";
import classNames from "classnames";

/**
 * General input component.
 * @param {JSX.Element} children children of the input component, e.g. text, icons, other components. See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param {string} className custom classes that override the base button style, e.g. background color, font, etc
 * @param {JSX.Element} label - an optional html label element
 * @param inputProps encompasses all other props supplied to the input, such as type, placeholder, etc
 */
const Input = ({ children, className, label, ...inputProps }) => {
  const inputClasses = classNames("input-base", className);

  if (label) {
    // label given
    return (
      <div className="flex flex-col gap-1">
        {label}
        <input className={inputClasses} {...inputProps}>
          {children}
        </input>
      </div>
    );
  } else {
    // no label given
    return (
      <input className={inputClasses} {...inputProps}>
        {children}
      </input>
    );
  }
};

export default Input;
