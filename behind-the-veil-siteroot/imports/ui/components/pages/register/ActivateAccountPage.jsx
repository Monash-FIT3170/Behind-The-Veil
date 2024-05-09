/**
 * File Description: Activate Account page
 * File version: 1.0
 * Contributors: Ryan
 */

import React, { useState } from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import { useNavigate } from "react-router-dom";
import {
    ArrowRightIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

// TODO: Match code to one sent via email, then update user's activation attribute to True
const ActivateAccountPage = () => {
    const navigate = useNavigate();

    const handleActivation = () => {
        const activationCode = document.getElementById('activationCode').value.trim();

        if (!activationCode) {
            alert('Please enter the activation code.');
            return;
        }
        if (activationCode.length !== 6) {
            alert('Ensure the activation code is six digits.');
            return;
        }

        // user.activated = true
        console.log("Activated account");
        navigate('/register/accountActivated');
    };

    const flexContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
    };

    const ActionButton = ({ marginTop, label, onClick }) => (
        <div style={{ marginTop: marginTop, width: "80%", display: "flex", justifyContent: "center" }}>
            <Button
                type="button"
                className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                style={{ width: "40%", height: "50px" }}
                onClick={onClick}
            >
                {label}
            </Button>
        </div>
    );

    const TextInput = ({ label, id, name, placeholder, type = 'text', autoComplete = 'off' }) => {
        const [value, setValue] = useState('');

        const handleChange = (e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
        };

        return (
            <div>
                <label htmlFor={id} className="main-text">{label}</label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    style={{
                        marginBottom: '5px',
                        width: '100%',
                        height: '50px',
                        border: '1px solid lightgrey',
                        borderRadius: '5px',
                        padding: '10px'
                    }}
                />
            </div>
        );
    };

    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>
            {/*you MUST keep this div and put everything on the left side (e.g. the visual) of it*/}
            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}
                <span>Registration Page Visual here!!</span>
            </div>

            {/* Right side content */}
            <div style={{textAlign: "center", paddingTop: "5px"}}>
                <div className="title-text" style={{textAlign: "center", marginTop: "10px"}}>Activate Your Account</div>

                <div style={flexContainerStyle}>
                    <div
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <ArrowRightIcon className="text-green-500 h-10 w-10 mr-1"/>
                        <EnvelopeIcon className="h-12 w-12"/>
                    </div>

                    <div style={{width: "80%", textAlign: "center", marginTop: "5px"}}>
                        <TextInput label="Please enter the 6-digit code sent to your email" id="activationCode"
                                   name="activationCode" placeholder="Enter activation code"/>
                    </div>
                    {/* TODO: Remove this div below once email activation has been implemented */}
                    <div style={{fontSize: '14px', color: 'grey', marginTop: '5px'}}>
                        **Input any 6-digit number for now - email api to be implemented**
                    </div>

                    <ActionButton
                        marginTop="10px"
                        label="Activate"
                        onClick={handleActivation}
                    />
                </div>
            </div>
        </WhiteBackground>
    );
};

export default ActivateAccountPage;