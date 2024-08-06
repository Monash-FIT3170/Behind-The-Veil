/**
 * File Description: AddEditServices page
 * File version: 1.0
 * Contributors: Lucas
 */

import React, { useState, useEffect } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { useNavigate, useLocation } from "react-router-dom";
import { Mongo } from "meteor/mongo";

import { useUserInfo } from "../../util";
import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import BackButton from "../../button/BackButton";
import Input from "../../input/Input";
import Button from "../../button/Button";

import { CheckIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import UrlBasePath from "../../../enums/UrlBasePath";

export const AddEditServicePage = ({ isEdit }) => {
    const navigateTo = useNavigate();

    const title = isEdit ? "Edit Service" : "Add New Service";
    const button = isEdit ? "Edit Service" : "Add Service";

    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServiceType] = useState("None");
    const [serviceDuration, setServiceDuration] = useState(0);
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceDescription, setServiceDescription] = useState("");

    userInfo = useUserInfo();
    if (userInfo.type !== "artist") {
        navigateTo(`/`);
    }

    const serviceId = isEdit ? useLocation().pathname.split("/")[2] : "";
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
                    navigateTo(`/`);
                }
                setServiceName(service.serviceName);
                setServiceType(service.serviceType);
                setServiceDuration(service.serviceDuration);
                setServicePrice(service.servicePrice);
                setServiceDescription(service.serviceDesc);
            });
        }
    }, []);

    // check user owns service + user is a artist, else redirect to home
    // after rebase: const userInfo = getUserData();

    const [filesArray, setFilesArray] = useState([]);
    const [fileRejected, setFileRejected] = useState(false);
    const [images, setImages] = useState([]);
    const allowedFileTypeExtensions = [".png", ".jpg", ".jpeg"];

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
                            <XMarkIcon className="size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"></XMarkIcon>
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
            if (!allowedFileTypeExtensions.some((ext) => file.name.endsWith(ext))) {
                setFileRejected(true);
                return false;
            }
            return true;
        });

        if (validFiles) {
            setFilesArray((prevFiles) => {
                const newFiles = Array.from(new Set([...prevFiles, ...validFiles]));
                return newFiles;
            });
            validFiles.forEach(readAndPreview);
        }
    };

    const AddEdit = () => {
        const service = {
            serviceName: serviceName,
            serviceType: serviceType,
            serviceDuration: serviceDuration,
            servicePrice: servicePrice,
            serviceDesc: serviceDescription,
            artistUsername: userInfo.username,
        };
        if (isEdit) {
            Meteor.call("update_service_details", serviceId, service);
        } else {
            Meteor.call(
                "add_service",
                service.serviceType,
                service.serviceName,
                service.serviceDesc,
                service.servicePrice,
                service.serviceDuration,
                service.artistUsername
            );
        }

        console.log(service);
    };

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton />
            <div className="flex items-center justify-center">
                <div className="flex flex-col w-[60%] gap-2">
                    <p className="title-text">{title}</p>
                    <Input
                        type="text"
                        label={<label className="main-text">Service Name</label>}
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                    <label className="main-text" for="type">
                        Service Type
                    </label>
                    <select
                        value={serviceType}
                        className="flex flex-col gap-1 input-base"
                        name="type"
                        onChange={(e) => setServiceType(e.target.value)}
                    >
                        <option value="None">Please select an option</option>
                        <option value="Hair">Hair</option>
                        <option value="Makeup">Makeup</option>
                    </select>
                    <Input
                        className="md:w-[18%]"
                        type="number"
                        min="0"
                        step="0.5"
                        label={<label className="main-text">Duration (Hours)</label>}
                        value={serviceDuration}
                        onChange={(e) => setServiceDuration(e.target.value)}
                    />
                    <Input
                        className="md:w-[18%]"
                        type="number"
                        min="0"
                        label={<label className="main-text">Price (AUD)</label>}
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                    />
                    <Input
                        type="text"
                        label={<label className="main-text">Description</label>}
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                    />
                    <div className="flex flex-row">
                        <Input
                            className="text-opacity-0 border-r-0 rounded-r-none w-[130px]"
                            type="file"
                            accept={allowedFileTypeExtensions?.join(",")}
                            label={<label className="main-text">Photos</label>}
                            onChange={handleFileChange}
                            multiple
                        />
                        <TrashIcon
                            className="input-base border-l-0 rounded-l-none h-[48px] w-[48px] mt-[28px] size-5 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"
                            onClick={removeAllFiles}
                        ></TrashIcon>
                    </div>
                    <div className="grid grid-cols-2 gap-2" id="preview">
                        {images}
                    </div>

                    <Button
                        className="flex bg-secondary-purple hover:bg-secondary-purple-hover mt-[15px]"
                        onClick={AddEdit}
                    >
                        <CheckIcon className="size-[25px]" />
                        {button}
                    </Button>
                </div>
            </div>
        </WhiteBackground>
    );
};

export default AddEditServicePage;
