/**
 * File Description: Artist gallery tab
 * File version: 1.1
 * Contributors: Phillip, Nikki
 */

import React from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { ProfileGalleryDisplay } from "../../../profilePhoto/ProfileGalleryDisplay";

import Button from "../../../button/Button";
import { Fragment, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Dialog, Transition } from "@headlessui/react";

import { useGalleryTotalCollection } from "../../../DatabaseHelper";
import { useUserInfo } from "../../../util";
import GalleryModal from "./GalleryModal";

/**
 * Gallery tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistGalleryTab = ({ username, external = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostDate, setSelectedPostDate] = useState(null);
  const [selectedPostDescription, setSelectedPostDescription] = useState(null);
  const plusIcon = <PlusIcon className="icon-base" />;
  const trashIcon = <TrashIcon className="icon-base" />;
  const pencilIcon = <PencilIcon className="icon-base" />;
  const galleryImgData = useGalleryTotalCollection(username)[0];
  const postData = useGalleryTotalCollection(username)[1];

  // get current user information
  const userInfo = useUserInfo();
  console.log(postData[0]);

  // Photos Gallery code: https://www.material-tailwind.com/docs/react/gallery
  // When completing the dynamic version for this page, probably a good idea to setup the photos as components and importing them in.

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(image, index) {
    setSelectedImage(image);
    const formattedDate = formatDate(postData[index].postDate);
    setSelectedPostDate(formattedDate);
    setSelectedPostDescription(postData[index].postDescription);
    setIsOpen(true);
  }

  function formatDate(dateInput) {
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="relative">
      <GalleryModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
        selectedPostDate={selectedPostDate}
        selectedPostDescription={selectedPostDescription}
        userInfo={userInfo}
        external={external}
      />

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
              onClick={() => openModal(image, index)}
              alt={"Gallery Image ${i}"}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ArtistGalleryTab;
