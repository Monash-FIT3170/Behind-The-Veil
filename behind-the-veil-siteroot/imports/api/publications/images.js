/**
 * File Description: Image database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Meteor} from 'meteor/meteor'
import {ImageCollection} from "/imports/api/collections/images";

/**
 * Publishes images for services.
 */
Meteor.publish('service_images', function () {
    return ImageCollection.find({"imageType": "service"});
});

/**
 * Publishes the images that belong to a specific service.
 * @param {string} serviceId - The ID of the service to find its images to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result the images to be published.
 */
Meteor.publish('specific_service_images', function (serviceId) {
    // Check if the username matches either the user
    return ImageCollection.find({
            $and: [
                {"imageType": "service"},
                {"target_id": serviceId}
            ]
        });
});

/**
 * Publishes profile picture images.
 */
Meteor.publish('profile_images', function () {
    return ImageCollection.find({"imageType": "profile"});
});

/**
 * Publishes the profile image that belong to a user.
 * @param {string} serviceId - The username of the user for their profile image to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result the image to be published.
 */
Meteor.publish('specific_profile_image', function (username) {
    // Check if the username matches either the user
    return ImageCollection.find({
        $and: [
            {"imageType": "profile"},
            {"target_id": username}
        ]
    });
});

/**
 * Publishes artist gallery post images.
 */
Meteor.publish('post_images', function () {
    return ImageCollection.find({"imageType": "post"});
});