/**
 * File Description: Forget password: Reset password page
 * File version: 1.1
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Input from "../../input/Input";
import Button from "../../button/Button";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Page to change passwords
 */
export const ResetPasswordPage = () => {

    const navigate = useNavigate();

    // token to reset password
    const {token} = useParams();

    // form input values
    const [passwordInputs, setPasswordInputs] = useState({
        "initial": "",
        "retype": ""
    })

    const [errors, setErrors] = useState({
        initial: "",
        retype: "",
    });

    // change handler
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPasswordInputs(i => ({...i, [name]: value.trim()}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Password validation criteria
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        let newErrors = {};
        let errored = false;

        if (!passwordInputs.initial) {
            newErrors.initial = "Please input your new password."
            errored = true;
        }

        if (!passwordInputs.retype) {
            newErrors.retype = "Please retype your new password."
            errored = true
        }

        if (errored) {
            // if errored, then return here do not proceed
            setErrors(newErrors)
            return;
        }

        if (passwordInputs.initial === passwordInputs.retype) {

            // if matching, test for criteria
            if (passwordRegex.test(passwordInputs.initial)) {

                // password passed, password change call
                Accounts.resetPassword(token, passwordInputs.initial, (error) => {
                    // Check if input for current password matches the user's current password
                    if (error) {
                        newErrors.retype = 'Error: invalid token';
                        setErrors(newErrors);
                        alert('Error: invalid token')

                    } else {
                        Meteor.logout()
                        navigate(`/${UrlBasePath.FORGOT_PASSWORD}/complete`)
                    }
                });

            } else {
                // password criteria failed
                newErrors.initial = "New password does not meet requirements."
                setErrors(newErrors)
            }

        } else {
            // if not matching
            newErrors.retype = "Password does not match."
            setErrors(newErrors)
        }
    }

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
            <div className="text-center title-text mb-5">
                Reset Password
            </div>

            <form className="flex flex-col gap-y-8 items-center justify-center">

                <div className="flex flex-col gap-y-8 items-start w-fit">
                    <div className="flex flex-col gap-y-5 items-center justify-center">

                        <div className="flex flex-col gap-1 w-fit">
                            <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                                   name={"initial"}
                                   label={<label className={"main-text"}>New Password</label>}
                                   type={"password"}
                                   onChange={handleInputChange}
                            />
                            {errors.initial ? <span className="text-cancelled-colour">{errors.initial}</span> : null}
                        </div>

                        <div className="flex flex-col gap-1 w-fit">
                            <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                                   name={"retype"}
                                   label={<label className={"main-text"}>Retype password</label>}
                                   type={"password"}
                                   onChange={handleInputChange}
                            />
                            {errors.retype ? <span className="text-cancelled-colour">{errors.retype}</span> : null}
                        </div>
                    </div>

                    {/* Password requirements message */}
                    <div className="small-text text-dark-grey text-left w-4/5">
                        Please ensure your password has at least:
                        <ul className={"list-disc list-inside"}>
                            <li className={"ml-2"}>a number (0-9)</li>
                            <li className={"ml-2"}>a special character (!@#$%^&*(),.?":{}|)</li>
                            <li className={"ml-2"}>a lowercase letter (a-z)</li>
                            <li className={"ml-2"}>an uppercase letter (A-Z)</li>
                            <li className={"ml-2"}>minimum 8 characters</li>
                        </ul>
                    </div>
                </div>

                <Button type={"submit"}
                        className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/2 min-w-52"}
                        onClick={handleSubmit}
                >Change Password</Button>
            </form>

        </WhiteBackground>
    );
};

export default ResetPasswordPage;