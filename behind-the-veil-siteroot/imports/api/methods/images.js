/**
 * File Description: Image database entity
 * File version: 1.1
 * Contributors: Nikki, Phillip, Vicky, Katie
 */

import {Meteor} from "meteor/meteor";
import { ImageCollection } from "../collections/images";
import { check } from 'meteor/check';


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
        check(type, String)
        check(targetId, String)

        return ImageCollection.insert(
            {
                "imageType": type,
                "target_id": targetId,
                "imageData": imageData
            }
        )
        //return targetId;
    },

    "remove_post_image": function (target_Id){
        check(target_Id, String)

        ImageCollection.remove(
            {
                "imageType":"post",
                "target_id": target_Id
            }
        )
    },
    /**
     * Updates fields of a image instance in the database.
     * @param {string} targetId - The ID of the post image to update.
     * @param {object} updateObject - Field and value object of elements that need to be upgraded
    */
    "update_post_image": function (targetId, updateObject) {
        check(targetId, String)
        check(updateObject, Object)

        ImageCollection.update(
            { "target_id": targetId },
            { $set: updateObject},
        );
    },

    /**
     * Retrieves a single image instance from the database based on the target ID.
     * @param {string} targetId - The serviceId/username/postId that the image belongs to
     * @returns {object|null} - The image object if found, otherwise null.
     */
    "get_image": function (targetId) {
        check(targetId, String)

        return ImageCollection.findOne(
            { "target_id": targetId },
        )
    },
})

