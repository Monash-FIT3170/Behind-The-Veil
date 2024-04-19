import React from "react";
import classNames from "classnames";

/**
 * General button component
 * @param children children of the button component, e.g. text, icons, other components
 * @param className custom classes that override the base button style, e.g. background color, font, etc
 * @param buttonProps encompasses all other props supplied and applies them to the button
 */
const Button = ({ children, className, ...buttonProps }) => {
  const buttonClasses = classNames("btn-base", className);
  return (
    <button {...buttonProps} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
