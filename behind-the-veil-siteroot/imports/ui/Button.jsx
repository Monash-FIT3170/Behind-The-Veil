import React from "react";

/**
 * General button component
 * @param {*} param0
 * @returns
 */
const Button = ({ children, className, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={`${className} font-bold py-2 px-4 rounded-full w-fit`}
    >
      {children}
    </button>
  );
};

export default Button;
