/**
 * File Description: Post database entity
 * File version: 1.0
 * Contributors: Vicky
 */

import {Mongo} from "meteor/mongo";

// set up post collection
export const PostCollection = new Mongo.Collection("posts");

export default PostCollection;
