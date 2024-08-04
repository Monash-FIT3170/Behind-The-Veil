/**
 * File Description: Artist gallery tab
 * File version: 1.1
 * Contributors: Kefei (Phillip) Li, Nikki
 */

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "../../../button/Button";
import GalleryModal from "./GalleryModal";
import { useState } from "react";
import Pagination from "/imports/ui/components/pagination/Pagination.jsx";
import Loader from "/imports/ui/components/loader/Loader";

// import { getGalleryImages } from "";

/**
 * Gallery tab of an artist's profile
 *
 * @param username {string} - username of the current user's profile
 */
export const ArtistGalleryTab = ({ username }) => {
  const [open, setOpen] = useState(false);
  const plusIcon = <PlusIcon className="icon-base" />;
  // const galleryImgData = getGalleryImages("post_images", [], username);
  // console.log(galleryImgData);
  // Photos Gallery code: https://www.material-tailwind.com/docs/react/gallery
  // When completing the dynamic version for this page, probably a good idea to setup the photos as components and importing them in.
  return (
    <main>
      <div className="relative">
        <div className="sticky top-20 z-20 flex justify-end">
          <Button className="absolute top-5 flex flex-row gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover mt-2">
            {plusIcon} Add Photo
          </Button>
        </div>
        <div></div>
        <div className="px-10 relative flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="grid gap-4">
              <div className="cursor-pointer" data-dialog-target="image-dialog">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="gallery-photo"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div className="z-30">
                <GalleryModal
                  open={open}
                  onClose={() => setOpen(false)}
                  children={
                    "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  }
                ></GalleryModal>
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center "
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="gallery-photo"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center"
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="gallery-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtistGalleryTab;
