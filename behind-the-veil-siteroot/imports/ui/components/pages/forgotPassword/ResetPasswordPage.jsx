/**
 * File Description: Forget password: Reset password page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Input from "../../input/Input";
import Button from "../../button/Button";
import {useNavigate} from "react-router-dom";


/**
 * Page to change passwords
 */
export const ResetPasswordPage = () => {

    const navigate = useNavigate();

    // form input values
    const [passwordInputs, setPasswordInputs] = useState({
        "initial": "",
        "retype": ""
    })

    // change handler
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPasswordInputs(i => ({...i, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Password validation criteria
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&+/,|<>{})(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!passwordInputs.initial || !passwordInputs.retype) {
            // if empty
            alert("Please enter new passwords")

        } else if (passwordInputs.initial === passwordInputs.retype) {

            // if matching, test for criteria
            if (passwordRegex.test(passwordInputs.initial)) {
                // password passed
                navigate('/forgot-password/reset-complete')
            } else {
                // password criteria failed
                alert('Password must contain at least one number, one special character, one lowercase letter, one uppercase letter, and be at least 8 characters long.');
            }

        } else {
            // if not matching
            alert("Password does not match")
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
                        <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                               name={"initial"}
                               label={<label className={"main-text"}>New Password</label>}
                               type={"password"}
                               onChange={handleInputChange}
                        />

                        <Input className={"sm:w-96 lg:w-64 xl:w-96"}
                               name={"retype"}
                               label={<label className={"main-text"}>Retype password</label>}
                               type={"password"}
                               onChange={handleInputChange}
                        />
                    </div>

                    {/* Password requirements message */}
                    <div className="small-text text-dark-grey text-left w-4/5">
                        Please ensure your password has at least:
                        <ul className={"list-disc list-inside"}>
                            <li className={"ml-2"}>a number (0-9)</li>
                            <li className={"ml-2"}>a special character (e.g. % & ! )</li>
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