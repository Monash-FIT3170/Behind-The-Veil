/**
 * File Description: Post database testing
 * File version: 1.0
 * Contributors: Vicky, Katie
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/posts";
import PostCollection from "../imports/api/collections/posts";

/**
 * Test suite for client-side booking methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for booking methods.
     */
    describe('Post methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a post can be added successfully.
         */
        it('can add a post', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                const date = new Date();
                let postDate = date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  });
                Meteor.call("add_post",
                    postDate,
                    'Description',
                    'artist456',
                    (error, postId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(postId);
                        }
                    }
                );
            }).then(postId => {
                assert.notStrictEqual(postId, undefined, "Post ID is undefined");
                const post = PostCollection.findOne(postId);
                assert.notStrictEqual(post, null, "Post does not exist in the collection");
            }).catch(error => {
                assert.fail("Error adding post. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a post can be retrieved successfully.
         */
        it('can retrieve a post', function () {
            return new Promise((resolve, reject) => {
                const postId = PostCollection.insert({
                    postDate: new Date(),
                    postDescription: 'Description',
                    artistUsername: 'artist456'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(postId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_post', postId, (error, retrievedPost) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedPost);
                        }
                    });
                });
            }).then(retrievedPost => {
                assert.notStrictEqual(retrievedPost, undefined); // Check if a post object is returned
                assert.notStrictEqual(retrievedPost, null); // Check if a post object is returned
            }).catch(error => {
                assert.fail("Error adding post. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a post can be updated successfully.
         */
        it('can update post details', function () {
            const postId = PostCollection.insert({
                postDate: new Date(),
                postDescription: 'Description',
                artistUsername: 'artist456'
            });
            Meteor.call('update_post_details', postId, {'postDescription': 'New Description'});
            const updatedPost = PostCollection.findOne(postId);
            assert.strictEqual(updatedPost.postDescription, 'New Description');
        });
        /**
         * Test case to check if a post can be deleted successfully.
         */
        it('can delete a post', function () {
            const postId = PostCollection.insert({
                postDate: new Date(),
                postDescription: 'Description',
                artistUsername: 'artist456'
            });
            return new Promise((resolve, reject) => {
                Meteor.call('remove_post', postId, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }).then(() => {
                // Check that the post has been removed
                const removedPost = PostCollection.findOne(postId);
                assert.strictEqual(removedPost, undefined);
            }).catch(error => {
                assert.fail('Error removing post. Returned with error: ' + error.message);
            });
        });
    });
}