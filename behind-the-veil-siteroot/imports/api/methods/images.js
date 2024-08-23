/**
 * File Description: Image database entity
 * File version: 1.1
 * Contributors: Nikki, Phillip, Vicky
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
        return ImageCollection.insert(
            {
                "imageType": type,
                "target_id": targetId,
                "imageData": imageData
            }
        )
        return targetId;
    },

    "remove_post_image": function (target_Id){
        ImageCollection.remove(
            {
                "imageType":"post",
                "target_id": target_Id
            }
        )
    },

    /**
     * Retrieves a single image instance from the database based on the target ID.
     * @param {string} targetId - The serviceId/username/postId that the image belongs to
     * @returns {object|null} - The image object if found, otherwise null.
     */
    "get_image": function (targetId) {
        return ImageCollection.findOne(
            { "targetId": targetId },
        )
    },
})

