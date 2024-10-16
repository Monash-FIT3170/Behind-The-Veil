import React, { useState } from "react";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../../util";
import UrlBasePath from "../../../../enums/UrlBasePath";

/**
 * Payment details tab which artist can edit on their own
 */
export const ArtistPayment = () => {
    const navigateTo = useNavigate();

    if (useUserInfo().type === "bride") {
        navigateTo(`/${UrlBasePath.HOME}`);
    }

    // State for editing mode and input values
    const [isEditing, setIsEditing] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [bsb, setBsb] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [newAccountName, setNewAccountName] = useState(accountName);
    const [newBsb, setNewBsb] = useState(bsb);
    const [newAccountNumber, setNewAccountNumber] = useState(accountNumber);

    // State for error messages
    const [bsbError, setBsbError] = useState("");

    // Toggle editing mode
    const handleEditClick = () => {
        setIsEditing(true);
        setBsbError(""); // Clear any previous errors
    };

    // Save the updated details with validation
    const handleSave = (event) => {
        event.preventDefault();
        // Reset error message
        setBsbError("");

        // BSB validation: check if it matches the required '111-111' format
        const bsbDigits = newBsb.replace(/\D/g, ''); // Get only the digits
        if (bsbDigits.length !== 6) {
            setBsbError("  BSB must be in the format '###-###'");
            return; // Prevent save if the BSB format is incorrect
        }

        // Save the values
        setAccountName(newAccountName);
        setBsb(newBsb);
        setAccountNumber(newAccountNumber);
        setIsEditing(false);
    };

    // Validate and format BSB number to '111-111'
    const formatBsb = (value) => {
        const digits = value.replace(/\D/g, ''); // Remove all non-numeric characters
        return digits.length > 3
            ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}`
            : digits;
    };

    // Handler for BSB input change
    const handleBsbChange = (event) => {
        const formattedValue = formatBsb(event.target.value);
        setNewBsb(formattedValue);
        setBsbError(""); // Clear error message when user is typing
    };

    // Validate and format account number to only numeric values with a maximum of 10 digits
    const handleAccountNumberChange = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, ''); // Allow only digits
        if (value.length > 10) {
            value = value.slice(0, 10); // Limit to 10 digits
        }
        setNewAccountNumber(value);
    };

    // Prevent numbers from being entered into account name
    const handleAccountNameChange = (event) => {
        const value = event.target.value.replace(/[0-9]/g, ''); // Remove any numbers
        setNewAccountName(value);
    };

    return (
        <div className="flex flex-col items-start justify-center gap-6 pl-[5%] lg:pl-[15%]">
            {/* Infos */}
            <div className="flex flex-col items-left gap-y-2">
                {/* Account name box */}
                <div className="main-text text-dark-grey">
                    Account Name
                    <span className="text-black ml-7">
                        {isEditing ? (
                            <Input
                                type="text"
                                value={newAccountName}
                                onChange={handleAccountNameChange}
                                placeholder="Enter Account Name"
                            />
                        ) : (
                            accountName
                        )}
                    </span>
                </div>
                {/* BSB box */}
                <div className="main-text text-dark-grey">
                    BSB Number
                    <span className="text-black ml-11">
                        {isEditing ? (
                            <>
                                <Input
                                    type="text"
                                    value={newBsb}
                                    onChange={handleBsbChange}
                                    placeholder="Enter BSB Number"
                                />
                                {bsbError && <span className="text-cancelled-colour">{bsbError}</span>}
                            </>
                        ) : (
                            bsb
                        )}
                    </span>
                </div>
                {/* Account Num box */}
                <div className="main-text text-dark-grey">
                    Account Number
                    <span className="text-black ml-4">
                        {isEditing ? (
                            <Input
                                type="text"
                                value={newAccountNumber}
                                onChange={handleAccountNumberChange}
                                placeholder="Enter Account Number"
                                maxLength={10} // Ensure no more than 10 characters are entered
                            />
                        ) : (
                            accountNumber
                        )}
                    </span>
                </div>
            </div>

            {/* Edit button */}
            {isEditing ? (
                <Button
                    className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                    onClick={handleSave}
                >
                    <CheckIcon className="icon-base" />
                    Save
                </Button>
            ) : (
                <Button
                    className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                    onClick={handleEditClick}
                >
                    <PencilIcon className="icon-base" />
                    Edit Bank Details
                </Button>
            )}
        </div>
    );
};

export default ArtistPayment;
