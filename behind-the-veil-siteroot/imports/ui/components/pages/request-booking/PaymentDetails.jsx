/**
 * File Description: Add payment details page
 * File version: 1.1
 * Contributors: Neth
 */

import React, { useId, useState } from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {CurrencyDollarIcon} from '@heroicons/react/24/outline'
import Input from "../../input/Input";
import PreviousButton from "../../button/PreviousButton";
import BackButton from "../../button/BackButton";

/**
 * Page for user to request a booking
 */
const PaymentDetails = () =>  {

    const cardNumberId = useId()
    const cardNameId = useId()
    const expDateId = useId()
    const cvvId = useId()

    const [inputs, setInputs] = useState({
        cardNumber: "",
        cardName: "",
        expDate: "",
        cvv: "",
    })

    // form related functions
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(i => ({ ...i, [name]: value }))
    }

    const paymentConfirmation = () => {

    }
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton/>
            {/* Main container for content */}
            <div className="flex flex-col gap-4 xl:px-40">
                <div className="large-text">Payment Details</div>

                {/* input form */}
                <form className="w-[50%]" onSubmit={paymentConfirmation}>
                    <div className="flex flex-col gap-4">
                        {/* card number */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor={cardNumberId} className="main-text text-our-black">Card Number</label>
                            <Input
                                id={cardNumberId}
                                placeholder="Enter Card Number"
                                name="cardNumber"
                                value={inputs.cardNumber || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* card number */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor={cardNameId} className="main-text text-our-black">Card Name</label>
                            <Input
                                id={cardNameId}
                                placeholder="Enter Card Holder Name"
                                name="cardName"
                                value={inputs.cardName || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* cvv and expiry date */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor={expDateId} className="main-text text-our-black">Exp. Date</label>
                                <Input
                                    id={expDateId}
                                    placeholder="MM/YY"
                                    name="expDate"
                                    value={inputs.expDate || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor={cvvId} className="main-text text-our-black">CVV</label>
                                <Input
                                    id={cvvId}
                                    placeholder="Enter CVV"
                                    name="cvv"
                                    value={inputs.cvv || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <Button
                            className="mt-8 bg-secondary-purple hover:bg-secondary-purple-hover flex gap-1"
                            type="submit">
                            <CurrencyDollarIcon className="icon-base"/>
                            Pay
                        </Button>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default PaymentDetails;
