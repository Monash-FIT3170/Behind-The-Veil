/**
 * File Description: Artist gallery modal
 * File version: 1.0
 * Contributors: Phillip
 */

import React from "react";
import {
  TrashIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ProfileGalleryDisplay } from "../../../profilePhoto/ProfileGalleryDisplay";

import Button from "../../../button/Button";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

const GalleryModal = ({
  isOpen,
  closeModal,
  selectedImage,
  profileImgSrc,
  selectedPostDate,
  selectedPostDescription,
  userInfo,
  external,
}) => {
  const trashIcon = <TrashIcon className="icon-base" />;
  const pencilIcon = <PencilIcon className="icon-base" />;
  const closeIcon = <XCircleIcon className="icon-base" />;
  return (
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
                <button
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 z-20"
                  onClick={closeModal}
                >
                  {closeIcon}
                </button>

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
                  {external === false ? (
                    <div className="flex flex-col items-center justify-center absolute bottom-16 w-full mt-10 mb-5 pb-8">
                      <Button className="bg-secondary-purple hover:bg-secondary-purple-hover mt-2 w-32 flex justify-center">
                        {pencilIcon} <span className="ml-2">Edit</span>
                      </Button>
                      <Button className="mt-2 w-32 flex justify-center">
                        {trashIcon} <span className="ml-2">Delete</span>
                      </Button>
                    </div>
                  ) : (
                    <span></span>
                  )}

                  <ProfileGalleryDisplay
                    className={""}
                    imageData={profileImgSrc}
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
  );
};

export default GalleryModal;
