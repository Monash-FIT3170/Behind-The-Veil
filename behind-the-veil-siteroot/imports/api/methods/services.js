import {Meteor} from 'meteor/meteor'
import {ServiceCollection} from "/imports/api/collections/services";
import {Mongo} from 'meteor/mongo'
import { Promise } from "meteor/promise"

Meteor.methods({
    "add_service": function (type, name, desc, price, duration, artistUsername) {
        ServiceCollection.insert(
            {
                "serviceType": type,
                "serviceName": name,
                "serviceDesc": desc,
                "servicePrice": price,
                "serviceActive": true,
                "serviceDuration": duration,
                "artistUsername": artistUsername
            }
        )
    },
    "add_temp": function () {
        ServiceCollection.insert(
            {
                "serviceType": "a",
                "serviceName": "a",
                "serviceDesc": "a",
                "servicePrice": "a",
                "serviceActive": true,
                "serviceDuration": "a",
                "artistUsername": "a"
            }
        )
    },
    "get_service": function () {
        return ServiceCollection.find();
    },
    "get_services_whole": function () {
        let pipeline = [
            {
                $match: {serviceActive: true}
            }, {
                $lookup: {from: "users", localField: "artistUsername", foreignField: "_id", as: "artist"}
            }, {
                $unwind: "$artist"
            }, {
                $project: {
                    serviceType: 1,
                    serviceName: 1,
                    serviceDesc: 1,
                    servicePrice: 1,
                    serviceActive: 1,
                    serviceDuration: 1,
                    artistUsername: 1,
                    artistAlias: "$artist.userAlias"
                }
            }
        ];
        let options = {};

        // gets artist AND the image data associated with the service
        // if (active && !notActive) {
        //     //     db.services.aggregate([ { $match: { serviceActive: true } }, { $lookup:{ from: "users", localField: "artistUsername", foreignField: "_id", as: "artist" } }, { $project: { serviceType: 1, serviceName: 1, serviceDesc: 1, servicePrice: 1, serviceActive: 1, serviceDuration: 1, artistUsername: 1, artistAlias: { $first: "$artist.userAlias" } } }]);
        //
        //
        // } else if (notActive && !active) {
        //
        // } else if (active && notActive) {
        //
        // } else {
        //     // wants neither active nor not active services, return nothing
        //     return null;
        // }

        return Promise.await(
            ServiceCollection.rawCollection().aggregate(pipeline).toArray()
        );
    }
})

