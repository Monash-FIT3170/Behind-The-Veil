/**
 * File Description: Artist gallery modal
 * File version: 1.0
 * Contributors: Phillip
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ProfileGalleryDisplay } from "../../../profilePhoto/ProfileGalleryDisplay";

import Button from "../../../button/Button";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import UrlBasePath from "../../../../enums/UrlBasePath";

const GalleryModal = ({
  isOpen,
  closeModal,
  postId,
  selectedImage,
  openDeleteModal,
  profileImgSrc,
  selectedPostDate,
  selectedPostDescription,
  userInfo,
  external
}) => {
  const trashIcon = <TrashIcon className="icon-base" />;
  const pencilIcon = <PencilIcon className="icon-base" />;
  const closeIcon = <XCircleIcon className="icon-base" />;
  const navigateTo = useNavigate();

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
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/65" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 pt-20 text-center">
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
                  className="grid grid-cols-9 gap-4 w-4/5 min-h-96 transform overflow-hidden rounded-md bg-white p-4 pt-10 text-left align-middle shadow-xl transition-all"
                  style={{maxHeight: "80vh"}}>
                <div className="col-span-7">
                  <img
                      className="w-full h-full object-cover mx-auto"
                      style={{
                        maxHeight: "60vh",
                        maxWidth: "60vh",
                        objectFit: "contain",
                      }}
                      src={selectedImage}
                      alt="Selected Image for Modal"
                  ></img>
                </div>
                <div className="fixed top-2 right-2 p-2 z-20">
                  <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={closeModal}>
                    {closeIcon}
                  </button>
                </div>

                <div className="flex flex-col justify-between relative col-span-2">

                  <div className="flex flex-col gap-y-5">
                    <Dialog.Title as="h3" className="large-text">
                      {selectedPostDate}
                    </Dialog.Title>
                    <p className="small-text text-dark-grey max-h-[40vh] overflow-y-auto">
                      {selectedPostDescription}
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-5">
                    {external === false ? (
                        <div className="flex flex-col items-center justify-center w-full">

                          <Button
                              className="bg-secondary-purple hover:bg-secondary-purple-hover mt-2 w-32 flex justify-center"
                              onClick={() => navigateTo(`/${UrlBasePath.PROFILE}/editPost/${postId}`)}>
                            {pencilIcon}
                            <span className="ml-2">Edit</span>
                          </Button>

                          <Button className="mt-2 w-32 flex justify-center"
                                  onClick={() => {
                                    openDeleteModal();
                                  }}>
                            {trashIcon}
                            <span className="ml-2">Delete</span>
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
                    />
                  </div>
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
