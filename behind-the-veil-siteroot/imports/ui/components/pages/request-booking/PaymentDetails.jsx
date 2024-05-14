import React, {useId, useState} from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Input from "../../input/Input";
import BackButton from "../../button/BackButton";

const PaymentDetails = () => {

    const errorMsg = ["card number", "card holder name", "expiry date", "CVV"]
    const cardNumberId = useId();
    const cardNameId = useId();
    const expDateId = useId();
    const cvvId = useId();

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error message for the corresponding input field
    }

    const paymentConfirmation = (event) => {
        event.preventDefault();
        let newErrors = {};
        let isError = false;

        // Check for empty fields in each field. Make sure nothing is empty
        Object.keys(inputs).forEach((key, index) => {
            // TODO: CHECK VALIDITY might use Square API
            if (!inputs[key].trim()) {
                newErrors[key] = `Please input valid ${errorMsg[index]}.`;
                isError = true;
            }
        });

        // Update errors state with new error messages
        setErrors(newErrors);

        // Proceed if there are no errors
        if (!isError) {
            // TODO: Proceed with payment confirmation logic
        }
    }

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton />
            <div className="flex flex-col gap-4 xl:px-40">
                <div className="large-text">Payment Details</div>
                <form className="w-[50%]" onSubmit={paymentConfirmation}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor={cardNumberId} className="main-text text-our-black">Card Number</label>
                            <Input
                                id={cardNumberId}
                                placeholder="Enter Card Number"
                                name="cardNumber"
                                value={inputs.cardNumber}
                                onChange={handleInputChange}
                            />
                            {errors.cardNumber && <span className="text-cancelled-colour">{errors.cardNumber}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor={cardNameId} className="main-text text-our-black">Card Name</label>
                            <Input
                                id={cardNameId}
                                placeholder="Enter Card Holder Name"
                                name="cardName"
                                value={inputs.cardName}
                                onChange={handleInputChange}
                            />
                            {errors.cardName && <span className="text-cancelled-colour">{errors.cardName}</span>}
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor={expDateId} className="main-text text-our-black">Exp. Date</label>
                                <Input
                                    id={expDateId}
                                    placeholder="MM/YY"
                                    name="expDate"
                                    value={inputs.expDate}
                                    onChange={handleInputChange}
                                />
                                {errors.expDate && <span className="text-cancelled-colour">{errors.expDate}</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor={cvvId} className="main-text text-our-black">CVV</label>
                                <Input
                                    id={cvvId}
                                    placeholder="Enter CVV"
                                    name="cvv"
                                    value={inputs.cvv}
                                    onChange={handleInputChange}
                                />
                                {errors.cvv && <span className="text-cancelled-colour">{errors.cvv}</span>}
                            </div>
                        </div>
                        <Button
                            className="mt-8 bg-secondary-purple hover:bg-secondary-purple-hover ps-[50px] pe-[50px] flex gap-1"
                            type="submit">
                            <CurrencyDollarIcon className="icon-base" />
                            Pay
                        </Button>
                    </div>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default PaymentDetails;
