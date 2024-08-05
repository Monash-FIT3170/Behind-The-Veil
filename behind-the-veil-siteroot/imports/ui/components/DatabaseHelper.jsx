/**
 * File Description: Database helper functions
 * File version: 1.0
 * Contributors: Nikki
 */
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import ServiceCollection from "../../api/collections/services";
import ImageCollection from "../../api/collections/images";
import UserCollection from "../../api/collections/users";

/**
 * Used for to get a list of service data (includes their image and/or artist data automatically)
 *
 * @param service_publication - name of the publication to get services from (determines which subset of services is required)
 * @param params - the parameters used for that service publication, such as artistUsername, etc.
 * @param filter - the filter used to filter for the specific subset of services (from the subscribed publication) this is an
 * object with key=service attribute name, value=filter value; e.g. { artistUsername: "abcd123" }
 * @param requireArtist - whether artist data is required
 * @returns [boolean, Object] - returns a boolean isLoading that is true when loading, false when finished loading. The object
 * contains the serviceData joined with its serviceImage and (if required) artistData
 */
export function getServices(service_publication, params, filter, requireArtist = false) {

    console.log("service_publication", service_publication)
    console.log("params", params)
    console.log("filter", filter)

    // get service data from database
    const isLoadingUserServices = useSubscribe(service_publication, ...params);
    let servicesData = useTracker(() => {
        return ServiceCollection.find(filter).fetch();
    });

    // get service images from database
    const isLoadingServiceImages = useSubscribe('service_images', []);
    let imagesData = useTracker(() => {
        return ImageCollection.find({imageType: "service"}).fetch();
    });

    // get artist data from database, if needed
    let isLoadingArtists = () => false
    let artistsData = [];

    if (requireArtist) {
        isLoadingArtists = useSubscribe('all_artists');
        artistsData = useTracker(() => {
            return UserCollection.find({"profile.type": "artist"}).fetch();
        });
    }

    const isLoading = isLoadingUserServices() || isLoadingArtists() || isLoadingServiceImages();

    // manual aggregation of each service with their image
    for (let i = 0; i < servicesData.length; i++) {
        let foundImageMatch = false;

        // aggregate with artist first
        for (let j = 0; j < artistsData.length; j++) {

            // find matching artist and add their name
            if (servicesData[i].artistUsername === artistsData[j].username) {
                servicesData[i].artistAlias = artistsData[j].profile.alias;
                break;
            }
        }

        // then aggregate with the FIRST image that belong to it
        for (let j = 0; j < imagesData.length; j++) {

            // find matching image for the service
            if (imagesData[j].imageType === "service" && servicesData[i]._id === imagesData[j].target_id) {
                servicesData[i].serviceImageData = imagesData[j].imageData;
                foundImageMatch = true;
                break;
            }
        }

        // if not found any images, replace with default
        if (!foundImageMatch) {
            servicesData[i].serviceImageData = "/imageNotFound.png";
        }
    }
    console.log("servicesData", servicesData)

    return [isLoading, servicesData]
}

// many bookings
export function getBookings(booking_publication, params, filter) {

}



// specific service




// specific booking



