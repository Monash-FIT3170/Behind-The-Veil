/**
 * File Description: Post database entity
 * File version: 1.0
 * Contributors: Vicky, Katie
 */

import {Meteor} from "meteor/meteor";
import {PostCollection} from "/imports/api/collections/posts";
import { check } from 'meteor/check';


Meteor.methods({
    /**
     * Adds a new post to the database. Keep in mind this is an async method
     * @param {Date} postDate - the most recent date that the post was updated (either the actual post date or the edit post date)
     * @param {string} postDescription - the artist's description of the post
     * @param {string} artistUsername - the username of the artist this post belongs to 
     * @returns {string} The unique ID of the newly created post (postId).
     */
    "add_post": function (postDate, postDescription, artistUsername) {
        check(postDate, String)  // should be type Date?
        check(postDescription, String)
        check(artistUsername, String)

        return PostCollection.insert(
            {
                "postDate": postDate,
                "postDescription": postDescription,
                "artistUsername": artistUsername,
            }
        );
    },
    /**
     * Retrieves a single post instance from the database based on the post ID.
     * @param {string} postId - The ID of the post to retrieve.
     * @returns {object|null} - The post object if found, otherwise null.
     */
    "get_post": function (postId) {
        check(postId, String)

        return PostCollection.findOne(
            { _id: postId },
        )
    },
     /**
     * Updates multiple fields of a post instance in the database.
     * @param {string} postId - The ID of the post to update.
     * @param {object} updateObject - Field and value object of elements that need to be upgraded
     */
     "update_post_details": function (postId, updateObject) {
        check(postId, String)
        check(updateObject, Object)

        PostCollection.update(
            { _id: postId },
            { $set: updateObject},
        );
    },
    /**
     * Removes a particular post based on the post ID.
     */
    "remove_post": function (postId) {
        check(postId, String)

        PostCollection.remove(
            { _id: postId },
        );
    },
})