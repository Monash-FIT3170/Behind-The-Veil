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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="grid grid-cols-5 gap-4 w-3/5 transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all"
                  style={{ maxHeight: "80vh" }}
                >
                  <div className="col-span-4">
                    <img
                      className="w-full h-full object-cover mx-auto"
                      style={{
                        maxHeight: "70vh",
                        maxWidth: "90vh",
                        objectFit: "contain",
                      }}
                      src={selectedImage}
                      alt="Selected Image for Modal"
                    ></img>
                  </div>
                  <div class="relative">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      {selectedPostDate}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {selectedPostDescription}
                      </p>
                    </div>
                    <div className="flex flex-col items-center mt-10 mb-2 pb-10">
                      <Button className="bg-secondary-purple hover:bg-secondary-purple-hover mt-2 w-32 flex justify-center">
                        {pencilIcon} <span className="ml-2">Edit</span>
                      </Button>
                      <Button className="mt-2 w-32 flex justify-center">
                        {trashIcon} <span className="ml-2">Delete</span>
                      </Button>
                    </div>
                    <ProfileGalleryDisplay
                      className={"mt-5"}
                      imageData={""}
                      userAlias={userInfo.alias}
                      userUsername={userInfo.username}
                    ></ProfileGalleryDisplay>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
