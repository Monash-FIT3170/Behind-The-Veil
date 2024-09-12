/**
 * File Description: Image database entity
 * File version: 1.2
 * Contributors: Nikki, Phillip, Lucas, Vicky
 */

import {Meteor} from "meteor/meteor";
import { ImageCollection } from "../collections/images";

Meteor.methods({
    /**
     * Adds a new image to the database. Keep in mind this is an async method
     * @param {string} type - type of image, such as "service" image for a service, "post" image for artist gallery
     *                        posts, or "profile" images for user profiles.
     * @param {string} targetId - the target id (the serviceId/username/postId that this image belongs to)
     * @param imageData - the data of the image
     * @param {string} name - The name of the image being uploaded
     * @param size - The size of the image being uploaded
     */
    add_image: function (type, targetId, imageData, name, size) {
        ImageCollection.insert({
            imageType: type,
            target_id: targetId,
            imageData: imageData,
            imageName: name,
            imageSize: size,
        });
        return targetId;
    },

    /**
     * removes all images from a target service
     * @param target_Id
     */
    remove_service_images: function (target_Id) {
        ImageCollection.remove({
            imageType: "service",
            target_id: target_Id,
        });
    },
    /**
     * Updates fields of a image instance in the database.
     * @param {string} targetId - The ID of the post image to update.
     * @param {object} updateObject - Field and value object of elements that need to be upgraded
    */
    "update_post_image": function (targetId, updateObject) {
        ImageCollection.update(
            { "target_id": targetId },
            { $set: updateObject},
        );
    },

    /**
     * removes the image from a target service
     * @param target_Id
     */
    remove_post_image: function (target_Id) {
        ImageCollection.remove({
            imageType: "post",
            target_id: target_Id,
        });
    },
    
    /**
     * Retrieves a single image instance from the database based on the target ID.
     * @param {string} targetId - The serviceId/username/postId that the image belongs to
     * @returns {object|null} - The image object if found, otherwise null.
     */
    "get_image": function (targetId) {
        return ImageCollection.findOne(
            { "target_id": targetId },
        )
    },
});

