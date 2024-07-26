/**
 * File Description: Pagination component
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import classNames from "classnames";

/**
 * Pagination component that separates a list of JSX elements into multiple "pages" on a single webpage.
 *
 * @param {string} externalClassName - custom classes that override the base outer container style
 * @param {string} internalClassName - custom classes that override the inner pagination style
 * @param {number} itemsPerPage - number of items per "page" of the pagination
 * @param {JSX.Element} displayItems - the list items to display (an array of JSX.Element such as <Div>s)
 * @param {boolean} reset - whether to reset the view back to 1 each time or to retain where it was at before
 */
export const Pagination = ({externalClassName, internalClassName, itemsPerPage, displayItems, reset}) => {

    // ensure item per page is a number
    itemsPerPage = Number(itemsPerPage);

    // get page from URL first, if there is
    let urlPageNum = 1;

    if (!reset) {
        // if not reset the page  back to 1, then get it from the url
        let {hash} = useLocation();

        if (hash) {
            try {
                // try to get existing page number
                urlPageNum = Number(hash.substring(1,));
            } catch (e) {
                // no proper page number
            }
        }
    }

    let navigate = useNavigate();

    // Current page number: from 1...n
    const [pageNum, setPageNum] = useState(urlPageNum);

    // index of first item to be shown, depends on how many items have already been passed
    const [startIndex, setStartIndex] = useState(((pageNum - 1) * itemsPerPage));

    // last item to be shown
    const endIndex = startIndex + itemsPerPage;

    // splice only required items
    const currentItems = displayItems.slice(startIndex, endIndex);

    // getting TOTAL page count
    const pageCount = Math.ceil(displayItems.length / itemsPerPage);

    // handler to change "page", by changing start index
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % displayItems.length;

        setStartIndex(newOffset);
        setPageNum(event.selected + 1)
    };

    // Effect of clicking any of the page number buttons navigate the user
    useEffect(() => {
        // click on button
        navigate("#" + pageNum)
    }, [pageNum]);

    // updating the classes if received any as input
    const externClasses = classNames(externalClassName, "flex flex-col gap-y-10");
    const internClasses = classNames(internalClassName, "flex flex-row gap-10 items-center justify-center flex-wrap");

    return (

        <div className={externClasses}>
            <div className={internClasses}>
                {/*This is the items currently displayed*/}
                {currentItems}
            </div>

            {/* This is the page number component underneath */}
            {/*This is the page number that appears on smaller screens*/}
            <div className={"flex flex-col items-center md:hidden main-text"}>Page: {pageNum}  </div>

            {/*The main page number component here*/}
            <div className="flex flex-col items-center">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    initialPage={urlPageNum - 1}

                    className={"flex flex-row gap-x-2 items-center main-text"}
                    pageClassName={"hidden md:flex"}
                    pageLinkClassName={"btn-base"}
                    breakClassName={"hidden md:flex"}
                    previousClassName={"min-w-fit"}
                    previousLinkClassName={"btn-base"}
                    nextClassName={"min-w-fit"}
                    nextLinkClassName={"btn-base"}
                    activeLinkClassName={"bg-main-blue disabled pointer-events-none"}
                    disabledClassName={"hidden"}
                />
            </div>
        </div>);
}

export default Pagination;
