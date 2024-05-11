/**
 * File Description: Sign-in page
 * File version: 1.1
 * Contributors: Nikki
 */

import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import {UserIcon, KeyIcon} from "@heroicons/react/24/outline";

import SignInImage from '../../images/SignInImage.jsx';
import Input from "../../input/Input";

/**
 * Page where user can sign in to their account
 */
export const LoginPage = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        "username": "", "password": ""
    });

    // form related functions
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(i => ({...i, [name]: value}))
    }

    function handleSubmit(event) {
        // todo: authentication
        event.preventDefault();
        alert("login with email: " + inputs.username + " and password: " + inputs.password);

    }

    return (// if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}

                <div className={"flex flex-col gap-24 items-center text-center"}>
                    <div className="title-text text-secondary-purple-hover w-[400px]">
                        Bridal Makeup & Services
                    </div>
                    <SignInImage></SignInImage>
                </div>
            </div>

            <div>
                <div className="title-text text-center">Sign In</div>

                <div className={"flex flex-col items-center gap-2.5 mt-12"}>
                    <div className={"relative"}>
                        <span className={"absolute left-2.5 top-1/2 -translate-y-1/2"}>
                        <UserIcon className={"size-6 stroke-2 text-dark-grey"}/>
                        </span>
                        <Input type="text"
                               placeholder="Username"
                               className={"pl-12 w-64 sm:w-96 lg:w-64 xl:w-96"}
                               name="username"
                               onChange={handleInputChange}/>
                    </div>

                    <div className={"relative"}>
                        <span className={"absolute left-2.5 top-1/2 -translate-y-1/2"}>
                        <KeyIcon className={"size-6 stroke-2 text-dark-grey"}/>
                        </span>
                        <Input type="password"
                               placeholder="Password"
                               className={"pl-12 w-64 sm:w-96 lg:w-64 xl:w-96 "}
                               name="password"
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="text-hyperlink-colour underline cursor-pointer ml-auto mr-[10%] right-0">
                        Forgot password?
                    </div>
                </div>

                <div className={"flex flex-col items-center gap-2.5 mt-12"}>
                    <Button className="bg-secondary-purple hover:bg-secondary-purple-hover w-1/2 min-w-40"
                            onClick={handleSubmit}>
                        Sign in
                    </Button>
                    <Button className="w-1/2 min-w-40"
                            onClick={() => {
                                console.log("AAA");
                                navigate("/register");
                            }}>
                        Register
                    </Button>
                </div>
            </div>
        </WhiteBackground>);
};

export default LoginPage;