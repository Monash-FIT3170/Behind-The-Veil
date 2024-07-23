/**
 * File Description: Bookings CALENDAR view for Artist's profile
 * File version: 1.0
 * Contributors: Anusha Yadav
 */

import React from 'react';

import { BookingStatus } from '../../enums/BookingStatus';
import Button from "../button/Button";

import WhiteBackground from "../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../enums/PageLayout";

import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import "./CalendarToolbar.css";
import {ChevronRightIcon} from "@heroicons/react/24/outline"
import {ChevronLeftIcon} from "@heroicons/react/24/outline"
import moment from 'moment';

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="medium-text">

        <div className="custom-toolbar" >
          <span className="toolbar-label">{label}</span>
          <button
            className="toolbar-button prev bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeftIcon className="icon-base"/>
          </button>
          <button
            className="toolbar-button next bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRightIcon className="icon-base"/>

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



const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    start: new Date("2024-07-06T05:30:00"),
    end: new Date("2024-07-06T07:30:00"),
    title: "Dolly Parton",
    status: "Pending",
  },

  {
    start: new Date("2024-07-21T10:00:00"),
    end: new Date("2024-07-21T12:00:00"),
    title: "Jo",
    status: "Closed",
  },

  {
    start: new Date("2024-07-16T18:30:00"),
    end: new Date("2024-07-16T20:30:00"),
    title: "Annie",
    color: "green",
    status: "Confirmed",
  },
];

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: 'white',
    },
  };
};

const HeaderCellContent = ({ label }) => {
  const customStyles = {
    color: 'grey',
  };

  return <div style={customStyles}>{label}</div>;
};

const BookingCalendarView = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      eventPropGetter={(myEventsList) => {
        let backgroundColor;
          if (myEventsList.status === 'Confirmed') {
            backgroundColor = 'green';
          } else if (myEventsList.status === 'Pending') {
            backgroundColor = 'blue';
          } else {
            backgroundColor = 'red';
          }

        return { style: { backgroundColor } }
      }}

      startAccessor="start"
      endAccessor="end"
      formats={formats}
      style={{ height: "85vh", margin: "50px"}}
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
  </div>
);


export default BookingCalendarView

