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
            assert.strictEqual(updatedUser.profile.artistServiceLocation, 'clayton');
            assert.strictEqual(updatedUser.profile.artistServiceRadius, 20);
        });
        /**
         * Test case to check if a user alias can be retrieved successfully.
         */
        it('can retrieve user alias', function () {
            const username = 'testuser'
            const userAlias = 'test';
            const userId = UserCollection.insert({
                username: username,
                email: 'testuser@example.com',
                password: 'password',
                profile: {
                    alias: userAlias,
                    type: 'artist',
                    artistServiceLocation: '',
                    artistserviceRadius: 0,
                },
            });
            Meteor.call('get_alias', username, (error, retrievedAlias) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(retrievedUser);
                }
                const user = UserCollection.findOne(userId);
                assert.strictEqual(user.profile.alias, retrievedAlias);
            });
        });
         /**
         * Test case to check if a user can be retrieved successfully.
         */
         it('can retrieve a user', function () {
            const username = 'testuser';
            const userEmail = 'testuser@example.com';
            const userPassword = 'password';
            const userAlias = 'test';
            const userType = 'artist';
            const userArtistServiceLocation = '';
            const userArtistServiceRadius = 0;
            const userId = UserCollection.insert({
                username: username,
                email: userEmail,
                password: userPassword,
                profile: {
                    alias: userAlias,
                    type: userType,
                    artistServiceLocation: userArtistServiceLocation,
                    artistserviceRadius: userArtistServiceRadius,
                },
            });
            Meteor.call('get_user', username, (error, retrievedUser) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(retrievedUser);
                }
                const user = UserCollection.findOne(userId);
                assert.strictEqual(user.username, retrievedUser.username);
                assert.strictEqual(user.email, retrievedUser.email);
                assert.strictEqual(user.password, retrievedUser.password);
                assert.strictEqual(user.profile.alias, retrievedUser.profile.alias);
                assert.strictEqual(user.profile.type, retrievedUser.profile.type);
                assert.strictEqual(user.profile.artistServiceLocation, retrievedUser.profile.artistServiceLocation);
                assert.strictEqual(user.profile.artistServiceRadius, retrievedUser.profile.artistServiceRadius);
            });
        });
    });
}
