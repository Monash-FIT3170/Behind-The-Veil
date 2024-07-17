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
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const myEventsList = [
  {
    start: new Date("2024-05-06T05:30:00"),
    end: new Date("2024-05-06T07:30:00"),
    title: "Dolly Parton",
    status: "Pending",
  },

  {
    start: new Date("2024-05-21T10:00:00"),
    end: new Date("2024-05-21T12:00:00"),
    title: "Jo",
    status: "Closed",
  },

  {
    start: new Date("2024-05-16T18:30:00"),
    end: new Date("2024-05-16T20:30:00"),
    title: "Annie",
    color: "green",
    status: "Confirmed",
  },
];

const calendarStyle = () => {
  return {
    style: {
      backgroundColor: 'white', // Background color (this works)
      //color: 'green', // Text color (this won't work directly)
    },
  };
};

const HeaderCellContent = ({ label }) => {
  // Customize the header cell content (e.g., weekdays)
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
      style={{ height: 600 }}
      views={{ month: true }}
      step={155}
      dayPropGetter={calendarStyle}
      components={{
      // Customize the header cell style
      month: {
      header: HeaderCellContent,
      },
  }}

    />
  </div>
);


export default BookingCalendarView

