/**
 * File Description: Forget password: Email page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {Accounts} from "meteor/accounts-base";
import UserCollection from "../../../../api/collections/users";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Input from "../../input/Input";
import Button from "../../button/Button";


/**
 * User can enter password and get a link sent to reset password
 */
export const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const loadingUsers = useSubscribe('all_users');

    // get user data from meteor
    let usersEmailData = useTracker(() => {
        // an array of email arrays (one for each user even though each user only has 1 email)
        const emailArrays = UserCollection.find({}, {
            fields: {"emails": 1}
        }).fetch();

        // get the emails ONLY if user data has loaded
        return emailArrays ? emailArrays.map((emailArray) => (
            emailArray.emails[0].address
        )) : []
    });

    // form input values
    const [emailInput, setEmailInput] = useState("")

    // changes
    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // check that this email is valid email or not
        if (!emailInput) {
            alert("Please enter a valid email");
        } else {

            if (usersEmailData.includes(emailInput)) {
                // send the email to reset password
                Accounts.forgotPassword({"email": emailInput});
            }

            // todo: change to navigate to home page later after demo
            alert("(to be implemented) Sending email to: " + emailInput +
                "\nThis email is in the database: " + usersEmailData.includes(emailInput));

            alert("navigating to change password page for demonstration purposes");
            navigate('/reset-password/demodemodemo')
        }
    }

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
            <div className="text-center title-text mb-5">
                Forgot Password
            </div>

            <form className="flex flex-col gap-y-10 items-center justify-center">
                <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                       name="email"
                       label={<label className={"main-text"}>Please enter your email address</label>}
                       type={"email"}
                       placeholder={"Email Address"}
                       onChange={handleEmailChange}
                />

                <Button type={"submit"}
                        className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"}
                        onClick={handleSubmit}
                >Verify Email</Button>
            </form>

        </WhiteBackground>
    );
};

export default ForgotPasswordPage;