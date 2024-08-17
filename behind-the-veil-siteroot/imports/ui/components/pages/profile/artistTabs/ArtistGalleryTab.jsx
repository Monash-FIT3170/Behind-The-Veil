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
  const plusIcon = <PlusIcon className="icon-base" />;
  const galleryImgData = useGalleryTotalCollection(username)[0];
  const postData = useGalleryTotalCollection(username)[1];
  const userProfileImageSrc = useSpecificUser(username)[2];

  // get current user information
  const userInfo = useUserInfo();

  function closeGalleryModal() {
    setIsGalleryModalOpen(false);
  }

  function openGalleryModal(image, index) {
    setSelectedImage(image);
    const formattedDate = formatDate(postData[index].postDate);
    setSelectedPostDate(formattedDate);
    setSelectedPostDescription(postData[index].postDescription);
    setIsGalleryModalOpen(true);
  }

  function formatDate(dateInput) {
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
    closeGalleryModal();
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
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
              alt={"Gallery Image ${i}"}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ArtistGalleryTab;
