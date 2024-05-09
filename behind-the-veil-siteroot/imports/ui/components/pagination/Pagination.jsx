import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import classNames from "classnames";

export const Pagination = ({externalClassName, internalClassName, itemsPerPage, displayItems}) => {

    // get page from URL first, if there is
    let urlPageNum = 1;
    let {hash} = useLocation();

    if (hash) {
        try {
            // try to get existing page number
            urlPageNum = Number(hash.substring(1,));
        } catch (e) {
            // no proper page number
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
    }, [pageNum, displayItems]);

    // updating the classes if received any as input
    const externClasses = classNames(externalClassName, "flex flex-col gap-y-10");
    const internClasses = classNames(internalClassName, "flex flex-col lg:flex-row gap-10 items-center justify-center flex-wrap");

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
