/**
 * File Description: Button examples
 * File version: 1.0
 * Contributors: Josh, Nikki
 */

import React from "react";
import Button from "../../../button/Button";
import BackButton from "../../../button/BackButton";
import PreviousButton from "../../../button/PreviousButton";
import {Cog8ToothIcon} from "@heroicons/react/24/outline"


const ButtonExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Buttons:</div>
            <Button>Unstyled button</Button>
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover">
                Main purple with hover
            </Button>
            <Button className="bg-gradient-to-r from-bg-gradient-start to-bg-gradient-end">
                Background gradient
            </Button>
            <Button onClick={() => console.log("Hello")}>
                Click me and look at your console
            </Button>

            <div className="main-text underline">Specific Usage Buttons</div>
            <PreviousButton />
            <BackButton />
            <Button className="btn-base flex items-center"><span> Settings<Cog8ToothIcon className="min-h-4 w-4 cursor-pointer ml-1"/></span>
                </Button>
            <Button className="settings-button"><span>Settings</span><span><Cog8ToothIcon className="min-h-4 w-4 cursor-pointer"/></span></Button>
        </div>
    )
}

export default ButtonExamples;