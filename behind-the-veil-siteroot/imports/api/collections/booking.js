/**
 * File Description: Booking database entity
 * File version: 1.0
 * Contributors: Neth
 */
import {Mongo} from "meteor/mongo";

// set up booking collection
export const BookingCollection = new Mongo.Collection("booking");

export default BookingCollection;
