/**
 * File Description: Booking database entity
 * File version: 1.1
 * Contributors: Neth, Nikki
 */
import {Mongo} from "meteor/mongo";

// set up booking collection
export const BookingCollection = new Mongo.Collection("bookings");

export default BookingCollection;
