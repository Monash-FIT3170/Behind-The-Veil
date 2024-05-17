/**
 * File Description: Payment details page
 * File version: 1.1
 * Contributors: Neth, Nikki
 */

import React, {useId, useState} from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {CheckIcon, CurrencyDollarIcon, NoSymbolIcon} from '@heroicons/react/24/outline'
import Input from "../../input/Input";
import BackButton from "../../button/BackButton";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {useNavigate} from "react-router-dom";
import PreviousButton from "../../button/PreviousButton";

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

    const errorMsg = ["card number", "card holder name", "expiry date", "CVV"]

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

    // Handler for input change
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setInputs({...inputs, [name]: value});
        setErrors({...errors, [name]: ""}); // Clear error message for the corresponding input field
    }

    // Handler for payment confirmation
    const paymentConfirmation = (event) => {
        event.preventDefault();
        let newErrors = {};
        let isError = false;

        // Check for empty fields in each field. Make sure nothing is empty
        Object.keys(inputs).forEach((key, index) => {
            // TODO: CHECK VALIDITY might use Square API
            if (!inputs[key].trim()) {
                newErrors[key] = `Please input a valid ${errorMsg[index]}`;
                isError = true;
            }
        });

        // Update errors state with new error messages
        setErrors(newErrors);

        // Proceed if there are no errors
        if (!isError) {
            onOpenModal()
        }
    }

    const confirmPayment = () => {
        navigateTo(`/booking-confirmation`);
    }

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <PreviousButton/>
            <div className="flex flex-col gap-4 md:px-40">
                <div className="large-text">Payment Details</div>
                <form className="w-full md:w-full lg:w-2/3 xl:w-1/2" onSubmit={paymentConfirmation}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">

                            <Input
                                label={<label htmlFor={cardNumberId}
                                              className="main-text text-our-black">Card Number</label>}
                                id={cardNumberId}
                                placeholder="Enter Card Number"
                                name="cardNumber"
                                value={inputs.cardNumber}
                                onChange={handleInputChange}
                            />
                            {errors.cardNumber && <span className="text-cancelled-colour">{errors.cardNumber}</span>}
                        </div>
                        <div className="flex flex-col gap-1">

                            <Input
                                label={<label htmlFor={cardNameId}
                                              className="main-text text-our-black">Card Name</label>}
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
                                    label={<label htmlFor={expDateId}
                                                  className="main-text text-our-black">Exp. Date</label>}
                                    className={"w-1/2 md:w-full"}
                                    id={expDateId}
                                    placeholder="MM/YY"
                                    name="expDate"
                                    value={inputs.expDate}
                                    onChange={handleInputChange}
                                />
                                {errors.expDate &&
                                    <span className="text-cancelled-colour w-full">{errors.expDate}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <Input
                                    label={<label htmlFor={cvvId}
                                                  className="main-text text-our-black">CVV</label>}
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
                            className="mt-8 bg-secondary-purple hover:bg-secondary-purple-hover ps-[50px] pe-[50px] flex gap-1"
                            type="submit">
                            <CurrencyDollarIcon className="icon-base"/>
                            Pay
                        </Button>
                        <Modal classNames={{
                            modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue"
                        }} open={open} onClose={onCloseModal} center showCloseIcon={false}>
                            <div className="flex justify-center items-center h-full">
                                <div className="flex flex-col">
                                    <h2 className="text-center title-text">
                                        Confirm Payment
                                    </h2>
                                    {/*TODO: Add price to the modal*/}
                                        <p className="text-center medium-text">You are about make a payment of
                                            $120.00.</p>
                                        <p className="text-center medium-text">Are you sure?</p>
                                    <div className="flex justify-center space-x-6 mt-5">
                                        <Button className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1" onClick={confirmPayment}>
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
