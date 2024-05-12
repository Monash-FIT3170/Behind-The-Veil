/**
 * File Description: Input examples
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import SearchBarExamples from "./SearchBarExamples";
import Input from "/imports/ui/components/input/Input.jsx";

const InputExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Inputs:</div>

            <div className="main-text underline">Special ones:</div>
            <div className="flex flex-row flex-wrap gap-10 items-center">
                <Input type="button"/>
                <Input type="reset"/>
                <Input type="submit"/>
                <Input type="image" src="" alt="image"/>
            </div>

            <div className="main-text underline">Specialty input:</div>
            <div className="flex flex-row flex-wrap gap-10 items-center">
                <Input type="color"/>
                <Input type="file"/>
                <Input type="range" className={"accent-secondary-purple hover:accent-secondary-purple-hover"}/>
            </div>

            <div className="main-text underline">Date time related input:</div>
            <div className="flex flex-row flex-wrap gap-10 items-center">
                <Input type="time"/>
                <Input type="week"/>
                <Input type="month"/>
                <Input type="date"/>
                <Input type="datetime-local"/>
            </div>

            <div className="main-text underline">Select:</div>
            <div className="flex flex-row flex-wrap gap-10 items-center">
                <Input type="checkbox"/>
                <Input type="radio"/>
            </div>

            <div className="main-text underline">Text based:</div>
            <div className="flex flex-row flex-wrap gap-10 items-center">
                <Input type="email" placeholder={"email input"}/>
                <Input type="number" placeholder={"number input"}/>
                <Input type="password" placeholder={"password input"}/>
                <Input type="search" placeholder={"search input"}/>
                <Input type="tel" placeholder={"telephone input"}/>
                <Input type="text" placeholder={"text input"}/>
                <Input type="url" placeholder={"url input"}/>
            </div>

            <div className="main-text underline">Search Bar:</div>
            <SearchBarExamples/>
        </div>
    )
}

export default InputExamples;