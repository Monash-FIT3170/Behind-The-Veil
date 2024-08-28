/**
 * File Description: Payment receipt database entity
 * File version: 1.0
 * Contributors: Cameron
 */
import {Mongo} from "meteor/mongo";

// set up booking collection
export const PaymentCollection = new Mongo.Collection("payments");

export default PaymentCollection;
