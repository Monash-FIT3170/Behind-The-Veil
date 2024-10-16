/**
 * File Description: Database helper functions
 * File version: 1.5
 * Contributors: Nikki, Ryan, Phillip, Lucas
 */
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import ServiceCollection from "../../api/collections/services";
import UserCollection from "../../api/collections/users";
import BookingCollection from "../../api/collections/bookings";
import PostCollection from "../../api/collections/posts";
import ReviewCollection from "../../api/collections/reviews";
import BookingStatus from "../enums/BookingStatus";
import { relativeTimeRounding } from "moment";
import { useUserInfo } from "./util";

/**
 * Function to update booking's status in any way (also linked to emailing in the future)
 *
 * @param bookingId - ID of booking to modify
 * @param newStatus - new status to change to
 * @param cancelAttributes - if status is CANCELLED, this is the cancel reasons
 */
export function updateBookingStatus(
  bookingId,
  newStatus,
  cancelAttributes = {},
  isBride = false
) {
  if (newStatus === BookingStatus.CANCELLED) {
    Meteor.call("update_booking_details", bookingId, {
      bookingStatus: newStatus,
      ...cancelAttributes,
    });
  } else {
    Meteor.call("update_booking_details", bookingId, {
      bookingStatus: newStatus,
    });
  }
  // email about the update
  Meteor.callAsync("sendStatusUpdateEmail", bookingId, newStatus);

  if (newStatus === BookingStatus.CANCELLED || newStatus === BookingStatus.REJECTED) {
    if (isBride) {
      const currentDate = new Date()
      const acceptedDate = new Date(currentDate)
      acceptedDate.setDate(currentDate.getDate() + 14)
      Meteor.call('get_booking', bookingId, (error, booking) => {
        if (acceptedDate < booking.bookingStartDateTime){
          Meteor.call('get_receipt_from_booking', bookingId, (error, receipt) => {
          if (receipt && receipt.paymentType === "Deposit") {
            // Update the receipt to change its status from Deposit to Refunded
            Meteor.call('deposit_to_refund', receipt._id);
          }
        });
        }
      })
    } else {
      Meteor.call('get_receipt_from_booking', bookingId, (error, receipt) => {
        if (receipt && receipt.paymentType === "Deposit") {
            // Update the receipt to change its status from Deposit to Refunded
            Meteor.call('deposit_to_refund', receipt._id);
        }
      });
    }
          
  }
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
  requireArtist = false,
  oneImage = true
) {
    // get service data from database
    const isLoadingUserServices = useSubscribe(service_publication, ...params);
    let servicesData = useTracker(() => {
        return ServiceCollection.find(filter).fetch();
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
        isLoadingUserServices() || isLoadingArtists();

    // manual aggregation of each service with their image
    for (let i = 0; i < servicesData.length; i++) {
        // aggregate with artist first
        for (let j = 0; j < artistsData.length; j++) {
            // find matching artist and add their name
            if (servicesData[i].artistUsername === artistsData[j].username) {
                servicesData[i].artistAlias = artistsData[j].profile.alias;
                break;
            }
        }

        if (!servicesData[i].serviceImages) {
            servicesData[i].serviceImageData = "/imageNotFound.png";
        } else {
            servicesData[i].serviceImageData = servicesData[i].serviceImages[0].imageData
        }
    }
    return { isLoading, servicesData };
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

  // variable for loading
  const isLoading =
    isLoadingBooking() || isLoadingService();

  // manual aggregation into bookingsData with its services and images
  for (let i = 0; i < bookingsData.length; i++) {
    // aggregate with service first
    for (let j = 0; j < servicesData.length; j++) {
      // find matching service ID
      if (bookingsData[i].serviceId === servicesData[j]._id) {
        bookingsData[i].serviceName = servicesData[j].serviceName;
        bookingsData[i].serviceDesc = servicesData[j].serviceDesc;
        if (!servicesData[j].serviceImages) {
            bookingsData[i].serviceImageData = "/imageNotFound.png";
        } else {
            bookingsData[i].serviceImageData = servicesData[j].serviceImages[0].imageData;
        }
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

  const isLoading = isLoadingUsers();

  return { isLoading, usersData };
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

  // get artist data + profile image from database
  const serviceArtistUsername = serviceData ? serviceData.artistUsername : "";
  const isLoadingArtist = useSubscribe("specific_user", serviceArtistUsername);
  let artistData = useTracker(() => {
    return UserCollection.find({
      username: serviceArtistUsername,
    }).fetch()[0];
  });
  

  const isLoading =
    isLoadingService() ||
    isLoadingArtist();
  return {
    isLoading,
    serviceData,
    artistData
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
  // console.log(bookingData);
  const isLoadingUser = useSubscribe("specific_user", bookingUsername);

  // filter for only the other user's data (if not then you get your own data too)
  let userData = useTracker(() => {
    return UserCollection.find({
      username: bookingUsername,
    }).fetch()[0];
  });

  const isLoading = isLoadingBooking() || isLoadingService() || isLoadingUser();

  return { isLoading, bookingData, serviceData, userData };
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
    return UserCollection.find({ username: username }).fetch()[0];
  });

  const isLoading = isLoadingUser();

  return { isLoading, userData };
}

/**
 * Fetches the dashboard statistics for the artist
 *
 * @param username {string} - The username of the artist
 * @returns {Object} - Object containing if it is loading and the dashboard statistics like total customers, total earnings, etc.
 */
export function useArtistDashboardData(username) {
  // Subscribe to the necessary data
  const isLoadingBookings = useSubscribe("all_user_bookings", username);

  // Fetch the booking data for the artist
  let bookingData = useTracker(() => {
    return BookingCollection.find({ artistUsername: username }).fetch();
  });

  // Calculate the number of customers
  const completedBookings = bookingData.filter(
    (booking) => booking.bookingStatus === BookingStatus.COMPLETED
  );
  const totalCustomersLifetime = completedBookings.length;
  const totalCustomersThisMonth = completedBookings.filter((booking) => {
    const bookingDate = new Date(booking.bookingStartDateTime);
    const currentMonth = new Date().getMonth();
    return bookingDate.getMonth() === currentMonth;
  }).length;

  // initialise variables for revenue calculation
  let bookingCompleteRevenue = 0;
  let bookingPendingRevenue = 0;

  // loop through entire booking data array
  for (let i = 0; i < bookingData.length; i++) {
    //if booking is completed, total bookings value
    if (bookingData[i].bookingStatus === BookingStatus.COMPLETED) {
      bookingCompleteRevenue += bookingData[i].bookingPrice;
    }
    //if booking is pending/confirmed, total bookings value
    if (bookingData[i].bookingStatus === BookingStatus.PENDING ||
        bookingData[i].bookingStatus === BookingStatus.CONFIRMED ||
        bookingData[i].bookingStatus === BookingStatus.OVERDUE) {
      bookingPendingRevenue += bookingData[i].bookingPrice;
    }
  }

  return {
    isLoading: isLoadingBookings(),
    totalCustomersLifetime,
    totalCustomersThisMonth,
    bookingCompleteRevenue,
    bookingPendingRevenue,
  };
}

/**
 * Collects all data relevant to load gallery images
 *
 * @param {string} username - username of the user to get data
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * Also, the array of image sources and corresponding post data (all information related to post)
 */
export function useGalleryTotalCollection(username) {
  // collect user post data
  const isLoadingPost = useSubscribe("specific_artist_posts", username);
  const postsData = useTracker(() => {
    return PostCollection.find({ artistUsername: username }).fetch();
  });

  return {
    isLoading: isLoadingPost(),
    postsData,
  };
}

export function useArtistBookings(username) {
  const isLoadingUserBooking = useSubscribe("all_user_bookings", username);
  const artistBookingData = useTracker(() => {
    return BookingCollection.find({ artistUsername: username }).fetch();
  });

  const bookingYearArray = [];
  for (let i = 0; i < artistBookingData.length; i++) {
    const dateObject = new Date(artistBookingData[i].bookingStartDateTime);
    const year = dateObject.getFullYear();
    if (!bookingYearArray.includes(year)) {
      bookingYearArray.push(year);
    }
  }

  bookingYearArray.sort();

  const bookingSuburbArray = [];
  for (let i = 0; i < artistBookingData.length; i++) {
    const split_address = artistBookingData[i].bookingLocation.split(",");
    const suburb = split_address[1] ? split_address[1].trim() : "";
    if (!bookingSuburbArray.includes(suburb)) {
      bookingSuburbArray.push(suburb);
    }
  }
  return {
    isLoadingUserBooking,
    bookingYearArray,
    bookingSuburbArray,
  };
}

export function useUserBookings(username) {
  const isLoadingUserBooking = useSubscribe("all_user_bookings", username);
  const artistBookingData = useTracker(() => {
    return BookingCollection.find({ artistUsername: username }).fetch();
  });
  return { isLoadingUserBooking, artistBookingData };
}

/**
 * Collects all data relevant to artist reviews
 *
 * @param {string} username - username of the user to get data
 * @returns {Object} - returns an object containing: boolean isLoading that is true when loading, false when finished loading.
 * Also, the array of review data
 */
export function useArtistReviews(username) {
  const isLoadingReviews = useSubscribe("artist_reviews", username);
  const artistReviewData = useTracker(() => {
    return ReviewCollection.find({artistUsername: username}).fetch();
  })
  
  // loading data
  const isLoadingBookings = useSubscribe("all_user_bookings", username);
  const isLoadingServices = useSubscribe("all_user_services", username);
  const isLoadingBrides = useSubscribe("all_brides");
  const isLoading = isLoadingReviews() || isLoadingBookings() || isLoadingServices() || isLoadingBrides();

  // Extract relevant booking IDs from the reviews
  const reviewBookingId = artistReviewData.map(review => review.bookingId);

  // Retrieve booking objects based on the extracted IDs
  const relevantBookings = useTracker(() => {
    return BookingCollection.find({ _id: { $in: reviewBookingId } }).fetch();
  });

  // extract relevant service ID's from the bookings
  const bookingServiceId = relevantBookings.map(booking => booking.serviceId);

  // extract bride information
  const brideUsername = relevantBookings.map(booking => booking.brideUsername);

  const brideArray = useTracker(() => {
    return UserCollection.find({ username: { $in: brideUsername } }).fetch();
  })  
  // retrieve service objects based on the extracted ID's
  const serviceArray = useTracker(() => {
    return ServiceCollection.find({ _id: { $in: bookingServiceId } }).fetch();
  })

  // Create review array with relevant bookings and services
  const reviewArray = artistReviewData.map((review) => {
    // Find the booking associated with the review
    const booking = relevantBookings.find(booking => booking._id === review.bookingId);
    // find the bride with associated username from booking
    const bride = brideArray.find(bride => bride.username === booking.brideUsername);
    // Find the service associated with the booking
    const service = serviceArray.find(service => service._id === booking.serviceId);


    return {
      ...review,
      booking,
      bride,
      service,
    };
  });

  return {
    isLoading,
    reviewArray,
    artistReviewData
  }
}
