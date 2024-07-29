import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ServiceAreaCollection } from "/imports/api/collections/serviceAreaCollection";

Meteor.methods({
    'add_service_area': function (text, radius) {
        check(text, String);
        // check(radius, Number);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        ServiceAreaCollection.insert({
            text: text.trim(),
            radius: radius,
            userId: this.userId
        });
    }

})