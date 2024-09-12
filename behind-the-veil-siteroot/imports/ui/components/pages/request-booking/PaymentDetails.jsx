/**
 * File Description: Payment details page
 * File version: 1.2
 * Contributors: Neth, Nikki
 */

import React, { useId, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { CheckIcon, CurrencyDollarIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Input from "../../input/Input";
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal';
import {useNavigate, useParams} from "react-router-dom";
import PreviousButton from "../../button/PreviousButton";
import BookingStatus from "../../../enums/BookingStatus";
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Component for handling payment details.
 *
 * This component allows users to input their payment details
 * such as card number, cardholder name, expiry date, and CVV,
 * and proceeds with payment confirmation.
 *
 * @returns {JSX.Element} PaymentDetails component.
 */
const PaymentDetails = () => {
    const navigateTo = useNavigate();

    // grab the service ID from the URL
    const {serviceId} = useParams();

    const location = useLocation();
    const [details, setDetails] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        // Extracting the parameters
        const artistusername = searchParams.get('artistUsername');
        const brideUsername = searchParams.get('brideUsername');
        const service = searchParams.get('service');
        const serviceLocation = searchParams.get('location');
        const date = searchParams.get('date');
        const priceString = searchParams.get('totalPrice');
        let priceFloat = parseFloat(priceString.replace('$', ''));

        setDetails({
            artistUsername: artistusername,
            brideUsername: brideUsername,
            serviceName: service,
            location: serviceLocation,
            date: date,
            price: priceFloat,
        });

    }, [location.search]);

    const cardNumberId = useId();
    const cardNameId = useId();
    const expDateId = useId();
    const cvvId = useId();

    // State for input values and errors
    const [inputs, setInputs] = useState({
        cardNumber: "",
        cardName: "",
        expDate: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({
        cardNumber: "",
        cardName: "",
        expDate: "",
        cvv: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Handler for input change
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const validateField = (name, value) => {
        let errorMessage = "";
        switch (name) {
            case "cardNumber":
                // Remove all non-digit characters
                const digitsOnly = value.replace(/\D/g, "");
                if (digitsOnly.length !== 16) {
                    errorMessage = "Card number must be 16 digits";
                } else {
                    // Implement Luhn algorithm for basic card number validation
                    let sum = 0;
                    let alternate = false;
                    for (let i = digitsOnly.length - 1; i >= 0; i--) {
                        let n = parseInt(digitsOnly.charAt(i), 10);
                        if (alternate) {
                            n *= 2;
                            if (n > 9) {
                                n = (n % 10) + 1;
                            }
                        }
                        sum += n;
                        alternate = !alternate;
                    }
                    if (sum % 10 !== 0) {
                        errorMessage = "Invalid card number";
                    }
                }
                break;
            case "cardName":
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = "Card name should only contain letters";
                }
                break;
            case "expDate":
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                    errorMessage = "Expiration date should be in MM/YY format";
                } else {
                    const [month, year] = value.split("/");
                    const expDate = new Date(20 + year, month - 1);
                    if (expDate < new Date()) {
                        errorMessage = "Card has expired";
                    }
                }
                break;
            case "cvv":
                if (!/^\d{3,4}$/.test(value)) {
                    errorMessage = "CVV must be 3 or 4 digits";
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));

        // Check if all fields are valid
        const newErrors = { ...errors, [name]: errorMessage };
        const isValid = Object.values(newErrors).every((error) => error === "") && Object.values(inputs).every((value) => value.trim() !== "");
        setIsFormValid(isValid);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        validateField(name, value);
    };

    // Handler for payment confirmation
    const paymentConfirmation = (event) => {
        event.preventDefault();

        // Validate all fields
        Object.keys(inputs).forEach((key) => {
            validateField(key, inputs[key]);
        });

        // Proceed if the form is valid
        if (isFormValid) {
            onOpenModal();
        }
    };

    const confirmPayment = async () => {
        let datetimeParts = details.date.split(",");
    
        let startDatetimeString = datetimeParts[0].trim();
        let endDatetimeString = datetimeParts[1].trim();
    
        let startDatetime = new Date(startDatetimeString);
        let endDatetime = new Date(endDatetimeString);
    
        // Destructure the inputs from the state
        const { cardNumber, expDate, cvv } = inputs;
    
        // Make sure expDate is formatted correctly for your backend
        const formattedExpiryDate = expDate.replace(/\D/g, ''); // Remove non-digit characters if needed
    
        // Call the payment processing method
        Meteor.call("processPayment", { cardNumber, cvv, expiryDate: formattedExpiryDate }, (error, result) => {
            if (error) {
                console.error('Error processing payment:', error);
                alert('Payment Failed');
            } else {
                console.log(details);
                console.log(details.aristUsername);
                result.success ? addToBooking(startDatetime, endDatetime, details.location, details.price, BookingStatus.PENDING, details.brideUsername, details.artistUsername, serviceId)
                    .then(r => navigateTo(`/${UrlBasePath.SERVICES}/${serviceId}/booking-confirmation?${r}`))
                    .catch(reason => alert(reason)) : alert('Payment Failed');
                    
                result.success ? 
                    addToBooking(startDatetime, endDatetime, details.location, details.price, BookingStatus.PENDING, details.brideUsername, details.artistUsername, serviceId)
                        .then(bookingId => {
                            // After successfully adding the booking, add the payment receipt
                            addPaymentReceipt(new Date(), details.price, "Deposit", "Paid", bookingId)
                                .then(receiptId => {
                                    console.log('Receipt added with ID:', receiptId);
                                    // Navigate to the booking confirmation page
                                    navigateTo(`/${UrlBasePath.SERVICES}/${serviceId}/booking-confirmation?${bookingId}`);
                                })
                                .catch(reason => {
                                    alert(`Failed to add receipt: ${reason}`);
                                });
                        })
                        .catch(reason => alert(`Failed to add booking: ${reason}`))
                : alert('Payment Failed');
                    }
                })
            }

    const addPaymentReceipt = (paymentDatetime, paymentAmount, paymentType, paymentStatus, bookingId) => new Promise((resolve, reject) => {
        Meteor.call("add_receipt", 
            paymentDatetime, 
            paymentAmount, 
            paymentType, 
            paymentStatus, 
            bookingId, 
            (error, receiptId) => {
            if (error) {
                reject(error);
            } else {
                resolve(receiptId);
            }
        });
    });
    

    const addToBooking = (startDateTime, endDateTime, location, price, status, brideUsername, artistUsername, serviceId) => new Promise((resolve, reject) => {
        Meteor.call("add_booking",
            startDateTime,
            endDateTime,
            location,
            price,
            status,
            brideUsername,
            artistUsername,
            serviceId,
            // up to here it knows these are its args - it (somehow) also knows that you get back
            // either an error or a value that is stuffed into bookingID (this can be any name).
            (error, bookingId) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(bookingId);
                }
            } // this something that comes with promises. If reject and resolve are
            // not present the promise doesn't understand its finished and will keep powering
            // thru the method until it finds an end (there is none)
        );
    });


    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <PreviousButton />
            <div className="flex flex-col gap-4 md:px-40">
                <div className="large-text">Payment Details</div>
                <form className="w-full md:w-full lg:w-2/3 xl:w-1/2" onSubmit={paymentConfirmation}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Input
                                label={
                                    <label htmlFor={cardNumberId} className="main-text text-our-black">
                                        Card Number
                                    </label>
                                }
                                id={cardNumberId}
                                placeholder="Enter Card Number"
                                name="cardNumber"
                                value={inputs.cardNumber}
                                onChange={(e) => {
                                    // Format the input to groups of 4 digits
                                    const formatted = e.target.value
                                        .replace(/\D/g, "")
                                        .replace(/(\d{4})/g, "$1 ")
                                        .trim();
                                    handleInputChange({ target: { name: "cardNumber", value: formatted } });
                                }}
                                maxLength={19} // 16 digits + 3 spaces
                            />
                            {errors.cardNumber && <span className="text-cancelled-colour">{errors.cardNumber}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Input
                                label={
                                    <label htmlFor={cardNameId} className="main-text text-our-black">
                                        Card Name
                                    </label>
                                }
                                id={cardNameId}
                                placeholder="Enter Card Holder Name"
                                name="cardName"
                                value={inputs.cardName}
                                onChange={handleInputChange}
                            />
                            {errors.cardName && <span className="text-cancelled-colour">{errors.cardName}</span>}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between md:justify-start gap-5">
                            <div className="flex flex-col gap-1">
                                <Input
                                    label={
                                        <label htmlFor={expDateId} className="main-text text-our-black">
                                            Exp. Date
                                        </label>
                                    }
                                    className={"w-1/2 md:w-full"}
                                    id={expDateId}
                                    placeholder="MM/YY"
                                    name="expDate"
                                    value={inputs.expDate}
                                    onChange={handleInputChange}
                                />
                                {errors.expDate && <span className="text-cancelled-colour w-full">{errors.expDate}</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <Input
                                    label={
                                        <label htmlFor={cvvId} className="main-text text-our-black">
                                            CVV
                                        </label>
                                    }
                                    className={"w-1/2 md:w-full"}
                                    id={cvvId}
                                    placeholder="Enter CVV"
                                    name="cvv"
                                    value={inputs.cvv}
                                    onChange={handleInputChange}
                                />
                                {errors.cvv && <span className="text-cancelled-colour w-full">{errors.cvv}</span>}
                            </div>
                        </div>
                        <Button
                            className={`mt-8 ps-[50px] pe-[50px] flex gap-1 ${
                                isFormValid ? "bg-secondary-purple hover:bg-secondary-purple-hover" : "bg-gray-400 cursor-not-allowed"
                            }`}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            <CurrencyDollarIcon className="icon-base" />
                            Pay
                        </Button>
                        <Modal
                            classNames={{
                                modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue",
                            }}
                            open={open}
                            onClose={onCloseModal}
                            center
                            showCloseIcon={false}
                        >
                            <div className="flex justify-center items-center h-full">
                                <div className="flex flex-col">
                                    <h2 className="text-center title-text">Confirm Payment</h2>
                                    {/*TODO: Add price to the modal*/}
                                    <p className="text-center medium-text">You are about make a payment of ${details.price}.</p>
                                    <p className="text-center medium-text">Are you sure?</p>
                                    <div className="flex justify-center space-x-6 mt-5">
                                        <Button
                                            className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1"
                                            onClick={confirmPayment}
                                        >
                                            <CheckIcon className="icon-base" />
                                            Confirm
                                        </Button>
                                        <Button className="btn-base ps-[25px] pe-[25px] flex gap-1" onClick={onCloseModal}>
                                            <NoSymbolIcon className="icon-base" />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default PaymentDetails;
