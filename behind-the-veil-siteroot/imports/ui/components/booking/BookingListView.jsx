/**
 * File Description: Bookings list view for Artist's profile
 * File version: 1.1
 * Contributors: Laura, Nikki
 */
import React, {useState} from 'react';
import Pagination from "../pagination/Pagination";

/**
 * General view for list of bookings, for brides and artists
 *
 * @param {JSX.Element} displayBookings - JSX elements of the bookings to display
 */
const BookingListView = ({displayBookings}) => {

    // items on each pagination page
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            {/*the bookings and pagination*/}
            <Pagination
                reset={true}
                itemsPerPage={itemsPerPage}
                displayItems={displayBookings}
            />

            {/*bottom component for the custom item per page*/}
            <div className="flex flex-row items-center justify-center gap-x-2">
                Items per page:
                <select defaultValue={10}
                        onChange={(event) => {
                            setItemsPerPage(event.target.value)
                        }}
                        className="input-base w-20">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    );
};

export default BookingListView;