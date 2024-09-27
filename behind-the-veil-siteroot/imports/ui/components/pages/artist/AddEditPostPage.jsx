/**
 * File Description: Artist can add a post/image to the gallery tab with a description of the post
 * File version: 1.1
 * Contributors: Hirun
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserInfo } from "../../util.jsx";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import BackButton from "../../button/BackButton.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import UrlBasePath from "../../../enums/UrlBasePath";

export const AddEditPostPage = ({ isEdit }) => {

  // text for title/save button
  const title = isEdit ? "Edit Photo In Gallery" : "Add Photo To Gallery";
  const button = isEdit ? "Save" : "Save";

  const [postDescription, setPostDescription] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [overallErrorMessage, setOverallErrorMessage] = useState("");
  const [overallSuccessMessage, setOverallSuccessMessage] = useState("");
  const date = new Date();

  const navigateTo = useNavigate();

  const userInfo = useUserInfo();

  // if user is not an artist, navigate them away
  if (userInfo.type !== "artist") {
    navigateTo(`/`);
  }

  // gets the postId from the URL
  const { postId } = useParams();

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

      // Function to retrieve image using postId
      const retrieveImage = () => {
        return new Promise((resolve, reject) => {
          Meteor.call("get_image", postId, (error, editImage) => {
            if (error) {
              reject(`Error: ${error.message}`);
            } else {
              console.log(editImage);
              resolve(editImage);
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
          return retrieveImage(); // Fetch the image next
        })
        .then((image) => {
          //Set the image preview and input file
          setInputFile(image.imageData);
          setImagePreviewUrl(image.imageData);
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

    // Validate file type
    if (file && !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setFileError("Please upload a valid image file (.png, .jpg, .jpeg).");
      setInputFile(null); // Clear the file input
      setImagePreviewUrl(""); // Clear the image preview
      return;
    }

    if (file) {
      setFileError(""); // Clear the error when a valid file is uploaded

      const reader = new FileReader();

      // Convert the file to take URL format
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setInputFile(imageUrl);
        setImagePreviewUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    } else {
      setInputFile(null);
      setImagePreviewUrl(""); // Clear the preview if no file
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
    console.log(postDate);
    let imageType = "post";

    // file errors
    if (!inputFile) {
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
    };
    // image object
    const image = {
      imageType: imageType,
      target_id: postId,
      imageData: inputFile,
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
    })
      .then((newPostId) => {
        if (isEdit) {
          // If editing, handle the edit scenario
          return new Promise((resolve, reject) => {
            Meteor.call(
              "update_post_image",
              postId,
              image,
              (error, imageId) => {
                if (error) {
                  reject(`Error: ${error.message}`);
                } else {
                  resolve(imageId);
                  setOverallSuccessMessage("Post updated successfully!")
                }
              }
            );
          });
        } else {
          // If adding a new post, handle the add scenario
          return new Promise((resolve, reject) => {
            Meteor.call(
              "add_image",
              imageType,
              newPostId,
              inputFile,
              (error, imageId) => {
                if (error) {
                  reject(`Error: ${error.message}`);
                } else {
                  resolve(imageId);
                  alert("Post added successfully!");
                  navigateTo("/" + UrlBasePath.PROFILE);
                }
              }
            );
          });
        }
      }).then(() => {
      setIsSubmitting(false)
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
      <BackButton
        to={`/${UrlBasePath.PROFILE}`}
        className="your-custom-classes"
      />

      {/* Main container for content */}
      <div className="flex flex-col gap-4 xl:px-40">
        <div className="title-text">{title}</div>

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
          {inputFile && <div className="text-confirmed-colour">Uploaded image: </div>}
        </div>
        {/* Image Preview before adding to gallery*/}
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
            value={postDescription}
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
              {/*error/success message*/}
              {overallErrorMessage && <div className="text-cancelled-colour mt-2">{overallErrorMessage}</div>}
              {overallSuccessMessage && <div className="text-confirmed-colour mt-2">{overallSuccessMessage}</div>}

            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2"
                    disabled={isSubmitting}
                    onClick={handleSubmit}>
              <CheckIcon className="icon-base" />
              {button}
            </Button>
          </div>
        </div>
      </div>
    </WhiteBackground>
  );
};

export default AddEditPostPage;
