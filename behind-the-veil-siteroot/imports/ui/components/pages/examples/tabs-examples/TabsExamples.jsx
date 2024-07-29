/**
 * File Description: Tabs examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import Tabs from "../../../tabs/Tabs";
import Card from "../../../card/Card";
import Button from "../../../button/Button";

/**
 * Examples of simple tabs. Tabs component uses headless UI: https://headlessui.com/react/tabs
 */
const TabsExamples = () => {
    const uselessButtonsPanel = (
        <div key="buttons" className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <Button className="h-fit">{":)"}</Button>
            <Button className="h-fit">{":|"}</Button>
            <Button className="h-fit">{":("}</Button>
        </div>
    )

    const purpleSquaresPanel = (
        <div key="squares" className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
            <div className="bg-secondary-purple w-5 h-5"></div>
        </div>
    )

    const blackRectanglesPanel = (
        <div key="rectangles" className="p-4 flex gap-4 h-40 border-light-grey border-2 mt-2 rounded-3xl">
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
            <div className="bg-our-black w-7 h-2"></div>
        </div>
    )

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Tabs:</div>
            <div className="flex flex-col gap-3 w-1/2">
                {"Basic tabs, demonstrated with just text. These are also accessible (try using arrow and tab keys to navigate):"}
                <Card className="w-full">
                    <Tabs
                        tabs={[
                            <span key={1}>Tab 1</span>,
                            <span key={2}>Tab 2</span>
                        ]}
                        tabPanels={[
                            <span key={1}>Tab Panel 1</span>,
                            <span key={2}>Tab Panel 2</span>
                        ]}
                    />
                </Card>
            </div>
            <div className="flex flex-col gap-3">
                Most of the time, strings will be just fine for the tabs themselves, but we will most likely
                want more complex components in the tab panel section, which we can do like so:
                <Card className="w-full">
                    <Tabs
                        tabs={[
                            <span key={1}>Useless buttons</span>,
                            <span key={2}>Purple squares</span>,
                            <span key={3}>Black rectangles</span>
                        ]}
                        tabPanels={[uselessButtonsPanel, purpleSquaresPanel, blackRectanglesPanel]}
                    />
                </Card>
            </div>
        </div>
    )
}

export default TabsExamples;