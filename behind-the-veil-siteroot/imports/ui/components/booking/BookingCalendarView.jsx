/**
 * File Description: Bookings CALENDAR view for Artist's profile
 * File version: 1.1
 * Contributors: Anusha Yadav, Josh Loong
 */

import React, { useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import "./CalendarToolbar.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import CalendarPopup from "../calendarPopup/CalendarPopup.jsx";
import BookingStatus from "../../enums/BookingStatus";
import { addHours, format } from 'date-fns'

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="medium-text">
      <div className="custom-toolbar">
        <span className="toolbar-label">{label}</span>
        <button
          className="toolbar-button prev bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
          onClick={() => onNavigate("PREV")}
        >
          <ChevronLeftIcon className="icon-base" />
        </button>
        <button
          className="toolbar-button next bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
          onClick={() => onNavigate("NEXT")}
        >
          <ChevronRightIcon className="icon-base" />
        </button>
        <button
          className="toolbar-button today"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </button>
      </div>
    </div>
  );
};

const formats = {
  monthHeaderFormat: (date) => {
    const month = moment(date).format("MMMM");
    const year = moment(date).format("YYYY");
    return `${month} ${year}`;
  },
  dayFormat: (date, culture, localizer) => {
    return localizer.format(date, "D", culture);
  },
  dateFormat: (date, culture, localizer) => {
    return localizer.format(date, "D", culture);
  },
  weekdayFormat: (date, culture, localizer) => {
    return localizer.format(date, "ddd", culture);
  },
};

moment.locale("ko", {
  week: {
    dow: 1,
    doy: 1,
  },
});

const localizer = momentLocalizer(moment);

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: "white",
    },
  };
};

const HeaderCellContent = ({ label }) => {
  const customStyles = {
    color: "grey",
  };

  return <div style={customStyles}>{label}</div>;
};

// format the bookings data from the db so that it can be consumed by react-big-calendar component
const formatBookings = (bookingsData) => {
  if (!Array.isArray(bookingsData) || bookingsData.length === 0) return []

  const formattedBookings = bookingsData.map((booking) => {

    // calculate booking end time
    const bookingEndDateTime = addHours(booking.bookingStartDateTime, booking.bookingDuration)
    
    // generate formatted booking time string
    const formattedDate = format(booking.bookingStartDateTime, "E dd/MM/yyyy")
    const formattedStartTime = format(booking.bookingStartDateTime, "h:mma")
    const formattedEndTime = format(bookingEndDateTime, "h:mma")
    const bookingTime = `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`

    // add booking end time and formatted booking time string
    return {
      ...booking, // include original booking data
      bookingEndDateTime,
      bookingTime
    }
  })

  return formattedBookings
}

const BookingCalendarView = ({ bookingsData }) => {
  const [activeEvent, setActiveElement] = useState(null); // stores the event element in the DOM that was clicked on
  const [activeEventDetails, setPopupContent] = useState(null); // stores the details of the event that was cliocked on

  const closePopup = () => {
    setActiveElement(null);
    setPopupContent(null);
  };

  const handleSelectEvent = (event, nativeEvent) => {
    setActiveElement(nativeEvent.target);
    setPopupContent(event);
  };

  const events = formatBookings(bookingsData)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={(myEventsList) => {
          let backgroundColor;
          let className;
          if (myEventsList.bookingStatus === BookingStatus.CONFIRMED) {
            backgroundColor = "#27AD6D";
          } else if (myEventsList.bookingStatus === BookingStatus.COMPLETED) {
            backgroundColor = "#27AD6D";
          } else if (myEventsList.bookingStatus === BookingStatus.PENDING) {
            backgroundColor = "#4F76D9";
          } else if (myEventsList.bookingStatus === BookingStatus.CANCELLED) {
            backgroundColor = "#D33B3B";
          } else if (myEventsList.bookingStatus === BookingStatus.REJECTED) {
            backgroundColor = "#D33B3B";
          } else if (myEventsList.bookingStatus === BookingStatus.OVERDUE) {
            backgroundColor = "#D33B3B";
          } else {
            backgroundColor = "#D33B3B";
          }

          return { style: { backgroundColor } };
        }}
        onSelectEvent={handleSelectEvent}
        startAccessor="bookingStartDateTime"
        endAccessor="bookingEndDateTime"
        titleAccessor="brideUsername"
        formats={formats}
        style={{ height: "85vh", margin: "50px" }}
        views={{ month: true }}
        step={155}
        dayPropGetter={calendarStyle}
        components={{
          toolbar: CustomToolbar,
          month: {
            header: HeaderCellContent,
          },
        }}
        onNavigate={closePopup}
      />

      <CalendarPopup
        bookingId={activeEventDetails?._id}
        bookingStatus={activeEventDetails?.bookingStatus}
        brideName={activeEventDetails?.brideUsername}
        bookingTime={activeEventDetails?.bookingTime}
        bookingLocation={activeEventDetails?.bookingLocation}
        onClose={closePopup}
        activeElement={activeEvent}
      />
    </div>
  );
};

export default BookingCalendarView;
