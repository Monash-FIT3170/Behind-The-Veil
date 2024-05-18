/**
 * File Description: Service database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import { Meteor } from "meteor/meteor";
import { ServiceCollection } from "/imports/api/collections/services";

/**
 * Publishes all active services.
 */
Meteor.publish("active_services", function () {
    return ServiceCollection.find({ serviceActive: true });
});

Meteor.publish("all_services", function () {
    return ServiceCollection.find();
});


/**
 * Publishes one services based on given service ID to the client.
 * This publication filters bookings based on the provided service ID
 * @param {string} serviceId - The ID of the service to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result the service to be published.
 */
Meteor.publish('specific_service', function(serviceId) {
    // Check if the username matches either the user
    return ServiceCollection.find({_id: serviceId});
});
