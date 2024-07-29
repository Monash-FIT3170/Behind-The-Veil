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

import nodemailer from "nodemailer";
// import {emailUser, emailPass} from "./secrets.js"

// change email template for verifying password
Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[Behind the Veil] Verify Your Email Address";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace( '#/', '' ), // replace # since it doesn't route properly with it in the URL
            emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n 
            If you did not request this verification, please ignore this email.`;

        return emailBody;
    }
};



// Leave for now for any methods that need to be called on start up.
Meteor.startup(async () => {

    if (Meteor.isServer) {
        // process.env.MAIL_URL = "smtps://nsha0054@student.monash.edu:a118e39765d19370b432c59e026af613-us17@smtp.mandrillapp.com:465"
        // process.env.SMTP_EMAIL = emailUser
        // process.env.SMTP_PASSWORD = emailPass
        // process.env.MAIL_URL = `smtps://${emailUser}:${emailPass}:@smtp.gmail.com:465` // tried: @ symbol = $40
        // process.env.MONGO_URL = "mongodb+srv://meteor-main:wO8tu15skxZ1jw59@cluster0.d99ecyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        // process.env.MONGO_URL = "mongodb://meteor-main:wO8tu15skxZ1jw59@ac-itwrhue-shard-00-00.d99ecyx.mongodb.net:27017,ac-itwrhue-shard-00-01.d99ecyx.mongodb.net:27017,ac-itwrhue-shard-00-02.d99ecyx.mongodb.net:27017/?ssl=true&replicaSet=atlas-44apap-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    }

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
    // Accounts.sendVerificationEmail("Mso8Y7HzBrXgaaTYF");

    // const info = await transporter.sendMail({
    //     from: '"AAAAA" <maddison53@ethereal.email>', // sender address
    //     to: "nsha0054@student.monash.edu", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });


});
