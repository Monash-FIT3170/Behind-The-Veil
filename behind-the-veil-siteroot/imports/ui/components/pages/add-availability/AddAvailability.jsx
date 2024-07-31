/**
 * File Description: Add Availability page
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useEffect, useId, useState} from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import AvailabilityCalendar, {VALID_INTERVAL} from "../../../components/availabilityCalendar/AvailabilityCalendar.jsx";
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";
import mockAvailability from "./mockAvailability.json"
import {
    addDays,
    eachHourOfInterval,
    format,
    isAfter,
    isDate,
    isEqual,
    isValid,
    isWithinInterval,
    parse,
    set,
    startOfDay,
    startOfHour
} from "date-fns";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Page for artist to add availability
 */

const AddAvailability = () => {
    const { artistUsername } = useParams();
    const navigateTo = useNavigate();

    const MOCK_AVAILABILITY = {
        "_id": "2648fb26-bd00-45ab-b62e-f88c37c6a994",
        "availabilityTimes":{
            "2024-08-10": [12,13,14,15,16],
            "2024-08-11": [12,13,14,15,16]
        },
        "artistUsername": "aboydon5"
    };

    // form input values
    const [inputs, setInputs] = useState({
        date: startOfDay(new Date()),
        time: "",
    });

    // id's
    const dateInputId = useId();
    const timeInputId = useId();

    /**
     * Calculate available times that the user can select, based on date, duration, and existing bookings
     * @param {Date} date day at which we want the available time slots
     * @returns array of date objects that correspond to available times, on the hour
     */
    const getAvailableTimes = (date) => {
        if (!(isValid(date) && isDate(date))) {
            console.warn('invalid date')
            return []
        }

        const hours = eachHourOfInterval({
            start: set(date, {hours: 6, minutes: 0, seconds: 0}),
            end: set(date, {hours: 19, minutes: 0, seconds: 0})
        })

        return hours
    };

    const handleSubmit = (event) => {
        navigateTo(`/booking-summary?${query}`);
    }

    const handleManualDateInput = (event) => {
        const dateInput = event.target.value;

        // if manual input is a valid date within the allowable interval
        // convert it to a date object and store it
        const dateFormat = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/
        if (dateFormat.test(dateInput)) {
            const parsedDate = parse(dateInput, 'dd-MM-yyyy', new Date())
            if (
                isValid(parsedDate) &&
                isWithinInterval(parsedDate, VALID_INTERVAL)
            ) {
                setInputs((i) => ({...i, date: parsedDate}));
                return
            }
        }

        // else, just update date input with the raw value
        //setInputs((i) => ({...i, date: dateInput}));
        return
    }

    // for representing date object as DD-MM-YYYY in the date input
    const formatDateInput = (dateInput) => {
        // if the input is a valid date and a date object, format it
        if (isValid(dateInput) && isDate(dateInput)) return format(dateInput, 'dd-MM-yyyy')

        return dateInput
    }

    const availableTimes = getAvailableTimes(inputs.date);

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <PreviousButton/>

            {/* Main container for content */}
            <div className="flex flex-col gap-4 xl:px-40">
                {/* input form */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {/* date/time */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            {/* date input + calendar */}
                            <div
                                className="flex flex-col flex-grow gap-1 md:max-w-[350px] lg:max-w-[420px] xl:lg:max-w-[490px]">
                                <div className="flex flex-col gap-4">
                                    <Input
                                        id={dateInputId}
                                        label={<label htmlFor={dateInputId} className="main-text text-our-black">Select
                                            Date</label>}
                                        placeholder="DD-MM-YYYY"
                                        name="date"
                                        value={formatDateInput(inputs.date) || ""}
                                        onChange={handleManualDateInput}
                                    />
                                    {/* calendar component */}
                                    <AvailabilityCalendar
                                        value={isValid(inputs.date) && isDate(inputs.date) ? inputs.date : null}
                                        onChange={(date) => {
                                            setInputs((i) => {
                                                return {
                                                    ...i,
                                                    date: date,
                                                };
                                            });
                                        }}
                                        tileClassName={({date, view}) => {
                                            const availableTimes = getAvailableTimes(date)
                                            if (
                                                view === 'month' &&
                                                availableTimes.length > 0
                                            ) {
                                                return 'available'
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* available time buttons */}
                            {/* <div className="flex sm:flex-grow sm:justify-center"> */}
                            <div className="flex flex-col flex-grow gap-1">
                                <label
                                    htmlFor={timeInputId}
                                    className="main-text text-our-black"
                                >
                                    Select Available Hours
                                </label>
                                <div id={timeInputId} className="grid grid-cols-2 gap-2">

                                    {/* if there are available times, render the time input buttons */}
                                    {!Array.isArray(availableTimes) || availableTimes.length === 0 ?
                                        <span className={"main-text text-dark-grey text-center col-span-2 mt-4"}>No available times</span> :
                                        availableTimes.map((time) => {
                                            const baseStyle = "w-full";
                                            const activeStyle = "bg-dark-grey text-white hover:bg-dark-grey";
                                            const className =
                                                isEqual(inputs.time, time)
                                                    ? `${baseStyle} ${activeStyle}`
                                                    : baseStyle;

                                            return (
                                                <Button
                                                    key={time}
                                                    className={className}
                                                    onClick={() => {
                                                        setInputs((i) => {
                                                            return {
                                                                ...i,
                                                                time: time,
                                                            };
                                                        });
                                                    }}
                                                >
                                                    {format(time, 'p')}
                                                </Button>
                                            );
                                        })}
                                </div>
                                <Button
                                    className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center"
                                    type="submit">Save</Button>
                            </div>
                            {/* </div> */}

                        </div>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default AddAvailability;
