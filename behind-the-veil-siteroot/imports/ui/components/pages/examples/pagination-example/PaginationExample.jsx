/**
 * File Description: Pagination example
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import {Pagination} from "../../../pagination/Pagination";
import Card from "../../../card/Card";

const PaginationExamples = () => {

    // replace this with your actual data
    const sampleDataArray = [
        <Card key={"a"}>a</Card>,
        <Card key={"b"}>b</Card>,
        <Card key={"c"}>c</Card>,
        <Card key={"d"}>d</Card>,
        <Card key={"e"}>e</Card>,
        <Card key={"f"}>f</Card>,
        <Card key={"g"}>g</Card>,
        <Card key={"h"}>h</Card>,
    ]

    // default number of items per page
    const [itemsPerPage, setItemsPerPage] = React.useState(3);

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Example Pagination:</div>

            <div className="flex flex-col items-center justify-center gap-y-5">

                <Pagination
                    itemsPerPage={itemsPerPage}
                    displayItems={sampleDataArray}
                />

                <div className="flex flex-row items-center justify-center gap-x-2">
                    Items per page:
                    <input type={"number"}
                           value={itemsPerPage}
                           className="border-2 p-2 border-light-grey rounded-[6px] main-text h-12 max-w-20 sm:w-[361px]"
                           onChange={(event) => {
                               // ensure no negative pages
                               const newValue = Number(event.target.value);
                               if (newValue > 0) {
                                   setItemsPerPage(newValue);
                               }
                           }}
                           min={1}
                           max={100}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaginationExamples;