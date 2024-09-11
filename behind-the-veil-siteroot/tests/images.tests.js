/**
 * File Description: Images database testing
 * File version: 1.0
 * Contributors: Katie
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/images";
import ImageCollection from "../imports/api/collections/images";

/**
 * Test suite for client-side image methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for image methods.
     */
    describe('Image methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if an image can be added to the database.
         */
        it('can add a new image to the database', function () {
            return new Promise((resolve, reject) => {
                const imageId = ImageCollection.insert({
                    imageType: 'service',
                    target_id: 'service123',
                    imageData: 'image-url'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(imageId => {
                assert.notStrictEqual(imageId, null); // Check if the image was added successfully and an ID was returned
                assert.notStrictEqual(imageId, undefined); // Check if the image was added successfully and an ID was returned

            }).catch(error => {
                assert.fail("Error adding image. Returned with error: " + error.message);
            });
        });
        /**
         * Test case to check if a post image can be removed.
         */
        it('can remove a post image by target ID', function () {
            return new Promise((resolve, reject) => {
                const imageId = ImageCollection.insert({
                    imageType: 'post',
                    target_id: 'post123',
                    imageData: 'image-url'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(imageId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('remove_post_image', 'post123', (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(imageId);
                        }
                    });
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_image', 'post123', (error, retrievedImage) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedImage);
                        }
                    });
                })
            }).then(retrievedImage => {
                assert.strictEqual(retrievedImage, undefined); // Check if the image was removed
            }).catch(error => {
                assert.fail("Error removing post image. Returned with error: " + error.message);
            });
        });
        /**
         * Test case to check if a post image can be updated.
         */
        it('can update fields of a post image', function () {
            return new Promise((resolve, reject) => {
                const imageId = ImageCollection.insert({
                    imageType: 'post',
                    target_id: 'post456',
                    imageData: 'old-image-url'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('update_post_image', 'post456', { imageData: 'new-image-url' }, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_image', 'post456', (error, retrievedImage) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedImage);
                        }
                    });
                })
            }).then(retrievedImage => {
                assert.strictEqual(retrievedImage.imageData, 'new-image-url'); // Check if the image data was updated
            }).catch(error => {
                assert.fail("Error updating post image. Returned with error: " + error.message);
            });
        });

        /**
         * Test case to check if a single image can be retrieved by its target ID.
         */
        it('can retrieve an image by target ID', function () {
            return new Promise((resolve, reject) => {
                const imageId = ImageCollection.insert({
                    imageType: 'profile',
                    target_id: 'user123',
                    imageData: 'profile-image-url'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_image', 'user123', (error, retrievedImage) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedImage);
                        }
                    });
                });
            }).then(retrievedImage => {
                assert.notStrictEqual(retrievedImage, undefined); // Check if the image object is returned
                assert.strictEqual(retrievedImage.imageData, 'profile-image-url'); // Check if the retrieved image data is correct
            }).catch(error => {
                assert.fail("Error retrieving image. Returned with error: " + error.message);
            });
        });
        it('return null if image does not exist', function () {
            return new Promise((resolve, reject) => {
                const imageId = ImageCollection.insert({
                    imageType: 'profile',
                    target_id: 'user123',
                    imageData: 'profile-image-url'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_image', 'user124', (error, retrievedImage) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedImage);
                        }
                    });
                });
            }).then(retrievedImage => {
                assert.strictEqual(retrievedImage, undefined); // Check if the image object is returned
            }).catch(error => {
                assert.fail("Error retrieving image. Returned with error: " + error.message);
            });
        });




    })
}