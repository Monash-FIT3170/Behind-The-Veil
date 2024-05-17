/**
 * File Description: Message database entity
 * File version: 1.0
 * Contributors: Vicky
 */

import {Mongo} from "meteor/mongo";

// set up image collection
export const MessageCollection = new Mongo.Collection("messages");

export default MessageCollection;