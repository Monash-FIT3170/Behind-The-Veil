import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import classNames from "classnames";

export const Pagination = ({externalClassName, internalClassName, itemsPerPage, displayItems}) => {
    console.log("RELOAD RELOAD RELOAD RELOAD RELOAD RELOAD RELOAD")

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
    // console.log("urlPageNum: " + urlPageNum)

    let navigate = useNavigate();

    const [pageNum, setPageNum] = useState(urlPageNum);
    // console.log("pageNum1: " +  pageNum)

    // index of first item to be shown, depends on how many items have already been passed
    // console.log("(pageNum-1) * itemsPerPage: " + (pageNum-1) * itemsPerPage)
    const [startIndex, setStartIndex] = useState(((pageNum-1) * itemsPerPage));

    // console.log("pageNum2: " + pageNum)
    // console.log("startIndex: " + startIndex)

    // last item to be shown
    const endIndex = startIndex + itemsPerPage;

    console.log(`Loading items from ${startIndex} to ${endIndex}`);

    // splice only required items
    const currentItems = displayItems.slice(startIndex, endIndex);

    // console.log("displayItems!!!!!!!!!!!!");
    // console.log(displayItems);
    //
    // console.log("currentItems!!!!!!!!!!!!");
    // console.log(currentItems);

    // getting TOTAL page count
    const pageCount = Math.ceil(displayItems.length / itemsPerPage);

    // handler to change "page", by changing start index
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % displayItems.length;
        // console.log("event.selected="+event.selected);
        // console.log("displayItems.length="+displayItems.length);

        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setStartIndex(newOffset);
        setPageNum(event.selected + 1)
    };

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
            <div className={"flex flex-col items-center md:hidden main-text"}>Page: {pageNum}  </div>
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
                    initialPage={urlPageNum-1}

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
        </div>
    );
}
