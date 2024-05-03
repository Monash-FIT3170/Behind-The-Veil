import React, {useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import classNames from "classnames";

export const Pagination = ({externalClassName, internalClassName, itemsPerPage, displayItems}) => {


    // get page from URL first, if there is
    let pageNumIndex = 0;
    let {hash} = useLocation();

    if (hash) {

        try {
            // try to get existing page number
            pageNumIndex = Number(hash.substring(1,)) - 1;
        } catch (e) {
            // no proper page number
        }
    }

    let navigate = useNavigate();


    // index of first item to be shown, depends on how many items have already been passed
    const [startIndex, setStartIndex] = useState(pageNumIndex * itemsPerPage);


    // last item to be shown
    const endIndex = startIndex + itemsPerPage;

    console.log(`Loading items from ${startIndex} to ${endIndex}`);

    // splice only required items
    const currentItems = displayItems.slice(startIndex, endIndex);

    console.log(currentItems);

    // getting TOTAL page count
    const pageCount = Math.ceil(displayItems.length / itemsPerPage);

    // handler to change "page", by changing start index
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % displayItems.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setStartIndex(newOffset);
        navigate("#" + (event.selected + 1))
    };

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
            <div className="flex flex-col items-center">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    className={"flex flex-row gap-x-8 items-center main-text"}
                    pageClassName={""}
                    pageLinkClassName={"btn-base"}
                    previousLinkClassName={"btn-base"}
                    nextLinkClassName={"btn-base"}
                    activeLinkClassName={"bg-main-blue disabled pointer-events-none"}
                    disabledClassName={"pointer-events-none text-dark-grey"}
                />
            </div>
        </div>
    );
}
