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
 */
export const ResetPasswordPage = () => {

    const navigate = useNavigate();

    // form input values
    const [passwordInputs, setPasswordInputs] = useState({
        "passwordInitial": "",
        "passwordRepeat": ""
    })

    // changes
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPasswordInputs(i => ({...i, [name]: value}))
    }

    // TODO: send this data to the next page
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form submitted with the following inputs: ${passwordInputs.passwordInitial} and verification: ${passwordInputs.passwordRepeat}`)

        if (passwordInputs.passwordInitial === passwordInputs.passwordRepeat) {
            // if correct
            navigate('/forgot-password/reset-complete')
        } else {
            // if incorrect
            alert("Password does not match")
        }
    }

    return (
        <WhiteBackground pageLayout={PageLayout.SMALL_CENTER}>
            <div className="text-center title-text mb-5">
                Forgot Password
            </div>

            <form className="flex flex-col gap-y-10 items-center justify-center">

                <div className="flex flex-col gap-y-5 items-center justify-center">
                    <div className="flex flex-col gap-y-1 items-left justify-center main-text">
                        <label>New Password</label>
                        <Input className={"lg:w-52 xl:w-96"}
                               type={"password"}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1 items-left justify-center main-text">
                        <div>Retype password</div>
                        <Input className={"lg:w-52 xl:w-96"}
                               type={"password"}
                               onChange={handleInputChange}
                        />
                    </div>
                </div>

                <Button type={"submit"}
                        className={"bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500 ease-in-out"}
                        onClick={handleSubmit}
                >Change Password</Button>
            </form>

        </WhiteBackground>
    );
};

export default ResetPasswordPage;