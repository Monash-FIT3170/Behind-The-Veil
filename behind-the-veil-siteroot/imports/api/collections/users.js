/**
 * File Description: User database entity
 * File version: 1.0
 * Contributors: Nikki, Neth
 */

import {Mongo} from "meteor/mongo";

// to set up user collection
export const UserCollection = new Mongo.Collection("users");

export default UserCollection;

