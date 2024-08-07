/**
 * File Description: Artist gallery tab
 * File version: 1.1
 * Contributors: Kefei (Phillip) Li, Nikki
 */

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "../../../button/Button";
import GalleryModalOld from "./GalleryModalOld";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { getGalleryImages } from "../../../DatabaseHelper";

// import { getGalleryImages } from "";

/**
 * Gallery tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistGalleryTab = ({ username }) => {
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const plusIcon = <PlusIcon className="icon-base" />;
  const galleryImgData = getGalleryImages("post_images", [], username);
  console.log(username);
  console.log(galleryImgData);
  // Photos Gallery code: https://www.material-tailwind.com/docs/react/gallery
  // When completing the dynamic version for this page, probably a good idea to setup the photos as components and importing them in.

  const handleImageClick = (src) => {
    setOpen(true);
    console.log(src);
  };

  return (
    <div className="relative">
      <div className="sticky z-30">
        <GalleryModalOld
          open={open}
          onClose={() => setOpen(false)}
          children={galleryImgData[1]}
        ></GalleryModalOld>
      </div>
      <div className="sticky top-20 z-20 flex justify-end">
        <Button className="absolute top-5 flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover mt-2">
          {plusIcon} Add Photo
        </Button>
      </div>
      <ResponsiveMasonry>
        <Masonry>
          {galleryImgData.map((image, i) => (
            <img
              key={i}
              src={image}
              style={{
                width: "100%",
                display: "block",
                padding: "5px",
              }}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ArtistGalleryTab;
