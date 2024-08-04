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
  monthHeaderFormat: (date, culture, localizer) => {
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

// TODO: need to retrieve this data from actual database. Some transformations may be required to
// get each event object into this format
const myEventsList = [
  {
    start: new Date("2024-07-06T05:30:00"),
    end: new Date("2024-07-06T07:30:00"),
    brideName: "Dolly Parton",
    bookingStatus: "Pending",
    bookingTime: "Fri 22/03/23 10:00AM - 12:00PM",
    bookingLocation: "123 Arts Studio, Painting Avenue 555, NSW",
  },
  {
    start: new Date("2024-07-21T10:00:00"),
    end: new Date("2024-07-21T12:00:00"),
    brideName: "Jo",
    bookingStatus: "Closed",
    bookingTime: "Sun 21/07/24 10:00AM - 12:00PM",
    bookingLocation: "Somewhere else",
  },
  {
    start: new Date("2024-07-16T18:00:00"),
    end: new Date("2024-07-16T20:00:00"),
    brideName: "Annie",
    bookingStatus: "Confirmed",
    bookingTime: "Tue 16/07/24 6:00PM - 8:00PM",
    bookingLocation: "Another place",
  },
];

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

const BookingCalendarView = () => {
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

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        eventPropGetter={(myEventsList) => {
          let backgroundColor;
          if (myEventsList.bookingStatus === "Confirmed") {
            backgroundColor = "green";
          } else if (myEventsList.bookingStatus === "Pending") {
            backgroundColor = "blue";
          } else {
            backgroundColor = "red";
          }

          return { style: { backgroundColor } };
        }}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="brideName"
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
      />

      <CalendarPopup
        bookingStatus={activeEventDetails?.bookingStatus}
        brideName={activeEventDetails?.brideName}
        bookingTime={activeEventDetails?.bookingTime}
        bookingLocation={activeEventDetails?.bookingLocation}
        onClose={closePopup}
        activeElement={activeEvent}
      />
    </div>
  );
};

export default BookingCalendarView;
