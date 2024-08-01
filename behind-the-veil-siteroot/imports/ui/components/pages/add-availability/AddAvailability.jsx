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
import Tippy from '@tippyjs/react/headless';
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";

/**
 * Page for artist to add availability
 */

const AddAvailability = () => {
    const { artistUsername } = useParams();
    const navigateTo = useNavigate();

    const MOCK_AVAILABILITY = [
        {
            "_id": "2648fb26-bd00-45ab-b62e-f88c37c6a994",
            "availabilityTimes":{
                "2024-08-10": [12,13,14,15,16],
                "2024-08-11": [12,13,14,15,16]
            },
            "artistUsername": "laura3"
        },
        {
            "_id": "512a128b-7353-4db1-9f87-b6faff90f179",
            "availabilityTimes":{
                "2024-08-10": [12,13,14,15,16],
                "2024-08-11": [12,13,14,15,16]
            },
            "artistUsername": "aboydon4"
        },
        {
            "_id": "e0e8dbf7-edea-483d-ad6c-15203da132ba",
            "availabilityTimes":{
                "2024-08-10": [12,13,14,15,16],
                "2024-08-11": [12,13,14,15,16]
            },
            "artistUsername": "aboydon5"
        }
    ]

    const initialAvailability = MOCK_AVAILABILITY.find(entry => entry.artistUsername === artistUsername) || {
        _id: useId(),
        availabilityTimes: {},
        artistUsername: artistUsername
    };

    // form input values
    const [inputs, setInputs] = useState({
        date: startOfDay(new Date()),
        times: [],
    });

    const [availability, setAvailability] = useState(
        initialAvailability.availabilityTimes
    );

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

    const handleSave = (event) => {
        event.preventDefault();

        const dateKey = format(inputs.date, "yyyy-MM-dd");
        //const newAvailability = { ...availability };

        if (!initialAvailability.availabilityTimes[dateKey]) {
            initialAvailability.availabilityTimes[dateKey] = [];
        }

        inputs.times.forEach((time) => {
            const hour = time.getHours();
            if (!initialAvailability.availabilityTimes[dateKey].includes(hour)) {
                initialAvailability.availabilityTimes[dateKey].push(hour);
            }
        });

        // add new availability to db
        const existingIndex = MOCK_AVAILABILITY.findIndex(entry => entry.artistUsername === initialAvailability.artistUsername);
        if (existingIndex !== -1) {
            MOCK_AVAILABILITY[existingIndex] = initialAvailability;
        } else {
            MOCK_AVAILABILITY.push(initialAvailability);
        }
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

    //tooltip
    const toolTipText = (
        <div className="text-center">
            Brides can only select from available hours (green) that you set. Please note that the available hour denote 
            when the services start and does not account for travel time. You may need to account for extra travel time.
        </div>
    );

    const toolTip = (
        <span className="content-center ml-2">
            <Tippy render={attrs => (
                <div className="box border border-main-blue rounded-lg mt-1 px-6 py-6 white-glass-base shadow-lg w-[500px]"
                    tabIndex="-1" {...attrs}>
                    {toolTipText}
                </div>
            )}>
                <QuestionMarkCircleIcon className="tooltip-icon size-4 text-light-grey-hover"/>
            </Tippy>
        </span>
    );

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <PreviousButton/>

            {/* Main container for content */}
            <div className="flex flex-col gap-4 xl:px-40">
                {/* input form */}
                <form onSubmit={handleSave}>
                    <div className="flex flex-col gap-4">
                        {/* date/time */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                            {/* date input + calendar */}
                            <div className="flex flex-col flex-grow gap-1 md:max-w-[350px] lg:max-w-[420px] xl:lg:max-w-[490px]">
                                <div className="flex flex-col gap-4">
                                    <Input
                                        id={dateInputId}
                                        label={<label htmlFor={dateInputId} className="large-text text-our-black">Select Date</label>}
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
                                            const dateKey = format(date, 'yyyy-MM-dd');
                                            if (availability[dateKey] && availability[dateKey].length > 0) {
                                                return 'available';
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* available time buttons */}
                            {/* <div className="flex sm:flex-grow sm:justify-center"> */}
                            <div className="flex flex-col flex-grow gap-1">
                                <div className="flex flex-row">
                                    <label
                                        htmlFor={timeInputId}
                                        className="large-text text-our-black"
                                    >
                                        Select Available Hours
                                    </label>
                                    {toolTip}
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div id={timeInputId} className="grid grid-cols-2 gap-2">
                                        {/* if there are available times, render the time input buttons */}
                                        {!Array.isArray(availableTimes) || availableTimes.length === 0 ?
                                            <span className={"main-text text-dark-grey text-center col-span-2 mt-4"}>No available times</span> :
                                            availableTimes.map((time) => {
                                                const baseStyle = "w-full";
                                                const activeStyle = "bg-confirmed-colour text-white hover:bg-confirmed-colour";
                                                const dateKey = format(inputs.date, "yyyy-MM-dd");
                                                const isActive = availability[dateKey] && availability[dateKey].includes(time.getHours());
                                                const className = isActive ? `${baseStyle} ${activeStyle}` : baseStyle;
                                                return (
                                                    <Button
                                                        key={time}
                                                        className={className}
                                                        onClick={() => {
                                                            setInputs((i) => {
                                                                const times = isActive
                                                                    ? i.times.filter(t => t.getHours() !== time.getHours())
                                                                    : [...i.times, time];
                                                                return {
                                                                    ...i,
                                                                    times,
                                                                };
                                                            });
                                                            const updatedAvailability = { ...availability };
                                                            if (isActive) {
                                                                updatedAvailability[dateKey] = updatedAvailability[dateKey].filter(hour => hour !== time.getHours());
                                                            } else {
                                                                if (!updatedAvailability[dateKey]) {
                                                                    updatedAvailability[dateKey] = [];
                                                                }
                                                                updatedAvailability[dateKey].push(time.getHours());
                                                            }
                                                            setAvailability(updatedAvailability);
                                                        }}
                                                    >
                                                        {format(time, 'p')}
                                                    </Button>
                                                );
                                            })}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className="bg-secondary-purple hover:bg-secondary-purple-hover flex items-center justify-center gap-2 w-1/5 mt-4"
                                            type="submit">Save</Button>
                                    </div>
                                </div>
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