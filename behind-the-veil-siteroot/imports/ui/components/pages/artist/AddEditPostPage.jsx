/**
 * File Description: Artist can add a post/image to the gallery tab with a description of the post
 * File version: 1.2
 * Contributors: Hirun, Nikki
 */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageObj, useUserInfo } from "../../util.jsx";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import BackButton from "../../button/BackButton.jsx";
import { ArrowUpTrayIcon, CheckIcon } from "@heroicons/react/24/outline";
import UrlBasePath from "../../../enums/UrlBasePath";

export const AddEditPostPage = ({isEdit}) => {

    // text for title/save button
    const title = isEdit ? "Edit Photo In Gallery" : "Add Photo To Gallery";
    const button = isEdit ? "Edit Post" : "Add Post";

    const [postDescription, setPostDescription] = useState("");
    const [imageObject, setImageObject] = useState(null);
    const [fileError, setFileError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [overallErrorMessage, setOverallErrorMessage] = useState("");
    const [overallSuccessMessage, setOverallSuccessMessage] = useState("");
    const date = new Date();

    const allowedFileTypeExtensions = [".png", ".jpg", ".jpeg"];

    const navigateTo = useNavigate();

    const userInfo = useUserInfo();

    // if user is not an artist, navigate them away
    if (userInfo.type !== "artist") {
        navigateTo(`/`);
    }

    // gets the postId from the URL
    const {postId} = useParams();

    const fileInputRef = useRef(null); // used since the file classname is hidden to ensure that ui is in specific format

    // Load in existing post information if it is editing
    useEffect(() => {
        if (isEdit) {
            // Function to retrieve post details
            const retrievePost = () => {
                return new Promise((resolve, reject) => {
                    Meteor.call("get_post", postId, (error, editPost) => {
                        if (error) {
                            reject(`Error: ${error.message}`);
                        } else {
                            console.log(editPost);
                            resolve(editPost);
                        }
                    });
                });
            };

            // first use the retrievePost function
            retrievePost()
                .then((post) => {
                    // Validate that the post belongs to the current user if not take them away
                    if (post.artistUsername !== userInfo.username) {
                        navigateTo("/" + UrlBasePath.PROFILE);
                    }
                    setPostDescription(post.postDescription); // Set the post description
                    setImageObject(post.postImage);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }, []);

    // function to handle description
    function handleInputChange(event) {
        const description = event.target.value;
        setPostDescription(description);
        if (event.target.value) {
            setDescriptionError(""); // Clear the error when a description is entered
        }
    }

    // function to handle the upload of image, ensuring that it is in the correct format (in this case URL type of format)
    function handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            // Validate file type
            if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                setFileError("Please upload a valid image file (.png, .jpg, .jpeg).");
                setImageObject(null); // Clear the file input
                return;

            } else if (file.size > 16777216) {
                setFileError("File must be less than 16MB");
                setImageObject(null); // Clear the file input
                return;

            } else {
                setFileError(""); // Clear the error when a valid file is uploaded

                const reader = new FileReader();

                // Convert the file to take URL format
                reader.onloadend = () => {
                    const image = imageObj(reader.result, file.name, file.size);
                    setImageObject(image);
                };

                reader.readAsDataURL(file);
            }
        } else {
            return;
        }
    }

    // main function to handle what's entered on the page when "save" is pressed
    function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true)
        setOverallSuccessMessage("")
        setOverallErrorMessage("")

        let hasError = false;
        let postDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });

        // file errors
        if (!imageObject) {
            setFileError("Please provide a file.");
            hasError = true;
        } else {
            setFileError("");
        }

        // description errors
        if (!postDescription) {
            setDescriptionError("Please provide a description.");
            hasError = true;
        } else {
            setDescriptionError("");
        }

        if (hasError) {
            setIsSubmitting(false)
            return;
        }

        // post object
        const post = {
            postDate: postDate,
            postDescription: postDescription,
            artistUsername: userInfo.username,
            postImage: imageObject
        };

        // edit
        new Promise((resolve, reject) => {
            if (isEdit) {
                Meteor.call(
                    "update_post_details",
                    postId,
                    post,
                    (error, editPostId) => {
                        if (error) {
                            reject(`Error: ${error.message}`);
                        } else {
                            console.log("post added with:", editPostId);
                            resolve(editPostId);
                        }
                    }
                );
                //add
            } else {
                Meteor.call(
                    "add_post",
                    postDate,
                    postDescription,
                    userInfo.username,
                    imageObject,
                    (error, addPostId) => {
                        if (error) {
                            console.log("Error adding post:", error);
                            reject(`Error: ${error.message}`);
                        } else {
                            console.log("Post added with ID:", addPostId);
                            resolve(addPostId); // Pass the addPostId to the next .then if we are adding
                        }
                    }
                );
            }
        }).then(() => {
            setIsSubmitting(false)
            navigateTo(`/${UrlBasePath.PROFILE}`)

        }).catch(() => {
            setIsSubmitting(false)
            setOverallErrorMessage("Failed to " + (isEdit ? "update" : "create") + " post, please try again.")
        });
    }

    function handleFileButtonClick() {
        fileInputRef.current.click();
    }

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton to={`/${UrlBasePath.PROFILE}`}/>

            {/* Main container for content */}
            <div className="flex flex-col items-start justify-center gap-6 pl-[5%] lg:pl-[15%] w-full">
                <div className="title-text">{title}</div>

                {/* uploading input file */}
                <div className="flex flex-col flex-wrap gap-1 w-full">
                    <Button
                        htmlFor="file-upload"
                        onClick={handleFileButtonClick}
                        className="inline-flex"
                    >
                        <ArrowUpTrayIcon className="icon-base mr-2"/>
                        <span>Browse/Upload File</span>
                        <input
                            id="file-upload"
                            type="file"
                            accept={allowedFileTypeExtensions?.join(",")}
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </Button>
                    {imageObject && <div className="text-confirmed-colour mt-4">Uploaded image: </div>}
                    {/* no file error message */}
                    {fileError && <div className="text-cancelled-colour">{fileError}</div>}
                </div>
                {/* Image Preview before adding to gallery*/}
                {imageObject && (
                    <div key={imageObject.imageName} className="mt-4">
                        <img
                            src={imageObject.imageData}
                            alt="Uploaded Preview"
                            className="max-w-full h-auto max-h-96"
                        />
                    </div>
                )}

                {/* text area for description */}
                <div className="flex flex-col gap-1 w-full">
                    <label className="main-text">Description</label>
                    <textarea
                        className="input-base h-48 lg:w-[40vw] sm:w-96 w-full"
                        placeholder="Enter Your Post Description"
                        value={postDescription}
                        onChange={handleInputChange}
                    />
                    {/* No description provided error message */}
                    {descriptionError && <span className="text-cancelled-colour">{descriptionError}</span>}
                </div>

                <div className="flex gap-10">
                    {/* save button to add post to gallery tab */}
                    <div className="flex flex-col gap-4 grow">
                        {/*error/success message*/}
                        {overallErrorMessage && <div className="text-cancelled-colour mt-2">{overallErrorMessage}</div>}
                        {overallSuccessMessage &&
                            <div className="text-confirmed-colour mt-2">{overallSuccessMessage}</div>}

                        <Button
                            className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 load-when-disabled"
                            disabled={isSubmitting}
                            onClick={handleSubmit}>
                            <CheckIcon className="icon-base"/>
                            {button}
                        </Button>
                    </div>
                </div>
            </div>
        </WhiteBackground>
    );
};

export default AddEditPostPage;
