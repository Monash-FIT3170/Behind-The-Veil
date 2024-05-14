/**
 * File Description: Forget password: email verification page
 * File version: 1.0
 * Contributors:
 */

import React, {useState} from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Input from "../../input/Input";
import Button from "../../button/Button";
import {useNavigate} from "react-router-dom";
import UserCollection from "../../../../api/collections/users";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import ServiceCard from "../../card/ServiceCard";


/**
 * Page of a list of Artist cards for users to see
 */
export const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const isLoadingUsers = useSubscribe('all_users');

    // get user data from meteor
    let usersEmailData = useTracker(() => {
        // an array of email arrays (one for each user even though each user only has 1 email)
        const emailArrays = UserCollection.find({}, {
            fields: { "emails": 1 }
        }).fetch();

        return emailArrays.map((emailArray) => (
            emailArray.emails[0].address
        ))
    });

    // form input values
    const [emailInput, setEmailInput] = useState("")
    const [verificationInput, setVerificationInput] = useState("")

    // changes
    const handleEmailChange = (event) => {
        setEmailInput(event.target.value);
    };
    const handleVerificationChange = (event) => {
        setVerificationInput(event.target.value);
    };

    const handleSendEmail = (event) => {
        event.preventDefault();
        // check that this email is valid email or not
        if (!emailInput) {
            alert("Please enter a valid email");
        } else {
            console.log(usersEmailData);

            // check if email belongs to valid user
            if (usersEmailData.includes(emailInput)) {
                alert("Existing email, email sent to " + emailInput);
            } else {
                alert("non-existing:" + emailInput);
            }
        }
    }

    // TODO: send this data to the next page
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form submitted with the following inputs: ${emailInput} and verification: ${verificationInput}`)

        // if correct
        navigate('/forgot-password/reset-password')

        // if incorrect
    }

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
            <div className="text-center title-text mb-5">
                Forgot Password
            </div>

            <form className="flex flex-col gap-y-5 items-center justify-center">

                <div className="flex flex-col gap-y-5 items-left justify-center">
                    <div className={"flex flex-row gap-5 items-center justify-start"}>
                        <Input className={"lg:w-52 xl:w-96"}
                               type={"email"}
                               placeholder={"Email Address"}
                               onChange={handleEmailChange}
                        />
                        <Button onClick={handleSendEmail}
                        >Send</Button>
                    </div>
                    <div className={"small-text"}>You will receive an email with the verification code</div>
                    <Input className={"lg:w-52 xl:w-96"}
                           type={"text"}
                           placeholder={"Verification Code"}
                           onChange={handleVerificationChange}
                    />
                </div>

                <Button type={"submit"}
                        className={"bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500 ease-in-out"}
                        onClick={handleSubmit}
                >Verify
                    Email</Button>
            </form>

        </WhiteBackground>
    );
};

export default ForgotPasswordPage;