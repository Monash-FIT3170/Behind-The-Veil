/**
 * File Description: Service database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Meteor} from 'meteor/meteor'
import {ServiceCollection} from "/imports/api/collections/services";

/**
 * Publishes all active services.
 */
Meteor.publish('active_services', function() {
    return ServiceCollection.find({"serviceActive":true});
});