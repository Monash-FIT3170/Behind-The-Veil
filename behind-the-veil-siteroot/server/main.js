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

import "/imports/api/collections/images.js";
import "/imports/api/methods/images.js";
import "/imports/api/publications/images";

import "/imports/api/collections/posts.js";
import "/imports/api/methods/posts.js";
import "/imports/api/publications/posts";

import "/imports/api/methods/payment.js";

// file in the same folder containing creds for mail server
// import {emailUser, emailPass, mailUrl, fromUser} from "./secrets.js"


// Leave for now for any methods that need to be called on start up.
Meteor.startup(async () => {

    if (Meteor.isServer) {
        // process.env.MAIL_URL = mailUrl;
        // Accounts.emailTemplates.from = fromUser;

        // change email template for verifying password
        Accounts.emailTemplates.verifyEmail = {
            subject() {
                return "[Behind the Veil] Verify Your Email Address";
            },
            text(user, url) {
                let emailAddress = user.emails[0].address,
                    urlWithoutHash = url.replace('#/', ''), // replace # since it doesn't route properly with it in the URL
                    emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\nIf you did not request this verification, please ignore this email.`;

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
                    emailBody = `You requested a link to reset your password for ${emailAddress}. \n\nReset password link:\n\n${urlWithoutHash}\n\nIf you did not request this verification, please ignore this email.`;

                return emailBody;
            }
        };
    }

    // nsha0054@student.monash.edu
    // const smtpConfig = {
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: emailUser,
    //         pass: emailPass
    //     }
    // };
    //
    // const transporter = nodemailer.createTransport(smtpConfig);
    //
    // // verify connection configuration
    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Server is ready to take our messages');
    //     }
    // });
    //
    // Accounts.emailTemplates.from = 'AwesomeSite Admin <accounts@example.com>';
    //

    // const info = await transporter.sendMail({
    //     from: '"AAAAA" <maddison53@ethereal.email>', // sender address
    //     to: "nsha0054@student.monash.edu", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });
});
