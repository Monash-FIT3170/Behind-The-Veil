/**
 * File Description: Button examples
 * File version: 1.1
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

            {/*Settings buttons*/}
            <Button className="flex flex-row justify-center items-center gap-x-1.5 sm:w-36">
                <Cog8ToothIcon className="icon-base"/>
                <span className={"hidden sm:flex"}>
                        Settings
                    </span>
            </Button>
        </div>
    )
}

export default ButtonExamples;