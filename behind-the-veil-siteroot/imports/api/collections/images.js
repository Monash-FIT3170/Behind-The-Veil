/**
 * File Description: Image database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Mongo} from "meteor/mongo";

// set up image collection
export const ImageCollection = new Mongo.Collection("images");

export default ImageCollection;
