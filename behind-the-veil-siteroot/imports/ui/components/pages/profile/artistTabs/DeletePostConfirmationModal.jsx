import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../../../button/Button";

import { CheckIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

const DeletePostConfirmationModal = ({ isOpen, closeModal }) => {
  const checkIcon = <CheckIcon className="icon-base mr-1" />;
  const noIcon = <NoSymbolIcon className="icon-base mr-1" />;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="title-text text-center">
                  Delete Post?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="main-text text-center">
                    Are you sure you want to delete this post?
                  </p>
                  <p className="main-text text-center">
                    This action cannot be reversed.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center w-full">
                  <Button className="bg-secondary-purple hover:bg-secondary-purple-hover w-1/4 flex justify-center mr-4">
                    {checkIcon} Yes
                  </Button>
                  <Button className="w-1/4 flex justify-center ml-4">
                    {noIcon} No
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeletePostConfirmationModal;
