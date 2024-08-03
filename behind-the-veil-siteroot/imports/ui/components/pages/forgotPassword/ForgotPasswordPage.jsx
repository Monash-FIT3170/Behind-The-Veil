/**
 * File Description: Forget password: Email page
 * File version: 1.2
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
import UrlBasePath from "../../../enums/UrlBasePath";
import Loader from "../../loader/Loader";


/**
 * User can enter password and get a link sent to reset password
 */
export const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const loadingUsers = useSubscribe('all_users');

    // get user data from meteor
    let usersEmailData = useTracker(() => {
        // an array of email arrays (one for each user even though each user only has 1 email)
        const emailArrays = UserCollection.find({}, {}).fetch();

        // get the emails ONLY if user data has loaded
        return emailArrays ? emailArrays.map((emailArray) => (
            emailArray.emails[0] ? emailArray.emails[0].address : null
        )) : []
    });

    // form input values and error displays
    const [emailInput, setEmailInput] = useState("")
    const [error, setError] = useState("");

    // changes
    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // check that this email is valid email or not
        let isError = false;

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailInput) {
            setError("Please input an email")
            isError = true;
        } else if (!emailRegex.test(emailInput)) {
            setError("Please input a valid email")
            isError = true;
        }

        if (!isError) {
            // do not display whether this email HAS an account or not (security purposes),
            // appear as if an email is sent for both cases
            if (usersEmailData.includes(emailInput)) {
                // send the email to reset password
                Accounts.forgotPassword({"email": emailInput});
            }

            navigate(`/${UrlBasePath.FORGOT_PASSWORD}/link-sent`)
        }
    }
    if (loadingUsers()) {
        return (
            <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
                <Loader
                    loadingText={"Loading . . ."}
                    isLoading={loadingUsers()}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        )
    } else {
        return (
            <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
                <div className="text-center title-text mb-5">
                    Forgot Password
                </div>

                <form className="flex flex-col gap-y-10 items-center justify-center">
                    <div className="flex flex-col gap-1 w-fit">
                        <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                               name="email"
                               label={<label className={"main-text"}>Please enter your email address</label>}
                               type={"email"}
                               placeholder={"Email Address"}
                               onChange={handleEmailChange}
                        />
                        {error ? <span className="text-cancelled-colour">{error}</span> : null}
                    </div>

                    <Button type={"submit"}
                            className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"}
                            onClick={handleSubmit}
                    >Verify Email</Button>
                </form>

            </WhiteBackground>
        );
    }

};

export default ForgotPasswordPage;