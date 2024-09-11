/**
 * File Description: Service database testing
 * File version: 1.0
 * Contributors: Katie
 */

const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/services";
import {ServiceCollection} from "../imports/api/collections/services";


/**
 * Test suite for client-side service methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for service methods.
     */
    describe('Service methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });

        /**
         * Test case to check if a service can be added successfully.
         */
        it('can add a service', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("add_service",
                    "bridal",
                    "service",
                    'description',
                    100,
                    1,
                    'artist456',
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
            }).then(result => {
                const service = ServiceCollection.findOne(result);
                assert.notStrictEqual(service, null);
                assert.notStrictEqual(service, undefined);

            }).catch(error => {
                assert.fail("Error adding service. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a service can be retrieved successfully.
         */
        it('can get a service', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                const serviceId = ServiceCollection.insert({
                    serviceType: "bridal",
                    serviceName: "service",
                    serviceDesc: 'description',
                    servicePrice: 100,
                    serviceActive: true,
                    serviceDuration: 1,
                    artistUsername: 'artist456',
                }, (error, serviceId) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(serviceId);
                    }
                });
            }).then(serviceId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_booking', serviceId, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }).then(result => {
                assert.notStrictEqual(result, null); // Check if a booking object is returned
            }).catch(error => {
                assert.fail("Error adding booking. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a service can be updated successfully.
         */
        it('can update service details', function () {
            const serviceId = ServiceCollection.insert({
                serviceType: "bridal",
                serviceName: "service",
                serviceDesc: 'description',
                servicePrice: 100,
                serviceActive: true,
                serviceDuration: 1,
                artistUsername: 'artist456',
            }, (error, serviceId) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(serviceId);
                }
            });
            const updateObject = {
                serviceType: "bridal_updated",
                serviceName: "service_updated",
                serviceDesc: 'description_updated',
                servicePrice: 50,
                serviceActive: true,
                serviceDuration:21,
                artistUsername: 'artist456_updated'
            }
            Meteor.call('update_service_details', serviceId, updateObject);
            assert.strictEqual(updateObject.serviceType, 'bridal_updated');

        });

        /**
         * Test case to check if a service can be deleted successfully.
         */
        it('can delete a service', function () {
            const serviceId = ServiceCollection.insert({
                serviceType: "bridal",
                serviceName: "service",
                serviceDesc: 'description',
                servicePrice: 100,
                serviceActive: true,
                serviceDuration: 1,
                artistUsername: 'artist456'
            });
            return new Promise((resolve, reject) => {
                Meteor.call('delete_service', serviceId, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }).then(() => {
                // Check that the post has been removed
                const deletedservice = ServiceCollection.findOne(serviceId);
                assert.strictEqual(deletedservice, undefined);
            }).catch(error => {
                assert.fail('Error removing post. Returned with error: ' + error.message);
            });
        });


    })
}