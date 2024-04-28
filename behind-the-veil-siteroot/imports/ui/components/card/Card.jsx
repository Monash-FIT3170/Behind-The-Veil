/**
 * File Description: Card component
 * File version: 1.1
 * Contributors: Josh
 */

import React from "react";
import classNames from "classnames";

/**
 * General card component
 * @param children children of the card component, e.g. text, icons, other components. See https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
 * @param className custom classes that override the base style, e.g. background color, font, etc
 * @param cardProps encompasses all other props supplied and applies them to the card
 */
const Card = ({ children, className, ...cardProps }) => {
  const cardClasses = classNames("card-base", className);
  return (
    <div className={cardClasses} {...cardProps}>
      {children}
    </div>
  );
};

export default Card;
