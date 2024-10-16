/**
 * File Description: Service database entity
 * File version: 1.0
 * Contributors: Nikki, Katie
 */

import { Meteor } from "meteor/meteor";
import { ServiceCollection } from "../collections/services";
import { check } from 'meteor/check';


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
    add_service: function (type, name, desc, price, duration, artistUsername, images) {
        check(type, String)
        check(name, String)
        check(desc, String)
        check(price, String)
        check(duration, String)
        check(artistUsername, String)
        
        return ServiceCollection.insert({
            serviceType: type,
            serviceName: name,
            serviceDesc: desc,
            servicePrice: price,
            serviceActive: true,
            serviceDuration: duration,
            artistUsername: artistUsername,
            serviceImages: images
        });
    },

    get_service: function (serviceId) {
        check(serviceId, String)

        const service = ServiceCollection.findOne({ _id: serviceId });

        if (!service) {
            throw new Meteor.Error("service-not-found", "Service not found.");
        }
        return service;
    },

    update_service_details: function (serviceId, updateObject) {
        check(serviceId, String)
        check(updateObject, Object)

        ServiceCollection.update({ _id: serviceId }, { $set: updateObject });
    },

    /**
     * Deletes a service from the database.
     * @param {int} serviceId - Service ID of the service being deleted.
     */
    delete_service: function (serviceId) {
        check(serviceId, String)

        if (!ServiceCollection.findOne({ _id: serviceId })) {
            throw new Meteor.Error("service-not-found", "Service not found.");
        }
        
        ServiceCollection.remove(serviceId);
    }
});
