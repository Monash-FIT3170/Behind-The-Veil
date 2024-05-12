/**
 * File Description: User database entity
 * File version: 1.0
 * Contributors: Nikki, Neth
 */

import {Mongo} from "meteor/mongo";

// to set up user collection
export const UserCollection = new Mongo.Collection("users_temp");
// This is no longer needed, just kept here for reference as the accounts package already initiates it.
export default UserCollection;

