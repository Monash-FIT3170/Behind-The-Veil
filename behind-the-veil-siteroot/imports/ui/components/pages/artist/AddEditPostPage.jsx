/**
 * File Description: Artist can add a post/image to the gallery tab with a description of the post
 * File version: 1.1
 * Contributors: Hirun
 */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../util.jsx";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import BackButton from "../../button/BackButton.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import UrlBasePath from "../../../enums/UrlBasePath";

export const AddEditPostPage = () => {
  const [postDescription, setInputReason] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const date = new Date();

  const navigateTo = useNavigate();

  const userInfo = useUserInfo();

  const fileInputRef = useRef(null); // used since the file classname is hidden to ensure that ui is in specific format

  function handleInputChange(event) {
    const description = event.target.value;
    setInputReason(description);
    if (event.target.value) {
      setDescriptionError(""); // Clear the error when a description is entered
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    setInputFile(file);
    if (file) {
      setFileError(""); // Clear the error when a file is uploaded
      // Set preview URL
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl(""); // Clear the preview if no file
    }
  }

  // main function to handle whats entered on the page when "save" is entered
  function handleAddPost(event) {
    event.preventDefault();
    let hasError = false;
    let postDate = date.toLocaleDateString();
    let imageType = "post";
    // file errors
    if (!inputFile) {
      setFileError("Please provide a file.");
      hasError = true;
    } else if (inputFile.type !== "image/png") {
      setFileError("Please upload a .png file.");
      hasError = true;
    } else {
      setFileError("");
      // description errors
    }
    if (!postDescription) {
      setDescriptionError("Please provide a description.");
      hasError = true;
    } else {
      setDescriptionError("");
    }
    if (hasError) {
      return;
    }
    new Promise((resolve, reject) => {
      Meteor.call(
        "add_post",
        postDate,
        postDescription,
        userInfo.username,
        (error, postId) => {
          if (error) {
            console.log("Error adding post:", error);
            reject(`Error: ${error.message}`);
          } else {
            console.log("Post added with ID:", postId);
            resolve(postId); // Pass the postId to the next .then
          }
        }
      );
    })
      .then(
        (postId) =>
          new Promise((resolve, reject) => {
            Meteor.call(
              "add_image",
              imageType,
              postId, // Use the postId passed from the previous promise
              inputFile,
              (error, imageId) => {
                if (error) {
                  console.log("Error adding image:", error);
                  reject(`Error: ${error.message}`);
                } else {
                  resolve(imageId);
                  console.log("Image added with ID:", imageId);
                  alert("Post added successfully!");
                  navigateTo("/" + UrlBasePath.PROFILE);
                }
              }
            );
          })
      )
      .catch((reason) => alert(reason));

    // for time being there is only an alert
    //alert("Post has been added to the gallery");
    // navigates back to artist profile page
    //navigateTo(`/${UrlBasePath.PROFILE}`);
  }

  function handleFileButtonClick() {
    fileInputRef.current.click();
  }

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <BackButton
        to={`/${UrlBasePath.PROFILE}`}
        className="your-custom-classes"
      />

      {/* Main container for content */}
      <div className="flex flex-col gap-4 xl:px-40">
        <div className="title-text">Add Photo to Gallery</div>

        {/* uploading input file */}
        <div className="flex flex-row flex-wrap gap-10 items-center">
          <Button
            htmlFor="file-upload"
            onClick={handleFileButtonClick}
            className="inline-flex"
          >
            <ArrowUpTrayIcon className="icon-base mr-2" />
            <span>Browse/Upload File</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Button>
          {inputFile && (
            <div className="text-green-500">Uploaded: {inputFile.name}</div>
          )}
        </div>
        {/* Image Preview */}
        {imagePreviewUrl && (
          <div className="mt-4">
            <img
              src={imagePreviewUrl}
              alt="Uploaded Preview"
              className="max-w-full h-auto"
            />
          </div>
        )}

        {/* no file error message */}
        {fileError && <div className="text-red-500">{fileError}</div>}

        {/* text area for description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description-input"
            className="large-text text-our-black"
          >
            Description
          </label>
          <textarea
            id="description-input"
            className="input-base lg:w-[40vw] sm:w-96 h-48"
            placeholder="Enter Your Post Description"
            onChange={handleInputChange}
            rows={4}
            cols={40}
          />
        </div>

        {/* No description provided error message */}
        {descriptionError && (
          <div className="text-red-500">{descriptionError}</div>
        )}

        <div className="flex gap-10">
          {/* save button to add post to gallery tab */}
          <div className="flex flex-col gap-4 grow">
            <Button
              className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
              onClick={handleAddPost}
            >
              <CheckIcon className="icon-base" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </WhiteBackground>
  );
};

export default AddEditPostPage;
