/**
 * File Description: General utility functions
 * File version: 1.0
 * Contributors: Nikki
 */

import {useState} from "react";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import ServiceCollection from "../../api/collections/services";
import ImageCollection from "../../api/collections/images";

/**
 * Retrieves current logged-in user's information
 * This can be extended to include more user related attributes.
 *
 * @returns an object containing the information of the user including username, email, alias, user type.
 */
export function getUserInfo() {
    // get current user information
    const [userInfo, setUserInfo] = useState(
        {
            "id": null,
            "alias": null,
            "username": null,
            "type": null,
            "email": null
        }
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();
        const userId = Meteor.userId();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const fetchedUserId = userId;
            const fetchedUsername = user.username;
            const fetchedEmail = user.emails[0].address;
            const fetchedAlias = user.profile.alias;
            const fetchedType = user.profile.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (
                userInfo.id !== fetchedUserId ||
                userInfo.username !== fetchedUsername ||
                userInfo.email !== fetchedEmail ||
                userInfo.alias !== fetchedAlias ||
                userInfo.type !== fetchedType
            ) {
                setUserInfo(
                    {
                        "id": fetchedUserId,
                        "username": fetchedUsername,
                        "email": fetchedEmail,
                        "alias": fetchedAlias,
                        "type": fetchedType
                    }
                )
            }
        }
    })

    console.log("Current logged in user:" + JSON.stringify(userInfo))
    return userInfo;
}

export function getServices(service_publication, params, filter) {

    console.log("service_publication", service_publication)
    console.log("params", params)
    console.log("filter", filter)

    // get service data from database
    const isLoadingUserServices = useSubscribe(service_publication, ...params);

    let servicesData = useTracker(() => {
        return ServiceCollection.find(filter).fetch();
    });

    const isLoadingServiceImages = useSubscribe('service_images', []);
    const isLoading = isLoadingUserServices() || isLoadingServiceImages();

    let imagesData = useTracker(() => {
        return ImageCollection.find({imageType: "service"}).fetch();
    });

    // manual aggregation of each service with their image
    for (let i = 0; i < servicesData.length; i++) {
        let foundMatch = false;

        // then aggregate with the ALL images that belong to it
        for (let j = 0; j < imagesData.length; j++) {

            // find matching image for the service
            if (imagesData[j].imageType === "service" && servicesData[i]._id === imagesData[j].target_id) {
                servicesData[i].serviceImageData = imagesData[j].imageData;
                foundMatch = true;
                break;
            }
        }

        // if not found any images, replace with default
        if (!foundMatch) {
            servicesData[i].serviceImageData = "/imageNotFound.png";
        }
    }
    console.log("servicesData", servicesData)

    return [isLoading, servicesData]
}


