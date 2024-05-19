/**
 * File Description: Tab component
 * File version: 1.0
 * Contributors: Josh
 */
import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

/**
 * Basic reusable tabs component.
 * Uses headless UI: https://headlessui.com/react/tabs
 * Uses @headlessio/tailwindcss plugin for certain selectors: https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss
 * @param {Array} tabs Text/components that are to be displayed from left to right in the tab list. Each tab should correspond to the tab panel of the same index in the accompanying tabPanels array
 * @param {Array} tabPanels Text/components to be rendered in the tab panel. Each tab panel should correspond to the tab of the same index in the accompanying tabs array
 * @returns tabs component
 */
const Tabs = ({
  tabs = [],
  tabPanels = [],
  tabsClassName,
  tabPanelsClassName,
}) => {
  return (
    <Tab.Group>
      <Tab.List
        className={classNames(
          "overflow-auto text-dark-grey main-text border-b-2 border-light-grey",
          tabsClassName
        )}
      >
        {tabs.map((tab) => {
          return (
            <Tab className="py-2 px-8 border-b-2 border-transparent ui-selected:border-b-black ui-selected:text-our-black">
              {tab}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className={tabPanelsClassName}>
        {tabPanels.map((tabPanel) => {
          return <Tab.Panel>{tabPanel}</Tab.Panel>;
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
