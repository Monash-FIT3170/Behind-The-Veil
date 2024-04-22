/**
 * File Description: Button component
 * File version: 1.1
 * Contributors: Josh
 */

import React, { forwardRef } from "react";
import classNames from "classnames";

/**
 * General button component.
 * forwardRef allows a component to accept a ref from a higher level component and assign it to a child component, see https://react.dev/reference/react/forwardRef
 * @param children children of the button component, e.g. text, icons, other components. See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param buttonProps encompasses all other props supplied and applies them to the button
 */
const Button = forwardRef(({ children, className, ...buttonProps }, ref) => {
  const buttonClasses = classNames("btn-base", className);
  return (
    <button ref={ref} {...buttonProps} className={buttonClasses} type="button">
      {children}
    </button>
  );
});

export default Button;
