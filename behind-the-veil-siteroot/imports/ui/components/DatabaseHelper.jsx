/**
 * File Description: Database helper functions
 * File version: 1.1
 * Contributors: Nikki
 */
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import ServiceCollection from "../../api/collections/services";
import ImageCollection from "../../api/collections/images";
import UserCollection from "../../api/collections/users";
import BookingCollection from "../../api/collections/bookings";

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

    // variable for loading
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

/**
 * Used for to get a list of bookings data (includes their image and service data automatically)
 *
 * @param booking_publication - name of the publication to get bookings from (determines which subset of booking is required)
 * @param params - the parameters used for that booking publication, such as username, etc.
 * @param filter - the filter used to filter for the specific subset of booking (from the subscribed publication) this is an
 * object with key=booking attribute name, value=filter value; e.g. { username: "abcd123" }
 * @returns [boolean, Object] - returns a boolean isLoading that is true when loading, false when finished loading. The object
 * contains the bookingData joined with its serviceData and serviceImage
 */
export function getBookings(booking_publication, params, filter) {

    // get bookings from database
    const isLoadingBooking = useSubscribe(booking_publication, ...params);
    let bookingsData = useTracker(() => {
        return BookingCollection.find(filter).fetch();
    });

    // get services from database
    const isLoadingService = useSubscribe('all_services');
    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });

    // get service images from database
    const isLoadingServiceImage = useSubscribe('service_images');
    let imagesData = useTracker(() => {
        return ImageCollection.find({"imageType": "service"}).fetch();
    });

    // variable for loading
    const isLoading = isLoadingBooking() || isLoadingService() || isLoadingServiceImage();

    // manual aggregation into bookingsData with its services and images
    for (let i = 0; i < bookingsData.length; i++) {

        // aggregate with service first
        for (let j = 0; j < servicesData.length; j++) {
            // find matching service ID
            if (bookingsData[i].serviceId === servicesData[j]._id) {
                bookingsData[i].serviceName = servicesData[j].serviceName;
                bookingsData[i].serviceDesc = servicesData[j].serviceDesc;
                break;
            }
        }
        // then aggregate with the FIRST service image (cover)
        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the service
            if (imagesData[j].imageType === "service" && bookingsData[i].serviceId === imagesData[j].target_id) {
                bookingsData[i].serviceImageData = imagesData[j].imageData;
                break;
            }
        }
    }

    console.log("bookingsData", bookingsData)

    return [isLoading, bookingsData]
}


// specific service


// specific booking
export function getSpecificBookings(bookingId, userType) {

    // will always just get 1 specific booking by ID
    const isLoadingBooking = useSubscribe('specific_booking', bookingId);
    const idObject = new Mongo.ObjectID(bookingId); // create a mongo ID object to query for ID

    let bookingData = useTracker(() => {
        return BookingCollection.find({
            _id: idObject
        }).fetch()[0];
    });

    // load the service's data
    const bookingServiceId = bookingData ? bookingData.serviceId : "";
    const isLoadingService = useSubscribe('specific_service', bookingServiceId);

    let serviceData = useTracker(() => {
        return ServiceCollection.find({
            _id: bookingServiceId
        }).fetch()[0];
    });

    // load the other user's data. Load the bride if you're the artist, or load the artist if you're the bride
    const bookingUsername = bookingData ? (userType === "bride" ? bookingData.artistUsername : bookingData.brideUsername) : ""
    const isLoadingUser = useSubscribe('specific_user', bookingUsername);

    // filter for only the other user's data (if not then you get your own data too)
    let userData = useTracker(() => {
        return UserCollection.find(
            {
                username: bookingUsername
            }
        ).fetch()[0];
    });

    const isLoading = isLoadingBooking() || isLoadingService() || isLoadingUser();

    console.log("booking data", [bookingData, serviceData, userData])

    return [isLoading, bookingData, serviceData, userData]
}


