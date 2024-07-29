/**
 * File Description: Change Password Tab within the Settings Page
 * File version: 1.0
 * Contributors: Ryan
 */
import React, { useState } from "react";
import { Accounts } from 'meteor/accounts-base';
import Button from "../../../button/Button.jsx";
import Input from "../../../input/Input";
import { CheckIcon } from "@heroicons/react/24/outline";

/**
 * Change password tab within settings
 */
const ChangePasswordTab = () => {
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        retypeNewPassword: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChangePassword = (event) => {
        event.preventDefault();
        setSuccessMessage('');

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const retypeNewPassword = document.getElementById('retypeNewPassword').value;

        // Password validation criteria
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        let newErrors = {};
        let isError = false;

        // first check to ensure all text fields have inputs
        if (!currentPassword.trim() || !newPassword.trim() || !retypeNewPassword.trim()) {
            if (!currentPassword.trim()) {
                newErrors.currentPassword = 'Please input your current password.';
                isError = true;
            }
            if (!newPassword.trim()) {
                newErrors.newPassword = 'Please input your new password.';
                isError = true;
            }
            if (!retypeNewPassword.trim()) {
                newErrors.retypeNewPassword = 'Please retype your new password.';
                isError = true;
            }
            if (isError) {
                setErrors(newErrors);
                return;
            }
        }

        // second check to ensure the new password matches the requirements regex
        if (!passwordRegex.test(newPassword)) {
            newErrors.newPassword = 'Password must adhere to requirements below';
            isError = true;
        }
        // third check to ensure the new password and retype new password match
        if (newPassword !== retypeNewPassword) {
            newErrors.retypeNewPassword = 'Passwords do not match.';
            isError = true;
        }
        if (isError) {
            setErrors(newErrors);
            return;
        }

        // Handle password change logic here
        Accounts.changePassword(currentPassword, newPassword, (error) => {
            // Check if input for current password matches the user's current password
            if (error) {
                newErrors.currentPassword = 'Input does not match current password.'
                setErrors(newErrors);
            } else {
                console.log('Password change request:', { currentPassword, newPassword });
                console.log('Password changed successfully!');
                setErrors({ currentPassword: "", newPassword: "", retypeNewPassword: "" });
                setSuccessMessage('Password changed successfully!');
            }
        });
    };

    const TextInput = ({ labelText, id, name, placeholder, type = 'text', autoComplete = 'off', error }) => {
        const [value, setValue] = useState('');

        const handleChange = (e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
        };

        return (
            <div className="flex flex-col gap-1 w-full">
                <Input
                    label={<label htmlFor={id} className="main-text">{labelText}</label>}
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    className="w-full"
                />
                {error && <span className="text-cancelled-colour">{error}</span>}
            </div>
        );
    };

    return (
        <form className="flex flex-col items-center gap-4 p-2.5 w-4/5 max-w-96" onSubmit={handleChangePassword}>
            <div className="flex flex-col gap-y-3 w-full text-left">
                <TextInput
                    labelText="Current Password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Enter your current password"
                    type="password"
                    error={errors.currentPassword}
                />
                <TextInput
                    labelText="New Password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    type="password"
                    error={errors.newPassword}
                />
                <TextInput
                    labelText="Retype New Password"
                    id="retypeNewPassword"
                    name="retypeNewPassword"
                    placeholder="Retype your new password"
                    type="password"
                    error={errors.retypeNewPassword}
                />
            </div>

            {/* Password requirements message */}
            <div className="small-text text-dark-grey text-left w-full">
                Please ensure your password has at least:
                <ul className="list-disc list-inside">
                    <li className="ml-2">a number (0-9)</li>
                    <li className="ml-2">a special character (!@#$%^&*(),.?":{}|)</li>
                    <li className="ml-2">a lowercase letter (a-z)</li>
                    <li className="ml-2">an uppercase letter (A-Z)</li>
                    <li className="ml-2">minimum 8 characters</li>
                </ul>
            </div>

            {successMessage && <div className="text-green-500">{successMessage}</div>}

            <Button type="submit"
                    className="bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40">
                <CheckIcon className="w-5 h-5 mr-0.5 mb-0.5 inline" />
                Confirm
            </Button>
        </form>
    );
};

export default ChangePasswordTab;