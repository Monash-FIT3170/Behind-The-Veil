/**
 * File Description: Account Details within the Settings page
 * File version: 1.0
 * Contributors: Kyle, Nikki
 */
import React, {useEffect, useState} from "react";
import {Meteor} from "meteor/meteor";
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import { PaintBrushIcon} from "@heroicons/react/24/outline";

import {useNavigate} from "react-router-dom";

import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import ProfilePhoto from "../../../profilePhoto/ProfilePhoto.jsx"
import {getUserInfo} from "../../../util";
import Loader from "../../../loader/Loader";

/**
 * This page allows both artists and brides to change their name/alias, email address and profile image
 * The name/alias and email address can be edited using a text input field
 * The profile image can be edited using an image dump
 */
export const PaymentDetailsTab = () => {

    const navigateTo = useNavigate();
    // Updates the values inputted into the text fields, if they have changed and are valid.
    const handleSave = (event) => {
         navigateTo(`/payment-details`)
    };

        return (
            <div className="flex flex-col items-start justify-center gap-6 pl-[5%] lg:pl-[15%]">
                {/* Infos */}
                <div className="flex flex-col items-left gap-y-2">
                    <div className="main-text text-dark-grey">
                    Account Name
                    <span className="text-black ml-7"> Alice Tran</span>
                    </div>
                    <div className="main-text text-dark-grey">BSB Number
                    <span className="text-black ml-11"> 111-222</span>
                    </div>  
                    <div className="main-text text-dark-grey">Account Number
                    <span className="text-black ml-4"> 16338428</span>
                    </div>

                </div>

                {/* Edit button */}
                <Button
                    className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                    onClick={handleSave}>
                    <PaintBrushIcon className="icon-base"/>
                    Edit Bank Details
                </Button>
            </div>
        );
    
};

export default PaymentDetailsTab;