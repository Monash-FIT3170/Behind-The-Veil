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
Meteor.publish('service_images', function() {
    return ImageCollection.find({"imageType":"service"});
});

/**
 * Publishes profile picture images.
 */
Meteor.publish('profile_images', function() {
    return ImageCollection.find({"imageType":"profile"});
});

/**
 * Publishes artist gallery post images.
 */
Meteor.publish('post_images', function() {
    return ImageCollection.find({"imageType":"post"});
});