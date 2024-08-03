/**
 * File Description: Image database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Meteor} from "meteor/meteor";
import { ImageCollection } from "../collections/images";

Meteor.methods({
    /**
     * Adds a new image to the database. Keep in mind this is an async method
     * @param {string} type - type of image, such as "service" image for a service, "post" image for artist gallery
     *                        posts, or "profile" images for user profiles.
     * @param {string} targetId - the target id (the serviceId/username/postId that this image belongs to)
     * @param imageData - the data of the image todo: data this is currently treated as a url to the image,
     *                                                but maybe should be changed to BSON/actual data
     */
    "add_image": function (type, targetId, imageData) {
        ImageCollection.insert(
            {
                "imageType": type,
                "targetId": targetId,
                "imageData": imageData
            }
        )
    }
})

