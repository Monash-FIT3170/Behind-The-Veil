import { Meteor } from 'meteor/meteor';
import { ServiceAreaCollection } from '/imports/collections/serviceAreaCollection';

Meteor.publish('add_service_area', function publishTasks() {
    return ServiceAreaCollection.find({ userId: this.userId });
});