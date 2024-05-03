import {Meteor} from 'meteor/meteor'
import {ServiceCollection} from "/imports/api/collections/services";

// name of what you want to publish to frontend (consistency)
Meteor.publish('all_services', function() {
    return ServiceCollection.find();
});