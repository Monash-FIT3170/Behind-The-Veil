/** 
 * File Description: Review database entity 
 * File version: 1.0 
 * Contributors: Vicky 
 */

import {Mongo} from "meteor/mongo";

// set up post collection
export const ReviewCollection = new Mongo.Collection("reviews");

export default ReviewCollection;