/**
 * File Description: Database helper functions
 * File version: 1.4
 * Contributors: Nikki, Ryan, Phillip
 */
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import ServiceCollection from "../../api/collections/services";
import ImageCollection from "../../api/collections/images";
import UserCollection from "../../api/collections/users";
import BookingCollection from "../../api/collections/bookings";
import PostCollection from "../../api/collections/posts";
import BookingStatus from "../enums/BookingStatus";


export function updateBookingStatus(bookingId, newStatus, cancelAttributes) {

    //

    if (newStatus === BookingStatus.CANCELLED) {
        Meteor.call('update_booking_details', bookingId, {
            bookingStatus: newStatus,
            ...cancelAttributes
        });
    } else {
        Meteor.call('update_booking_details', bookingId, {
            bookingStatus: newStatus
        });
    }
    // email

    // navigate away
    //
}

/**
 * Used for to get a list of service data (includes their image and/or artist data automatically)
 *
 * @param service_publication - name of the publication to get services from (determines which subset of services is required)
 * @param params - the parameters used for that service publication, such as artistUsername, etc.
 * @param filter - the filter used to filter for the specific subset of services (from the subscribed publication) this is an
 * object with key=service attribute name, value=filter value; e.g. { artistUsername: "abcd123" }
 * @param requireArtist - whether artist data is required
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The serviceData object joined with its serviceImage and (if required) artistData
 */
export function useServices(
    service_publication,
    params,
    filter,
    requireArtist = false
) {
    // get service data from database
    const isLoadingUserServices = useSubscribe(service_publication, ...params);
    let servicesData = useTracker(() => {
        return ServiceCollection.find(filter).fetch();
    });

    // get service images from database
    const isLoadingServiceImages = useSubscribe("service_images", []);
    let imagesData = useTracker(() => {
        return ImageCollection.find({imageType: "service"}).fetch();
    });

    // get artist data from database, if needed
    let isLoadingArtists = () => false;
    let artistsData = [];

    if (requireArtist) {
        isLoadingArtists = useSubscribe("all_artists");
        artistsData = useTracker(() => {
            return UserCollection.find({"profile.type": "artist"}).fetch();
        });
    }

    // variable for loading
    const isLoading =
        isLoadingUserServices() || isLoadingArtists() || isLoadingServiceImages();

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
            if (
                imagesData[j].imageType === "service" &&
                servicesData[i]._id === imagesData[j].target_id
            ) {
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
    return {isLoading, servicesData};
}

/**
 * Used for to get a list of bookings data (includes their image and service data automatically)
 *
 * @param booking_publication - name of the publication to get bookings from (determines which subset of booking is required)
 * @param params - the parameters used for that booking publication, such as username, etc.
 * @param filter - the filter used to filter for the specific subset of booking (from the subscribed publication) this is an
 * object with key=booking attribute name, value=filter value; e.g. { username: "abcd123" }
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The bookingData object joined with its serviceData and serviceImage
 */
export function useBookings(booking_publication, params, filter) {
    // get bookings from database
    const isLoadingBooking = useSubscribe(booking_publication, ...params);
    let bookingsData = useTracker(() => {
        return BookingCollection.find(filter).fetch();
    });

    // get services from database
    const isLoadingService = useSubscribe("all_services");
    let servicesData = useTracker(() => {
        return ServiceCollection.find().fetch();
    });

    // get service images from database
    const isLoadingServiceImage = useSubscribe("service_images");
    let imagesData = useTracker(() => {
        return ImageCollection.find({imageType: "service"}).fetch();
    });

    // variable for loading
    const isLoading =
        isLoadingBooking() || isLoadingService() || isLoadingServiceImage();

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
            if (
                imagesData[j].imageType === "service" &&
                bookingsData[i].serviceId === imagesData[j].target_id
            ) {
                bookingsData[i].serviceImageData = imagesData[j].imageData;
                break;
            }
        }
    }
    return {
        isLoading: isLoading,
        bookingsData: bookingsData,
    };
}

/**
 * Used for to get a list of users data (includes their profile image automatically)
 *
 * @param user_publication - name of the publication to get users from (determines which subset of user is required)
 * @param params - the parameters used for that user publication, such as username, etc.
 * @param filter - the filter used to filter for the specific subset of user (from the subscribed publication) this is an
 * object with key=user attribute name, value=filter value; e.g. { username: "abcd123" }
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The userData object joined with its profile image data.
 */
export function useUsers(user_publication, params, filter) {
    // get users from database
    const isLoadingUsers = useSubscribe(user_publication, ...params);
    let usersData = useTracker(() => {
        return UserCollection.find(filter).fetch();
    });

    // get user profile image from database
    const isLoadingImages = useSubscribe("profile_images");
    let imagesData = useTracker(() => {
        return ImageCollection.find({imageType: "profile"}).fetch();
    });

    const isLoading = isLoadingUsers() || isLoadingImages();

    // manual aggregation user data with their image
    for (let i = 0; i < usersData.length; i++) {
        for (let j = 0; j < imagesData.length; j++) {
            // find matching image for the artist
            if (
                imagesData[j].imageType === "profile" &&
                usersData[i].username === imagesData[j].target_id
            ) {
                usersData[i].profileImageData = imagesData[j].imageData;
                break;
            }
        }
    }
    return {isLoading, usersData};
}

/**
 * Loads a specific service with its relevant service and user data
 *
 * @param serviceId - ID of the service to get data
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The objects contain serviceData and serviceImagesData as well as related artistData and their profile image data.
 */
export function useSpecificService(serviceId) {
    // will always just get 1 specific service by ID
    const isLoadingService = useSubscribe("specific_service", serviceId);
    let serviceData = useTracker(() => {
        return ServiceCollection.find({
            _id: serviceId,
        }).fetch()[0];
    });

    // get service images from database
    const isLoadingServiceImages = useSubscribe(
        "specific_service_images",
        serviceId
    );
    let serviceImagesData = useTracker(() => {
        return ImageCollection.find({
            $and: [{imageType: "service"}, {target_id: serviceId}],
        }).fetch();
    });

    // get artist data + profile image from database
    const serviceArtistUsername = serviceData ? serviceData.artistUsername : "";
    const isLoadingArtist = useSubscribe("specific_user", serviceArtistUsername);
    let artistData = useTracker(() => {
        return UserCollection.find({
            username: serviceArtistUsername,
        }).fetch()[0];
    });

    const isLoadingArtistProfile = useSubscribe(
        "specific_profile_image",
        serviceArtistUsername
    );
    let profileImageData = useTracker(() => {
        return ImageCollection.find({
            $and: [{imageType: "profile"}, {target_id: serviceArtistUsername}],
        }).fetch()[0];
    });

    const isLoading =
        isLoadingService() ||
        isLoadingArtist() ||
        isLoadingServiceImages() ||
        isLoadingArtistProfile();
    return {
        isLoading,
        serviceData,
        artistData,
        serviceImagesData,
        profileImageData,
    };
}

/**
 * Loads a specific booking with its relevant service and user data
 *
 * @param bookingId - ID of the booking to get data
 * @param userType - type of current user: either bride or artist
 * @returns  {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The objects contain bookingData and the related serviceData and userData
 */
export function useSpecificBooking(bookingId, userType) {
    // will always just get 1 specific booking by ID
    const isLoadingBooking = useSubscribe("specific_booking", bookingId);

    let bookingData = useTracker(() => {
        return BookingCollection.find({
            _id: bookingId,
        }).fetch()[0];
    });

    // get service from database
    const bookingServiceId = bookingData ? bookingData.serviceId : "";
    const isLoadingService = useSubscribe("specific_service", bookingServiceId);

    let serviceData = useTracker(() => {
        return ServiceCollection.find({
            _id: bookingServiceId,
        }).fetch()[0];
    });

    // load the other user's data. Load the bride if you're the artist, or load the artist if you're the bride
    const bookingUsername = bookingData
        ? userType === "bride"
            ? bookingData.artistUsername
            : bookingData.brideUsername
        : "";
    console.log(bookingData);
    const isLoadingUser = useSubscribe("specific_user", bookingUsername);

    // filter for only the other user's data (if not then you get your own data too)
    let userData = useTracker(() => {
        return UserCollection.find({
            username: bookingUsername,
        }).fetch()[0];
    });

    const isLoading = isLoadingBooking() || isLoadingService() || isLoadingUser();

    return {isLoading, bookingData, serviceData, userData};
}

/**
 * Loads a specific booking with its relevant service and user data
 *
 * @param username - username of the user to get data
 * @returns  {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * The objects contain userData and the related profile image
 */
export function useSpecificUser(username) {
    // will always just get 1 specific user by username
    const isLoadingUser = useSubscribe("specific_user", username);
    let userData = useTracker(() => {
        return UserCollection.find({username: username}).fetch()[0];
    });

    // get profile images from database
    const isLoadingProfileImages = useSubscribe(
        "specific_profile_image",
        username
    );
    let profileImagesData = useTracker(() => {
        return ImageCollection.find({
            $and: [{imageType: "profile"}, {target_id: username}],
        }).fetch()[0];
    });

    const isLoading = isLoadingUser() || isLoadingProfileImages();

    return {isLoading, userData, profileImagesData};
}

// specific booking

/**
 * Fetches the dashboard statistics for the artist
 *
 * @param username {string} - The username of the artist
 * @returns {Object} - Object containing the dashboard statistics like total customers, total earnings, etc.
 */
export function useArtistDashboardCustomerData(username) {
    // Subscribe to the necessary data
    const isLoadingBookings = useSubscribe("all_user_bookings", username);

    // Fetch the booking data for the artist
    let bookingData = useTracker(() => {
        return BookingCollection.find({artistUsername: username}).fetch();
    });

    // Calculate the necessary statistics
    const totalCustomersLifetime = bookingData.length;
    const totalCustomersThisMonth = bookingData.filter((booking) => {
        const bookingDate = new Date(booking.bookingStartDateTime);
        const currentMonth = new Date().getMonth();
        return bookingDate.getMonth() === currentMonth;
    }).length;

    return {
        isLoading: isLoadingBookings(),
        totalCustomersLifetime,
        totalCustomersThisMonth,
    };
}

//  * Collects all data relevent to load gallery images
//  *
//  * @param {*} username - username of the user to get data
//  * @returns - an array with index 0 denoting image source and index 1 denoting corresponding post data (all information related to post)
//  */
export function useGalleryTotalCollection(username) {
    const isLoadingImages = useSubscribe("post_images", []);
    let imageDataArray = useTracker(() => {
        return ImageCollection.find({imageType: "post"}).fetch();
    });

    //collect user post data
    const postData = useUserPosts(username);

    //loop through and collect all the post ID information
    const postDataIDArray = [];
    for (let i = 0; i < postData.length; i++) {
        postDataIDArray.push(postData[i]._id);
    }
    const imageSourceArray = [];

    //collect relevant post images
    for (let j = 0; j < postDataIDArray.length; j++) {
        for (let i = 0; i < imageDataArray.length; i++) {
            if (imageDataArray[i].target_id == postDataIDArray[j]) {
                imageSourceArray.push(imageDataArray[i].imageData);
            }
        }
    }

    //return index 0 as image source and index 1 with corresponding post data.
    return [imageSourceArray, postData];
}

/**
 * Collects all posts (inclusive of all relevant data) relating to the user
 *
 * @param {*} username - username of the user to get data
 * @returns - all the post data that belongs to user
 */
export function useUserPosts(username) {
    const isLoadingPost = useSubscribe("specific_artist_posts", username);
    let postData = useTracker(() => {
        return PostCollection.find({artistUsername: username}).fetch();
    });

    return postData;
}

/**
 * Finds all user booking details and calculates total revenue earnt from completed bookings and pending bookings
 * @param username {string} - the username of the artist
 * @returns {object} - an array with index 0 containing total earnings and index 1 containing pending earnings
 */
export function useArtistDashboardRevenueData(username) {
    const isLoadingBookings = useSubscribe("all_user_bookings", username);

    // Fetch the booking data for the artist
    let bookingData = useTracker(() => {
        return BookingCollection.find({artistUsername: username}).fetch();
    });

    //initalise variables for revenue calculation
    let bookingCompleteRevenue = 0;
    let bookingPendingRevenue = 0;

    // loop through entire booking data array
    for (let i = 0; i < bookingData.length; i++) {
        //if booking is completed, total bookings value
        if (bookingData[i].bookingStatus == "completed") {
            bookingCompleteRevenue += bookingData[i].bookingPrice;
        }
        //if booking is pending, total bookings value
        if (bookingData[i].bookingStatus == "pending") {
            bookingPendingRevenue += bookingData[i].bookingPrice;
        }
    }

    return [bookingCompleteRevenue, bookingPendingRevenue];
}
