/**
 * File Description: Add Availability Tab Component
 * File version: 1.0
 * Contributor: Phillip
 * Source/Credit: Laura, Josh
 */

import React, { useEffect, useId, useState } from "react";
import Button from "../../button/Button";
import AvailabilityCalendar, {
  VALID_INTERVAL,
} from "../../../components/availabilityCalendar/AvailabilityCalendar.jsx";
import Input from "../../input/Input";
import {
  eachHourOfInterval,
  format,
  isBefore,
  isDate,
  isValid,
  isWithinInterval,
  parse,
  set,
  startOfDay,
} from "date-fns";
import Tippy from "@tippyjs/react/headless";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import { useSpecificUser } from "../../DatabaseHelper.jsx";

/**
 * Page for artist to add availability
 */
const AddAvailability = ({ username }) => {
  //   const { artistUsername } = useParams();

  const artistUsername = username;
  // message on save
  const [successMessage, setSuccessMessage] = useState("");

  // form input values
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [availability, setAvailability] = useState({});

  // id's
  const dateInputId = useId();
  const timeInputId = useId();

  // artist data
  const { isLoading, userData } = useSpecificUser(artistUsername);

  // init availability state once artist data loads
  useEffect(() => {
    if (isLoading) return;

    if (userData?.availability) {
      const artistAvailability = { ...userData.availability };

      // remove dates from availability object that are in the past
      for (date of Object.keys(artistAvailability)) {
        const today = startOfDay(new Date());
        if (isBefore(date, today)) {
          delete artistAvailability[date];
        }
      }

      setAvailability(artistAvailability);
    }
  }, [isLoading]);

  /**
   * Calculate available times that the user can select, based on date
   * @param {Date} date day at which we want the available time slots
   * @returns array of date objects that correspond to available times, on the hour
   */
  const getAvailableTimes = (date) => {
    if (!(isValid(date) && isDate(date))) {
      console.warn("invalid date");
      return [];
    }

    const hours = eachHourOfInterval({
      start: set(date, { hours: 6, minutes: 0, seconds: 0 }),
      end: set(date, { hours: 19, minutes: 0, seconds: 0 }),
    });

    return hours;
  };

  // write new availability object to artist document in database
  const updateAvailability = async () => {
    Meteor.call(
      "update_availability",
      artistUsername,
      availability,
      (error) => {
        if (error) {
          console.warn("Error updating availability", error);
          alert("Error updating availability: " + error);
        } else {
          setSuccessMessage("You have updated your availabilities");
        }
      }
    );
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateAvailability();
  };

  const handleManualDateInput = (event) => {
    const dateInput = event.target.value;

    // if manual input is a valid date within the allowable interval
    // convert it to a date object and store it
    const dateFormat =
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
    if (dateFormat.test(dateInput)) {
      const parsedDate = parse(dateInput, "dd-MM-yyyy", new Date());
      if (isValid(parsedDate) && isWithinInterval(parsedDate, VALID_INTERVAL)) {
        setSelectedDate(parsedDate);
        return;
      }
    }

    // else, just update date input with the raw value
    setSelectedDate(dateInput);
    return;
  };

  // for representing date object as DD-MM-YYYY in the date input
  const formatDateInput = (dateInput) => {
    // if the input is a valid date and a date object, format it
    if (isValid(dateInput) && isDate(dateInput))
      return format(dateInput, "dd-MM-yyyy");

    return dateInput;
  };

  const availableTimes = getAvailableTimes(selectedDate);

  //tooltip
  const toolTipText = (
    <div className="text-center">
      Brides can only select from available hours (green) that you set. Please
      note that the available hour denote when the services start and does not
      account for travel time. You may need to account for extra travel time.
    </div>
  );

  const toolTip = (
    <span className="content-center ml-2">
      <Tippy
        render={(attrs) => (
          <div
            className="box border border-main-blue rounded-lg mt-1 px-6 py-6 white-glass-base shadow-lg w-[500px]"
            tabIndex="-1"
            {...attrs}
          >
            {toolTipText}
          </div>
        )}
      >
        <QuestionMarkCircleIcon className="tooltip-icon size-4 text-secondary-purple-hover" />
      </Tippy>
    </span>
  );

  return (
    <>
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
                    label={
                      <label
                        htmlFor={dateInputId}
                        className="large-text text-our-black"
                      >
                        Select Date
                      </label>
                    }
                    placeholder="DD-MM-YYYY"
                    name="date"
                    value={formatDateInput(selectedDate) || ""}
                    onChange={handleManualDateInput}
                  />
                  {/* calendar component */}
                  <AvailabilityCalendar
                    value={
                      isValid(selectedDate) && isDate(selectedDate)
                        ? selectedDate
                        : null
                    }
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    tileClassName={({ date, view }) => {
                      const dateKey = format(date, "yyyy-MM-dd");
                      if (
                        availability[dateKey] &&
                        availability[dateKey].length > 0
                      ) {
                        return "available";
                      }
                    }}
                  />
                </div>
              </div>

              {/* available time buttons */}
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
                    {!Array.isArray(availableTimes) ||
                    availableTimes.length === 0 ? (
                      <span
                        className={
                          "main-text text-dark-grey text-center col-span-2 mt-4"
                        }
                      >
                        No available times
                      </span>
                    ) : (
                      availableTimes.map((time) => {
                        const baseStyle = "w-full";
                        const activeStyle =
                          "bg-confirmed-colour text-white hover:bg-confirmed-colour";
                        const dateKey = format(selectedDate, "yyyy-MM-dd");
                        const isActive =
                          availability[dateKey] &&
                          availability[dateKey].includes(time.getHours());
                        const className = isActive
                          ? `${baseStyle} ${activeStyle}`
                          : baseStyle;
                        return (
                          <Button
                            key={time}
                            className={className}
                            onClick={() => {
                              setSuccessMessage("");
                              setAvailability((prevAvailability) => {
                                const updatedAvailability = {
                                  ...prevAvailability,
                                };
                                if (isActive) {
                                  updatedAvailability[dateKey] =
                                    updatedAvailability[dateKey].filter(
                                      (hour) => hour !== time.getHours()
                                    );
                                } else {
                                  if (!updatedAvailability[dateKey]) {
                                    updatedAvailability[dateKey] = [];
                                  }
                                  updatedAvailability[dateKey].push(
                                    time.getHours()
                                  );

                                  // sort in ascending order
                                  updatedAvailability[dateKey].sort(
                                    (a, b) => a - b
                                  );
                                }

                                return updatedAvailability;
                              });
                            }}
                          >
                            {format(time, "p")}
                          </Button>
                        );
                      })
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-y-6">
                    <Button
                      className="bg-secondary-purple hover:bg-secondary-purple-hover flex items-center justify-center gap-2 w-1/5 min-w-28 mt-4"
                      type="submit"
                    >
                      Save
                    </Button>
                    <p className="main-text text-center pt-2">
                      If availability timeslot is AFTER NOW then it won't appear
                      for brides to book
                    </p>

                    {successMessage && (
                      <div className="text-confirmed-colour mt-2">
                        {successMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAvailability;
