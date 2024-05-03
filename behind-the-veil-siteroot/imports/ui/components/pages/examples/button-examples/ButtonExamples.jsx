/**
 * File Description: Button examples
 * File version: 1.0
 * Contributors: Josh, Nikki
 */

import React from "react";
import Button from "../../../button/Button";
import BackButton from "../../../button/BackButton";
import PreviousButton from "../../../button/PreviousButton";

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

            <PreviousButton />
            <BackButton />
        </div>
    )
}

export default ButtonExamples;