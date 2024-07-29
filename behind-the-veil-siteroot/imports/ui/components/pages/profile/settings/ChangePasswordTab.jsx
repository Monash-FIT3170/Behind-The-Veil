/**
 * File Description: Change Password Tab within the Settings Page
 * File version: 1.0
 * Contributors: Ryan
 */
import React, {useState} from "react";
import {Accounts} from 'meteor/accounts-base';
import Button from "../../../button/Button.jsx";
import Input from "../../../input/Input";
import {CheckIcon} from "@heroicons/react/24/outline";

/**
 * Change password tab within settings
 */
const ChangePasswordTab = () => {

    const handleChangePassword = (event) => {
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const retypeNewPassword = document.getElementById('retypeNewPassword').value;

        // Password validation criteria
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        // TODO: if current password doesnt match the local data current password for this account, then...

        if (!passwordRegex.test(newPassword)) {
            alert('Password must contain at least one number, one special character, one lowercase letter, one uppercase letter, and be at least 8 characters long.');
            return;
        }

        // Check if retypePassword matches password
        if (newPassword !== retypeNewPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Handle password change logic here
        // console.log('Password change request:', { currentPassword, newPassword });
        Accounts.changePassword(currentPassword, newPassword, (error) => {
            if (error) {
                alert(`Password Change Failed: ${error.message}`);
            } else {
                console.log('Password change request:', { currentPassword, newPassword });
                console.log('Password changed successfully!');
                // TODO: Confirmation of password change
            }
        });

        // TODO: Reset the form

    };

    const TextInput = ({labelText, id, name, placeholder, type = 'text', autoComplete = 'off'}) => {
        const [value, setValue] = useState('');

        const handleChange = (e) => {
            const inputValue = e.target.value;
            setValue(inputValue);
        };

        return (
            <Input
                label={<label htmlFor={id} className="main-text">{labelText}</label>}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={value}
                onChange={handleChange}
                className={"w-full"}
            />
        );
    };

    return (
        <form className={"flex flex-col items-center gap-4 p-2.5 w-4/5 max-w-96"} onSubmit={handleChangePassword}>
            <div className={"flex flex-col gap-y-3 w-full text-left"}>
                <TextInput
                    labelText="Current Password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Enter your current password"
                    type="password"
                />
                <TextInput
                    labelText="New Password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    type="password"
                />
                <TextInput
                    labelText="Retype New Password"
                    id="retypeNewPassword"
                    name="retypeNewPassword"
                    placeholder="Retype your new password"
                    type="password"
                />
            </div>

            {/* Password requirements message */}
            <div className="small-text text-dark-grey text-left w-full">
                Please ensure your password has at least:
                <ul className={"list-disc list-inside"}>
                    <li className={"ml-2"}>a number (0-9)</li>
                    <li className={"ml-2"}>a special character (e.g. % & ! )</li>
                    <li className={"ml-2"}>a lowercase letter (a-z)</li>
                    <li className={"ml-2"}>an uppercase letter (A-Z)</li>
                    <li className={"ml-2"}>minimum 8 characters</li>
                </ul>
            </div>

            <Button type={"submit"}
                    className={"bg-secondary-purple hover:bg-secondary-purple-hover w-1/3 min-w-40"}
                    onClick={handleChangePassword}>
                <CheckIcon className="w-5 h-5 mr-0.5 mb-0.5 inline"/>
                Confirm
            </Button>
        </form>
    );
};

export default ChangePasswordTab;