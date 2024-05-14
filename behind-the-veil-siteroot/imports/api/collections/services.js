/**
 * File Description: Service database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Mongo} from "meteor/mongo";

// to set up service collection
export const ServiceCollection = new Mongo.Collection("services");

export default ServiceCollection;
