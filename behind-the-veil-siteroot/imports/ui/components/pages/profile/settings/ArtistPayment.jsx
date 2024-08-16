/**
 * File Description: Payment Details tab for the artist
 * File version: 1.1
 * Contributors: Cameron
 */
import React, { useState } from "react";
import { PaintBrushIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";

/**
 * Payment details tab which artist can edit on their own
 */
export const ArtistPayment = () => {
    const navigateTo = useNavigate();

    // State for editing mode and input values
    const [isEditing, setIsEditing] = useState(false);
    const [accountName, setAccountName] = useState();
    const [bsb, setBsb] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [newAccountName, setNewAccountName] = useState(accountName);
    const [newBsb, setNewBsb] = useState(bsb);
    const [newAccountNumber, setNewAccountNumber] = useState(accountNumber);

    // Toggle editing mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Save the updated details
    const handleSave = (event) => {
        event.preventDefault();
        setAccountName(newAccountName);
        setBsb(newBsb);
        setAccountNumber(newAccountNumber);
        setIsEditing(false);
        //navigateTo(`/settings/payment-edit`); // Redirect or update as needed
    };

    // Validate and format BSB number to '111-111'
    const formatBsb = (value) => {
        // Remove all non-numeric characters
        const digits = value.replace(/\D/g, '');
        // Add hyphen after the third digit
        return digits.length > 3
            ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}`
            : digits;
    };

    // Handler for BSB input change
    const handleBsbChange = (event) => {
        const formattedValue = formatBsb(event.target.value);
        setNewBsb(formattedValue);
    };

    // Validate and format account number to only numeric values
    const handleAccountNumberChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, ''); // Allow only digits
        setNewAccountNumber(value);
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
                                onChange={(e) => setNewAccountName(e.target.value)}
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
                            <Input
                                type="text"
                                value={newBsb}
                                onChange={handleBsbChange}
                                placeholder="Enter BSB Number"
                            />
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
                    <PaintBrushIcon className="icon-base" />
                    Edit Bank Details
                </Button>
            )}
        </div>
    );
};

export default ArtistPayment;
