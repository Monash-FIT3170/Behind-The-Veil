/**
 * File Description: Artist gallery tab
 * File version: 1.1
 * Contributors: Phillip, Nikki
 */

import React from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { ProfileGalleryDisplay } from "../../../profilePhoto/ProfileGalleryDisplay";

import Button from "../../../button/Button";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import {
  useGalleryTotalCollection,
  useSpecificUser,
} from "../../../DatabaseHelper";
import { useUserInfo } from "../../../util";
import GalleryModal from "./GalleryModal";
import DeletePostConfirmationModal from "./DeletePostConfirmationModal";

/**
 * Gallery tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistGalleryTab = ({ username, external = false }) => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostDate, setSelectedPostDate] = useState(null);
  const [selectedPostDescription, setSelectedPostDescription] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const plusIcon = <PlusIcon className="icon-base" />;
  const galleryImgData = useGalleryTotalCollection(username)[0];
  const postData = useGalleryTotalCollection(username)[1];
  const userProfileImageSrc = useSpecificUser(username)[2];

  // get current user information
  const userInfo = useUserInfo();

  //close the gallery modal
  function closeGalleryModal() {
    setIsGalleryModalOpen(false);
  }

  //open the gallery modal and store all relevant information
  function openGalleryModal(image, index) {
    setSelectedPostId(postData[index]._id);
    setSelectedImage(image);
    const formattedDate = formatDate(postData[index].postDate);
    setSelectedPostDate(formattedDate);
    setSelectedPostDescription(postData[index].postDescription);
    setIsGalleryModalOpen(true);
  }

  //format date to what is expected from figma
  function formatDate(dateInput) {
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  //open the modal to confirm image/post deletion
  function openDeleteModal() {
    closeGalleryModal();
    setIsDeleteModalOpen(true);
  }

  //close the modal to confirm image/post deletion
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  //Deletes the post and the image from the database
  //also closes the modal
  function deleteImage() {
    Meteor.call("remove_post", selectedPostId, (error) => {
      if (error) {
        console.error("error removing post", error);
      } else {
        console.log("post removed");
      }
    });

    Meteor.call("remove_post_image", selectedPostId, (error) => {
      if (error) {
        console.error("error removing image", error);
      } else {
        console.log("image removed");
      }
    });

    closeDeleteModal();
  }

  return (
    <div className="relative">
      <GalleryModal
        isOpen={isGalleryModalOpen}
        closeModal={closeGalleryModal}
        openDeleteModal={openDeleteModal}
        selectedImage={selectedImage}
        profileImgSrc={userProfileImageSrc}
        selectedPostDate={selectedPostDate}
        selectedPostDescription={selectedPostDescription}
        userInfo={userInfo}
        external={external}
      />
      <DeletePostConfirmationModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        deleteImage={deleteImage}
      ></DeletePostConfirmationModal>

      <div className="sticky top-20 z-20 flex justify-end">
        <Button className="absolute top-5 flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover mt-2">
          {plusIcon} Add Photo
        </Button>
      </div>
      <ResponsiveMasonry>
        <Masonry gutter="5px">
          {galleryImgData.map((image, index) => (
            <img
              key={index}
              src={image}
              style={{
                width: "100%",
                display: "block",
              }}
              onClick={() => openGalleryModal(image, index)}
              alt={"Gallery Image " + index}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ArtistGalleryTab;
