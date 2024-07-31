/**
 * File Description: Service database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import { Meteor } from "meteor/meteor";
import { ServiceCollection } from "/imports/api/collections/services";

Meteor.methods({
    /**
     * Adds a new service to the database. Keep in mind this is an async method
     * @param {string} type - type of service, bridal, makeup, etc.
     * @param {string} name - name of service
     * @param {string} desc - full description of the service
     * @param {number} price - total price for service
     * @param {number} duration - how long the service will take in hours, not counting artist preparation and commute time
     * @param {string} artistUsername - username (id) of artist providing the service
     */
    add_service: function (type, name, desc, price, duration, artistUsername) {
        ServiceCollection.insert({
            serviceType: type,
            serviceName: name,
            serviceDesc: desc,
            servicePrice: price,
            serviceActive: true,
            serviceDuration: duration,
            artistUsername: artistUsername,
        });
    },

    get_service: function (serviceid) {
        const service = ServiceCollection.findOne({ _id: serviceid });

        if (!service) {
            throw new Meteor.Error("service-not-found", "Service not found.");
        }
        return service;
    },

    update_service_details: function (serviceId, updateObject) {
        ServiceCollection.update({ _id: serviceId }, { $set: updateObject });
    },
});
