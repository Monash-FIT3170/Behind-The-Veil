/**
 * File Description: AddEditServices page
 * File version: 1.2
 * Contributors: Lucas, Nikki, Kyle
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { imageObj, useUserInfo } from "../../util";
import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import BackButton from "../../button/BackButton";
import Input from "../../input/Input";
import Button from "../../button/Button";

import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import UrlBasePath from "../../../enums/UrlBasePath";
import { Modal } from "react-responsive-modal";
import Tippy from '@tippyjs/react/headless';
import { useServices } from "../../DatabaseHelper";
import Loader from "../../loader/Loader";

export const AddEditServicePage = ({isEdit}) => {
    const navigateTo = useNavigate();

    // text for title/save button
    const title = isEdit ? "Edit Service" : "Add New Service";
    const button = isEdit ? "Edit Service" : "Add Service";

    // input variables
    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServiceType] = useState("None");
    const [serviceDuration, setServiceDuration] = useState(0);
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceDescription, setServiceDescription] = useState("");

    // variable for submitting
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [imageObjs, setImageObjs] = useState([]);
    const [images, setImages] = useState([]);

    const [errors, setErrors] = useState({
        serviceName: "",
        serviceType: "",
        serviceDuration: "",
        servicePrice: "",
        serviceDescription: "",
        images: "",
        overall: ""
    });

    // delete/archive modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const onOpenDeleteModal = () => setOpenDeleteModal(true);
    const onCloseDeleteModal = () => setOpenDeleteModal(false);

    // get current user information
    const userInfo = useUserInfo();

    // if user is not an artist, navigate them away
    if (userInfo.type !== "artist") {
        navigateTo(`/`);
    }

    // get service ID from url
    const {serviceId} = useParams();
    const {isLoading, servicesData} = useServices("specific_service", [serviceId], {}, false, false);

    /**
     * function to upload an image to the frontend
     * @param imageObj
     */
    const addImage = (imageObj) => {
        const image = (
            <div key={imageObj.imageName} className="flex flex-row items-start justify-center gap-1">
                <img
                    className="max-h-[200px] max-w-[90%] object-contain"
                    title={imageObj.imageName}
                    src={imageObj.imageData}
                />
                <button
                    type="button"
                    className={"flex justify-center items-center w-12"}
                    onClick={() => removeImage(imageObj)}
                >
                    <XMarkIcon
                        className="size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"></XMarkIcon>
                </button>
            </div>
        );
        setImages((prevImages) => Array.from(new Set([...prevImages, image])));
    };

    /**
     * Removes the image from the database and the frontend
     * @param imageObj - The image object
     */
    const removeImage = (imageObj) => {
        setImageObjs((prevImages) => prevImages.filter((img) => img !== imageObj));
        setImages((prevImages) => prevImages.filter((img) => img.key !== imageObj.imageName));
    };

    /**
     * Removes all the images for a service from the database and frontend
     */
    const removeAllImages = () => {
        setImageObjs([]);
        setImages([]);
    };

    // load in existing service information if it is editing
    const [shouldAddImages, setShouldAddImages] = useState(false);

    useEffect(() => {
        if (isEdit && !isLoading) {
            const service = servicesData.filter((service) => service._id === serviceId)[0]

            if (service.artistUsername !== userInfo.username) {
                navigateTo("/" + UrlBasePath.PROFILE);
            }

            setServiceName(service.serviceName);
            setServiceType(service.serviceType);
            setServiceDuration(service.serviceDuration);
            setServicePrice(service.servicePrice);
            setServiceDescription(service.serviceDesc);
            setImageObjs(service.serviceImages);
            setShouldAddImages(true);

        }
    }, [isLoading]);

    useEffect(() => {
        if (shouldAddImages) {
            imageObjs.forEach((imageObj) => addImage(imageObj));
            setShouldAddImages(false);
        }
    }, [shouldAddImages, imageObjs]);

    const allowedFileTypeExtensions = [".png", ".jpg", ".jpeg"];
    const [fileRejected, setFileRejected] = useState(false);
    const [fileRejectedMessage, setFileRejectedMessage] = useState("");

    /**
     * function to read uploaded file and preview it
     * @param file - file read
     */
    const readAndPreview = (file) => {
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                const image = imageObj(reader.result, file.name, file.size);
                addImage(image);
                setImageObjs((prevImages) => Array.from(new Set([...prevImages, image])));
            },
            false
        );

        reader.readAsDataURL(file);
    };

    const handleFileChange = (event) => {
        setFileRejected(false);
        const files = Array.from(event.target.files);

        const validFiles = files.filter((file) => {
            if (!allowedFileTypeExtensions.some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()))) {
                setFileRejected(true);
                setFileRejectedMessage("File must be of type/s (" + allowedFileTypeExtensions.join(", ") + ")");
                return false;
            } else if (imageObjs.some((img) => img.imageName === file.name && img.imageSize === file.size)) {
                setFileRejected(true);
                setFileRejectedMessage("File has already been uploaded!");
                return false;
            } else if (file.size > 16777216) {
                setFileRejected(true);
                setFileRejectedMessage("File must be less than 16MB");
                return false;
            }
            return true;
        });

        if (validFiles) {
            validFiles.forEach(readAndPreview);
        }
    };

    // Handles when the service is submitted
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true)

        // input validation
        let newErrors = {};
        let isError = false;

        // Check for empty fields in each field. Make sure nothing is empty
        if (!serviceName) {
            newErrors.serviceName = "Please input a serviceName";
            isError = true;
        }
        if (serviceType === "None") {
            newErrors.serviceType = "Please select a service type";
            isError = true;
        }
        if (servicePrice <= 0) {
            newErrors.servicePrice = "Please input a valid service price";
            isError = true;
        }
        if (serviceDuration <= 0 || serviceDuration > 24 || !Number.isInteger(Number(serviceDuration))) {
            newErrors.serviceDuration = "Please input a valid full hour service duration between (1 - 24 hours)";
            isError = true;
        }
        if (!serviceDescription) {
            newErrors.serviceDescription = "Please input a service description";
            isError = true;
        }
        if (images.length === 0) {
            newErrors.images = "You must select an image for your service";
            isError = true;
        }

        setErrors(newErrors);

        if (!isError) {
            const service = {
                serviceName: serviceName,
                serviceType: serviceType,
                serviceDuration: serviceDuration,
                servicePrice: servicePrice,
                serviceDesc: serviceDescription,
                artistUsername: userInfo.username,
                serviceImages: imageObjs,
            };

            // edit
            new Promise((resolve, reject) => {
                if (isEdit) {
                    Meteor.call("update_service_details", serviceId, service,
                        (error) => {
                            if (error) {
                                reject(`Error: ${error.message}`);
                            }
                        });
                    resolve(serviceId)
                } else {
                    // add the new service
                    Meteor.call(
                        "add_service",
                        serviceType,
                        serviceName,
                        serviceDescription,
                        servicePrice,
                        serviceDuration,
                        userInfo.username,
                        imageObjs,
                        (error, result) => {
                            if (error) {
                                reject(`Error: ${error.message}`);

                            } else {
                                resolve(result);
                            }
                        }
                    );
                }
            }).then((serviceId) => {
                // did not error, success
                setIsSubmitting(false)
                if (isEdit) {
                    // edit, show success message
                    setSuccessMessage("Service updated successfully!")

                } else {
                    // creation, navigate to new service page
                    navigateTo(`/${UrlBasePath.SERVICES}/${serviceId}`);
                }

            }).catch(() => {
                // there was an error
                setErrors({
                    overall: "Failed to " + (isEdit ? "update" : "create") + " service, please try again."
                })
                setIsSubmitting(false)
            });
        } else {
            // errored, no longer submitting
            setIsSubmitting(false)
        }
    };

    // Handles delete (or archive) service functionality.
    const handleDelete = () => {
        new Promise((resolve, reject) => {
            Meteor.call("has_booking_of_service", serviceId,
                (error, result) => {
                    if (error) {
                        reject(`Error: ${error.message}`);
                    } else {
                        resolve(result);
                    }
                })
        }).then((hasBookings) => {
            if (hasBookings) {
                // Service is to be archived.

                // Write a promise - as the Collection "services" is being altered.
                new Promise((resolve, reject) => {
                    Meteor.call("update_service_details", serviceId, {serviceActive: false},
                        (error) => {
                            if (error) {
                                reject(`Error: ${error.message}`);
                            } else {
                                // If the archiving is successful, then navigate the user back to the PROFILE page.
                                navigateTo("/" + UrlBasePath.PROFILE);
                            }
                        });
                });
            } else {
                // Service is to be deleted.

                // Write a promise - as the Collection "services" is being altered.
                new Promise((resolve, reject) => {
                    Meteor.call("delete_service", serviceId, (error) => {
                        if (error) {
                            reject(`Error: ${error.message}`);
                        } else {
                            // If the deletion is successful, then navigate the user back to the PROFILE page.
                            navigateTo("/" + UrlBasePath.PROFILE);
                        }
                    });
                });
            }
        }).catch(() => {
            onCloseDeleteModal()
            setErrors({
                overall: "Failed to delete service, please try again."
            })
        })
    };

    const infoText =
        "If a service has never had any bookings, it will be permanently deleted. " +
        "If the service has had bookings, it will be archived and can only be accessed by Brides who had booked the service.";
    const getDeleteHelperElement = (isRed) => (
        <Tippy
            render={(attrs) => (
                <div
                    className="box border border-cancelled-colour rounded-lg mt-1 px-6 py-6 white-glass-base shadow-lg w-[500px]"
                    tabIndex="-1"
                    {...attrs}
                >
                    {infoText}
                </div>
            )}
        >
            <QuestionMarkCircleIcon
                className={"tooltip-icon size-4 " + (isRed ? "text-cancelled-colour" : "text-light-grey-hover")}
            />
        </Tippy>
    );

    if (isLoading) {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        )
    } else {

        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <BackButton to={"/" + UrlBasePath.PROFILE}/>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col w-[60%] gap-6">
                        <p className="title-text">{title}</p>

                        <div className="flex flex-col gap-1">
                            <Input
                                type="text"
                                label={<label className="main-text">Service Name</label>}
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                            />
                            {errors.serviceName && <span className="text-cancelled-colour">{errors.serviceName}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label className="main-text" htmlFor="type">
                                    Service Type
                                </label>
                                <select
                                    name="type"
                                    value={serviceType}
                                    className="flex flex-col gap-1 input-base  md:w-1/2 md:max-w-72"
                                    onChange={(e) => setServiceType(e.target.value)}
                                >
                                    <option value="None">Please select an option</option>
                                    <option value="Hair">Hair</option>
                                    <option value="Makeup">Makeup</option>
                                </select>
                            </div>
                            {errors.serviceType && <span className="text-cancelled-colour">{errors.serviceType}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className="md:w-1/2 md:max-w-72"
                                type="number"
                                min="1"
                                max="24"
                                step="1"
                                label={<label className="main-text">Duration (Hours)</label>}
                                value={serviceDuration}
                                onChange={(e) => setServiceDuration(e.target.value)}
                            />
                            {errors.serviceDuration && (
                                <span className="text-cancelled-colour">{errors.serviceDuration}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Input
                                className="md:w-1/2 md:max-w-72"
                                type="number"
                                min="0.00"
                                step="0.50"
                                label={<label className="main-text">Price (AUD)</label>}
                                value={servicePrice}
                                onChange={(e) => setServicePrice(e.target.value)}
                            />
                            {errors.servicePrice &&
                                <span className="text-cancelled-colour">{errors.servicePrice}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="main-text">Description</label>
                            <textarea
                                className="input-base h-48"
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                            />
                            {errors.serviceDescription && (
                                <span className="text-cancelled-colour">{errors.serviceDescription}</span>
                            )}
                        </div>

                        {/* file upload area */}
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row">
                                <Input
                                    className="text-opacity-0 border-r-0 rounded-r-none w-[130px]"
                                    type="file"
                                    accept={allowedFileTypeExtensions?.join(",")}
                                    label={<label className="main-text">Photos</label>}
                                    onChange={handleFileChange}
                                    onClick={(event) => {
                                        // this is to allow the same file to be selected again after reset
                                        event.target.value = null;
                                    }}
                                    multiple
                                />
                                <TrashIcon
                                    className="input-base border-l-0 rounded-l-none h-[48px] w-[48px] mt-[28px] size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"
                                    onClick={removeAllImages}
                                ></TrashIcon>
                            </div>
                            {fileRejected && <span className="text-cancelled-colour">{fileRejectedMessage}</span>}
                            {errors.images && <span className="text-cancelled-colour">{errors.images}</span>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-5" id="preview">
                            {images}
                        </div>

                        {/*error/success message*/}
                        {errors.overall && <div className="text-cancelled-colour mt-2">{errors.overall}</div>}
                        {successMessage && <div className="text-confirmed-colour mt-2">{successMessage}</div>}

                        <Button
                            className="flex bg-secondary-purple hover:bg-secondary-purple-hover mt-[15px] load-when-disabled"
                            disabled={isSubmitting}
                            onClick={handleSubmit}>
                            <CheckIcon className="icon-base"/>
                            {button}
                        </Button>
                    </div>
                </div>

                {/* delete button on the bottom */}
                <div className="pl-[80%] flex items-center gap-2">
                    {isEdit && (
                        <>
                        <span className="small-text text-cancelled-colour underline cursor-pointer"
                              onClick={onOpenDeleteModal}>
                            Delete / Archive Service
                        </span>
                            {getDeleteHelperElement(true)}
                        </>
                    )}
                </div>

                {/* delete modal */}
                <Modal
                    classNames={{
                        modal: "w-[550px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue",
                    }}
                    open={openDeleteModal}
                    onClose={onCloseDeleteModal}
                    center
                    showCloseIcon={false}
                >
                    <div className="flex flex-col justify-center items-center h-full gap-y-10">
                        <h2 className="text-center title-text px-4">Delete / Archive?</h2>
                        <div className={"flex flex-col gap-1 items-center justify-start"}>
                        <span className="main-text text-center flex flex-row items-center justify-start gap-1">
                            Are you sure you'd like to delete / archive this service? {getDeleteHelperElement(false)}
                        </span>

                            <span className={"text-cancelled-colour main-text"}>This action cannot be reversed. </span>
                        </div>
                        <div className="flex items-center gap-16">
                            <Button
                                className="btn-base ps-[25px] pe-[25px] flex gap-1 bg-secondary-purple hover:bg-secondary-purple-hover"
                                onClick={() => {
                                    // If the user confirms deletion (or archiving).
                                    handleDelete();
                                }}
                            >
                                <CheckIcon className="icon-base"/>
                                <span>Yes</span>
                            </Button>
                            <Button
                                className="btn-base ps-[25px] pe-[25px] flex gap-1"
                                onClick={() => {
                                    // If the user rejects deletion (or archiving), simply close the modal.
                                    onCloseDeleteModal();
                                }}
                            >
                                <XMarkIcon className="icon-base"/>
                                <span>No</span>
                            </Button>
                        </div>
                    </div>
                </Modal>
            </WhiteBackground>
        );
    }
};

export default AddEditServicePage;
