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
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

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
                    <select defaultValue={10} onChange={(event) => {
                        setItemsPerPage(event.target.value)
                    }} className="input-base w-20">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default PaginationExamples;