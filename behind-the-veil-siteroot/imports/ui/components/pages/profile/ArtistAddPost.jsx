/**
 * File Description: Artist can add a post/image to the gallery tab with a description of the post
 * File version: 1.1
 * Contributors: Hirun
 */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import BackButton from "../../button/BackButton.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export const ArtistAddPost = () => {
  const [inputReason, setInputReason] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

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
    }
  }

  function handleAddPost(event) {
    event.preventDefault();
    let hasError = false;
    if (!inputFile) {
      setFileError("Please provide a file.");
      hasError = true;
    } else {
      setFileError("");
    }
    if (!inputReason) {
      setDescriptionError("Please provide a description.");
      hasError = true;
    } else {
      setDescriptionError("");
    }
    if (hasError) {
      return;
    }
    // for time being there is only an alert
    alert("Post has been added to the gallery");
    // navigates back to artist profile page
    navigate("/artist-profile");
  }

  function handleFileButtonClick() {
    fileInputRef.current.click();
  }

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      <BackButton />

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

export default ArtistAddPost;
