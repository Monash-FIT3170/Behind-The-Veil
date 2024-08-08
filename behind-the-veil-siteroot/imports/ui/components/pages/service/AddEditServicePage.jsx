/**
 * File Description: AddEditServices page
 * File version: 1.1
 * Contributors: Lucas, Nikki
 */

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {getUserInfo} from "../../util";
import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import BackButton from "../../button/BackButton";
import Input from "../../input/Input";
import Button from "../../button/Button";

import {CheckIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import UrlBasePath from "../../../enums/UrlBasePath";
import {Modal} from "react-responsive-modal";

export const AddEditServicePage = ({isEdit}) => {
    const navigateTo = useNavigate();

    // text for title/save button
    const title = isEdit ? "Edit Service" : "Add New Service";
    const button = isEdit ? "Edit Service" : "Add Service";

    // input and error variables
    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServiceType] = useState("None");
    const [serviceDuration, setServiceDuration] = useState(0);
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceDescription, setServiceDescription] = useState("");

    const [errors, setErrors] = useState({
        serviceName: "",
        serviceType: "",
        serviceDuration: "",
        servicePrice: "",
        serviceDescription: "",
        images: ""
    })

    // end status modal
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [isSuccess, setSuccess] = useState(false);

    // get current user information
    const userInfo = getUserInfo();

    // if user is not an artist, navigate them away
    if (userInfo.type !== "artist") {
        navigateTo(`/`);
    }

    // get service ID from url
    const {serviceId} = isEdit ? useParams() : "";

    // load in existing service information if it is editing
    useEffect(() => {
        if (isEdit) {
            const retrieveService = () => {
                return new Promise((resolve, reject) => {
                    Meteor.call("get_service", serviceId, (error, result) => {
                        if (error) {
                            reject(`Error: ${error.message}`);
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            retrieveService().then((service) => {
                if (service.artistUsername !== userInfo.username) {
                    navigateTo("/" + UrlBasePath.PROFILE);
                }
                setServiceName(service.serviceName);
                setServiceType(service.serviceType);
                setServiceDuration(service.serviceDuration);
                setServicePrice(service.servicePrice);
                setServiceDescription(service.serviceDesc);
            });
        }
    }, []);

    const [filesArray, setFilesArray] = useState([]);
    const [images, setImages] = useState([]);
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
                const image = (
                    <div key={file.name} className="flex flex-row items-start justify-center gap-1">
                        <img
                            className="max-h-[200px] max-w-[90%] object-contain"
                            title={file.name}
                            src={reader.result}
                        />
                        <button
                            type="button"
                            className={"flex justify-center items-center w-12"}
                            onClick={() => removeFile(file)}
                        >
                            <XMarkIcon
                                className="size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"></XMarkIcon>
                        </button>
                    </div>
                );
                setImages((prevImages) => Array.from(new Set([...prevImages, image])));
            },
            false
        );

        reader.readAsDataURL(file);
    };

    const removeFile = (file) => {
        setFilesArray((prevFiles) => prevFiles.filter((f) => f !== file));
        setImages((prevImages) => prevImages.filter((img) => img.key !== file.name));
    };

    const removeAllFiles = () => {
        setFilesArray([]);
        setImages([]);
    };

    const handleFileChange = (event) => {
        setFileRejected(false);
        const files = Array.from(event.target.files);

        const validFiles = files.filter((file) => {
            if (!allowedFileTypeExtensions.some((ext) => file.name.toLowerCase().endsWith(ext.toLowerCase()))) {
                setFileRejected(true);
                setFileRejectedMessage("File must be of type/s (" + allowedFileTypeExtensions.join(", ") + ")");
                return false;
            } else if (filesArray.some((f) => f.name === file.name && f.size === file.size)) {
                setFileRejected(true);
                setFileRejectedMessage("File has already been uploaded!");
                return false;
            }
            return true;
        });

        if (validFiles) {

            setFilesArray((prevFiles) => Array.from(new Set([...prevFiles, ...validFiles])));
            validFiles.forEach(readAndPreview);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // input validation
        let newErrors = {};
        let isError = false;

        // Check for empty fields in each field. Make sure nothing is empty
        if (!serviceName) {
            newErrors.serviceName = "Please input a serviceName";
            isError = true;
        }
        if (serviceType === "None") {
            newErrors.serviceType = "Please select a service type"
            isError = true;
        }
        if (servicePrice <= 0) {
            newErrors.servicePrice = "Please input a valid service price"
            isError = true;
        }
        if (serviceDuration <= 0 || serviceDuration > 24) {
            newErrors.serviceDuration = "Please input a valid service duration between (0.5 - 24 hours)"
            isError = true;
        }
        if (!serviceDescription) {
            newErrors.serviceDescription = "Please input a service description"
            isError = true;
        }
        if (images.length === 0) {
            newErrors.images = "You must select an image for your service"
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
            };

            // edit
            new Promise((resolve, reject) => {

                if (isEdit) {
                    Meteor.call("update_service_details", serviceId, service,
                        (error, result) => {
                            if (error) {
                                reject(`Error: ${error.message}`);
                                setSuccess(false)

                            } else {
                                resolve(result);
                                setSuccess(true)
                            }
                        });
                } else {

                    Meteor.call("add_service",
                        serviceType,
                        serviceName,
                        serviceDescription,
                        servicePrice,
                        serviceDuration,
                        userInfo.username,
                        (error, result) => {
                            if (error) {
                                reject(`Error: ${error.message}`);
                                setSuccess(false)

                            } else {
                                resolve(result);
                                setSuccess(true)
                            }
                        });
                }


            }).catch(() => {
                // there was an error
                setSuccess(false)
            });

            onOpenModal()
        }
    };

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
                            <label className="main-text" htmlFor="type">Service Type</label>
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
                            min="0"
                            step="0.5"
                            label={<label className="main-text">Duration (Hours)</label>}
                            value={serviceDuration}
                            onChange={(e) => setServiceDuration(e.target.value)}
                        />
                        {errors.serviceDuration &&
                            <span className="text-cancelled-colour">{errors.serviceDuration}</span>}
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
                        {errors.servicePrice && <span className="text-cancelled-colour">{errors.servicePrice}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="main-text">Description</label>
                        <textarea className="input-base h-48"
                                  value={serviceDescription}
                                  onChange={(e) => setServiceDescription(e.target.value)}
                        />
                        {errors.serviceDescription &&
                            <span className="text-cancelled-colour">{errors.serviceDescription}</span>}
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
                                    event.target.value = null
                                }}
                                multiple
                            />
                            <TrashIcon
                                className="input-base border-l-0 rounded-l-none h-[48px] w-[48px] mt-[28px] size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"
                                onClick={removeAllFiles}
                            ></TrashIcon>
                        </div>
                        {fileRejected && <span className="text-cancelled-colour">{fileRejectedMessage}</span>}
                        {errors.images && <span className="text-cancelled-colour">{errors.images}</span>}
                    </div>


                    <div className="grid md:grid-cols-2 gap-5" id="preview">
                        {images}
                    </div>

                    <Button
                        className="flex bg-secondary-purple hover:bg-secondary-purple-hover mt-[15px]"
                        onClick={handleSubmit}
                    >
                        <CheckIcon className="icon-base"/>
                        {button}
                    </Button>
                </div>
            </div>

            <Modal classNames={{
                modal: "w-[550px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue"
            }} open={open} onClose={onCloseModal} center showCloseIcon={false}>
                <div className="flex flex-col justify-center items-center h-full gap-y-10">
                    <h2 className="text-center title-text px-4">
                        {(isEdit ? "Modification" : "Creation") + (isSuccess ? "was Successful" : " Failed")}
                    </h2>
                    <Button
                        className={"btn-base ps-[25px] pe-[25px] flex gap-1 " +
                            (isSuccess ? "bg-secondary-purple hover:bg-secondary-purple-hover" : "")}
                        onClick={() => {
                            onCloseModal()
                            if (isSuccess) {
                                navigateTo("/" + UrlBasePath.PROFILE)
                            }
                        }}>
                        <CheckIcon className="icon-base"/>
                        {isSuccess ? "Confirm" : "Close"}
                    </Button>
                </div>
            </Modal>
        </WhiteBackground>
    )
        ;
};

export default AddEditServicePage;
