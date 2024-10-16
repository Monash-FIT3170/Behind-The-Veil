import { Meteor } from 'meteor/meteor';

import "/imports/api/collections/bookings.js";
import "/imports/api/methods/bookings.js";
import "/imports/api/publications/bookings.js";

import "/imports/api/collections/services.js";
import "/imports/api/methods/services.js";
import "/imports/api/publications/services.js";

import "/imports/api/collections/users.js";
import "/imports/api/methods/users.js";
import "/imports/api/publications/users.js";

import "/imports/api/collections/posts.js";
import "/imports/api/methods/posts.js";
import "/imports/api/publications/posts";

import "/imports/api/methods/payments.js";

import "/imports/api/collections/chats.js";
import "/imports/api/methods/chats.js";
import "/imports/api/publications/chats.js";

import "/imports/api/collections/messages.js";
import "/imports/api/methods/messages.js";
import "/imports/api/publications/messages.js";

import "/imports/api/collections/reviews.js";
import "/imports/api/methods/reviews.js";
import "/imports/api/publications/reviews.js";

import "/imports/api/collections/receipts.js";
import "/imports/api/methods/receipts.js";

import "/imports/api/mailer.js"
import {checkBookingsEveryMidnight} from "./background.js"

// Leave for now for any methods that need to be called on start up.
Meteor.startup(async () => {

    if (Meteor.isServer) {
        Accounts.emailTemplates.from = process.env.FROM_USER;

        // change email template for verifying password
        Accounts.emailTemplates.verifyEmail = {
            subject() {
                return "[Behind the Veil] Verify Your Email Address";
            },
            text(user, url) {
                let emailAddress = user.emails[0].address,
                    urlWithoutHash = url.replace('#/', ''), // replace # since it doesn't route properly with it in the URL
                    emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n` +
                        `${urlWithoutHash}\n\n`+
                        `If you did not request this verification, please ignore this email.`;

                return emailBody;
            }
        };

        // change email template for resetting password
        Accounts.emailTemplates.resetPassword = {
            subject() {
                return "[Behind the Veil] Reset Password Link";
            },
            text(user, url) {
                let emailAddress = user.emails[0].address,
                    urlWithoutHash = url.replace('#/', ''), // replace # since it doesn't route properly with it in the URL
                    emailBody = `You requested a link to reset your password for ${emailAddress}. \n\n`+
                        `Reset password link:\n\n`+
                        `${urlWithoutHash}\n\n`+
                        `If you did not request this verification, please ignore this email.`;

                return emailBody;
            }
        }
        
        // update bookings every midnight
        checkBookingsEveryMidnight()
    }
});
