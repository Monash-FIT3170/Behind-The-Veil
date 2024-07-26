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


export const AddEditServicePage = ({isEdit}) => {
    var title;
    var button;

    if (isEdit) {
        title = "Edit Service";
        button = "Edit Service"
    } else {
        title = "Add New Service";
        button = "Add Service"
    }
    



        return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton />
            <div className='flex items-center justify-center'>
            <div className='flex flex-col w-[60%] gap-2'>
                <p className='title-text'>{title}</p>
                <Input type="text" label={<p className='text-lg'>Service Name</p>}/> 
                <label className='text-lg' for='type'>Service Type</label>
                <select className='flex flex-col gap-1 input-base' name='type'>
                    <option value="" disabled selected>Please select an option</option>
                    <option value="Hair">Hair</option>
                    <option value="Makeup">Makeup</option>
                </select>
                <Input className='w-[18%]' type="number" min='0' step='0.5' label={<p className='text-lg'>Duration (Hours)</p>}/>
                <Input className='w-[18%]' type="number" min='0' label={<p className='text-lg'>Price (AUD)</p>}/>
                <Input type="text" label={<p className='text-lg'>Description</p>}/>
                <Input type="file" label={<p className='text-lg'>Photos</p>}/>
                <Button className="flex bg-secondary-purple hover:bg-secondary-purple-hover mt-[15px]">
                <CheckIcon className="size-[25px]"/>{button}
            </Button>
            </div>
            </div>
        </WhiteBackground>
        );
}

export default AddEditServicePage;