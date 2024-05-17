/**
 * File Description: Status Tooltip component
 * File version: 1.1
 * Contributors: Glenn
 */

import React from "react";
import {
  XMarkIcon,
  ClockIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react/headless";

const StatusProps = {
  Pending: {
    text: "Pending",
    textColor: "text-sky-700",
    icon: (
      <ClockIcon className="tooltip-icon size-5 text-hyperlink-colour text-sky-700" />
    ),
  },
  Confirmed: {
    text: "Confirmed",
    textColor: "text-emerald-700",
    icon: (
      <CheckIcon className="tooltip-icon size-6 text-hyperlink-colour text-emerald-700" />
    ),
  },
  Rejected: {
    text: "Rejected",
    textColor: "text-rose-700",
    icon: (
      <XMarkIcon className="tooltip-icon size-6 text-hyperlink-colour text-rose-700 " />
    ),
  },
  Cancelled: {
    text: "Cancelled",
    textColor: "text-rose-700",
    icon: (
      <XMarkIcon className="tooltip-icon size-6 text-hyperlink-colour text-rose-700" />
    ),
  },
  Completed: {
    text: "Completed",
    textColor: "text-text-emerald-100-grey",
    icon: (
      <CheckIcon className="tooltip-icon size-6 text-hyperlink-colour text-emerald-100" />
    ),
  },
};
/***
 * @param {string} status : status of the booking, confirmed, pending, etc 
 * @param {string} tipText : the content of the tiptext 
 */
const Tooltip = ({ status, tipText }) => {
  const { text, textColor, icon } = StatusProps[status];
  return (
    <div className="flex text items-center">
      {icon}
      <span
        className={` ${textColor} font-semibold text-right mr-2 ml-1 text-rose-700`}
      >
        {text}
      </span>
      <span class="flex items-center">
        <Tippy
          placement="bottom"
          render={(attrs) => (
            <div
              className="box border border-main-blue rounded-lg mt-1 px-4 py-2 bg-glass-panel-background shadow-lg w-130"
              tabIndex="-1"
              {...attrs}
            >
              {tipText}
            </div>
          )}
        >
          <QuestionMarkCircleIcon className="tooltip-icon size-5 text-hyperlink-colour" />
        </Tippy>
      </span>
    </div>
  );
};

export default Tooltip;
