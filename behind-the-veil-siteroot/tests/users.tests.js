const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/users";
import {UserCollection} from "../imports/api/collections/users";

/**
 * Test suite for client-side user methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for user methods.
     */
    describe('User methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });

        /**
         * Test case to check if service area can be updated successfully.
         */
        it('can update service area', function () {
            const userId = UserCollection.insert({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
                profile: {
                    alias: 'test',
                    type: 'artist',
                    artistServiceLocation: '',
                    artistserviceRadius: 0,
                },
            });
            Meteor.call('update_service_area', userId, 'clayton', 20 );
            const updatedUser = UserCollection.findOne(userId);
            console.log(updatedUser)
            assert.strictEqual(updatedUser.profile.artistServiceLocation, 'clayton');
            assert.strictEqual(updatedUser.profile.artistServiceRadius, 20);
        });


    });
}
