/**
 * File Description: Account Details within the Settings page
 * File version: 1.2
 * Contributors: Kyle, Nikki
 */
import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { ArrowUpTrayIcon, CheckIcon } from "@heroicons/react/24/outline";

import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import ProfilePhoto from "../../../profilePhoto/ProfilePhoto.jsx"
import {useUserInfo, imageObj} from "../../../util";
import Loader from "../../../loader/Loader";
import UserCollection from "../../../../../api/collections/users";

/**
 * This page allows both artists and brides to change their name/alias, email address and profile image
 * The name/alias and email address can be edited using a text input field
 * The profile image can be edited using an image dump
 */
export const AccountDetails = () => {

    // get user information and their profile photo
    const userInfo = useUserInfo();

    // get all user data to check for all existing emails
    const isLoadingUsers = useSubscribe('all_users');

    // get user data from meteor
    let usersEmailData = useTracker(() => {
        // an array of email arrays (one for each user even though each user only has 1 email)
        const emailArrays = UserCollection.find({}, {}).fetch();

        // get the emails ONLY if user data has loaded
        return emailArrays ? emailArrays.map((emailArray) => (
            emailArray.emails[0] ? emailArray.emails[0].address.toLowerCase() : null
        )) : []
    });

    // Keeps track of the values in the text inputs
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formState, setFormState] = useState({
        alias: "",
        email: "",
    });

    // error texts under the text inputs
    const [textErrors, setTextErrors] = useState({
        alias: "",
        email: "",
    })

    // Changes the values in text input of form
    const handleInputChange = (e) => {
        let {name, value} = e.target;
        value = value.trim()

        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // keep track of uploaded image for profile
    const [imageObject, setImageObject] = useState(null) // this is the actual file, to be stored in database
    const allowedFileTypeExtensions = [".png", ".jpg", ".jpeg"];

    useEffect(() => {
        setImageObject(userInfo.profileImage)
    }, [])

    // error texts under the text inputs
    const [imageError, setImageError] = useState("")

    // handler for uploading file button
    const onUploadFile = e => {
        const file = e.target.files[0];

        if (!file) {
            // if no file selected, do nothing
            return;
        } else if (!allowedFileTypeExtensions.some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()))) {
            setImageError("Please select a png, jpg, or jpeg file.")
            return;
        } else if (file.size > 16777216) {
            setImageError("File must be less than 16MB");
            return;
        } 
        else {
            setImageError("")

            const reader = new FileReader();

            // Convert the file to take URL format
            reader.onloadend = () => {
            const image = imageObj(reader.result, file.name, file.size);
            setImageObject(image);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleFileClear = (e) => {
        setImageObject(null)
    }

    // Updates the values inputted into the text fields, if they have changed and are valid.
    const handleSave = (event) => {
        event.preventDefault();
        setIsSubmitting(true)

        // Grabs the updated values from the formState object. (which keeps track of these values as they are changed in the text fields).
        const {alias, email} = formState;

        let newErrors = {}
        let isError = false;

        // check email is valid
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email && !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isError = true;
        } else if (usersEmailData.includes(email.toLowerCase())) {
            newErrors.email = 'Email address has already been used.';
            isError = true;
        }

        // check alias is valid
        const alphanumericSpaceRegex = /^[A-Za-z0-9 ]+$/i;
        if (alias && !alphanumericSpaceRegex.test(alias)) {
            newErrors.alias = 'Name/alias cannot contain special character (except spaces).';
            isError = true;
        } else if (alias && alias.length > 20) {
            newErrors.alias = 'Alias cannot be longer than 20 characters.';
            isError = true;
        }

        // Update text errors state with new error messages
        setTextErrors(newErrors);

        console.log(isError)
        if (!isError) {

            new Promise((resolve, reject) => {
                // Update alias
                if (alias !== userInfo.alias && alias !== "") {
                    Meteor.call('update_alias', userInfo.id, alias,
                        (error) => {
                            if (error) {
                                reject(error)
                            }
                        });
                }

                // Update email address
                if (email !== userInfo.email && email !== "") {
                    Meteor.call('update_email', userInfo.id, userInfo.email, email,
                        (error) => {
                            if (error) {
                                reject(error)
                            }
                        });
                }
                
                // update profile image
               if (imageObject !== userInfo.profileImage) {
                    console.log(imageObject)
                    Meteor.call('update_profile_image', userInfo.id, imageObject);
                }

                resolve()

            }).then(() => {
                setIsSubmitting(false)
                setFormState({
                    alias: "",
                    email: "",
                })

            }).catch(() => {
                setIsSubmitting(false)
                setTextErrors({overall: "Failed to update account settings. Please try again."})
            })

        } else {
            setIsSubmitting(false)
        }
    };

    if (isLoadingUsers()) {
        // wait for load data
        return (
            <Loader
                loadingText={"Account details are loading . . ."}
                size={100}
                speed={1.5}
            />
        )
    } else {
        // data is loaded
        return (
            <div className="flex flex-col items-start justify-center gap-6 pl-[5%] lg:pl-[15%]">
                {/* Username */}
                <div className="flex flex-col items-left gap-y-2">
                    <div className="main-text">Username</div>
                    <div className="main-text ml-10 text-dark-grey">@{userInfo.username}</div>
                </div>

                {/* Name/Alias input */}
                <div className="flex flex-col gap-1">
                    <Input
                        type="text"
                        name="alias"
                        label={<label className={"main-text"}>Name/Alias</label>}
                        onChange={handleInputChange}
                        placeholder={userInfo.alias}
                        className="lg:w-[40vw] sm:w-96"
                    />
                    {textErrors.alias && <span className="text-cancelled-colour">{textErrors.alias}</span>}
                </div>

                {/* Email input */}
                <div className="flex flex-col gap-1">
                    <Input
                        type="text"
                        name="email"
                        label={<label className={"main-text"}>Email</label>}
                        onChange={handleInputChange}
                        placeholder={userInfo.email}
                        className="lg:w-[40vw] sm:w-96"/>
                    {textErrors.email && <span className="text-cancelled-colour">{textErrors.email}</span>}
                </div>

                {/* Profile Image input */}
                <div className="flex flex-col items-left gap-y-1">
                    <div className="main-text">Profile Image</div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <ProfilePhoto userPhotoData={imageObject ? imageObject.imageData : null}/>

                        <div className={"flex flex-col gap-1"}>
                            <Input
                                hidden
                                type="file"
                                accept={allowedFileTypeExtensions?.join(",")}
                                name={"profilePhoto"}
                                id={"upload-input"}
                                onChange={onUploadFile}
                                onClick={(event) => {
                                    // this is to allow the same file to be selected again after reset
                                    event.target.value = null
                                }}
                            />
                            <label className={"btn-base flex gap-2 cursor-pointer"} htmlFor={"upload-input"}>
                                <ArrowUpTrayIcon className="icon-base"/>
                                Upload File
                            </label>
                            {
                                imageObject ?
                                    <Button className="btn-base" onClick={() => handleFileClear()}>
                                        Reset Image
                                    </Button> :
                                    null
                            }
                        </div>
                    </div>
                    {imageError && <span className="text-cancelled-colour">{imageError}</span>}

                </div>

                {textErrors.overall && <span className="text-cancelled-colour">{textErrors.overall}</span>}

                {/* Save button */}
                <Button disabled={isSubmitting}
                        className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 load-when-disabled"
                        onClick={handleSave}>
                    <CheckIcon className="icon-base"/>
                    Save Changes
                </Button>
            </div>
        );
    }
};

export default AccountDetails;