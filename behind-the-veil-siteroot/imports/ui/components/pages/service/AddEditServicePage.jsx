/**
 * File Description: AddEditServices page
 * File version: 1.0
 * Contributors: Lucas
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"

import PageLayout from "/imports/ui/enums/PageLayout";
import WhiteBackground from "/imports/ui/components/whiteBackground/WhiteBackground.jsx";
import BackButton from '../../button/BackButton';
import Input from '../../input/Input';
import Button from '../../button/Button';

import { CheckIcon } from '@heroicons/react/24/outline'; 


export const AddEditServicePage = (isEdit) => {

    if (isEdit) {
        return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton />

            <div>
                <p>Add New Service</p>
                <Input type="text" label={"Service Name"}/> 
                <br></br>
                <Input type="number" label={"Duration (Hours)"}/>
                <Input type="number" label={"Price (AUD)"}/>
                <Input type="text" label={"Description"}/>
                <Input type="file" label={"Photos"}/>
                <Button className="flex bg-secondary-purple hover:bg-secondary-purple-hover ">
                <CheckIcon className="size-[25px]"/>Add Service
            </Button>
            </div>
        </WhiteBackground>
        );
    }

    return (<WhiteBackground pageLayout={PageLayout.LARGE_CENTER}></WhiteBackground>);
}

export default AddEditServicePage;