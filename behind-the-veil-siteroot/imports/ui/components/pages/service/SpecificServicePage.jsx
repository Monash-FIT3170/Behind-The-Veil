/**
 * File Description: Specific Services page
 * File version: 1.0
 * Contributors: Nhu
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";

import Button from "../../button/Button.jsx";
const SpecificServicePage = () => {
    const { serviceId } = useParams();
    const navigateTo = useNavigate();

    const imageUrls = [
        'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://cdn.britannica.com/98/94698-050-F64C03A6/African-savanna-elephant.jpg',
        'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        console.log("my ID is: " + serviceId);
    }, [serviceId]);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    // Define your service details
    const serviceDetails = {
        serviceType: 'Bridal Makeup',
        price: '$120',
        duration: '2 hours',
        description: 'Indulge in the ultimate pampering experience with our exclusive Bachelorette Makeup Service! Elevate your pre-wedding festivities with a touch of glamour and sophistication.'
    };

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <button style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#757575',
                cursor: 'pointer'
            }} onClick={() => navigateTo(-1)}>
                <span style={{ marginRight: '8px' }}>{'<'}</span> Back
            </button>

            {/* Title container for centering */}
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-semibold mb-4">Bachelorette Glam Experience</h1>
            </div>

            {/* Content container */}
            <div className="flex justify-center items-start w-full p-10">
                {/* Image Carousel with navigation buttons */}
                <div className="relative flex-shrink-0">
                    {/* Backward Button */}
                    <button
                        onClick={handlePrevClick}
                        className="absolute -left-9 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer"
                        aria-label="Next image"
                    >
                        <svg width="25" height="43" viewBox="0 0 25 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 40L3 21.5L22 3" stroke="#757575" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    {/* Image */}
                    <img className="rounded-2xl object-cover" src={imageUrls[currentImageIndex]} alt="Service" style={{ width: '495px', height: '468.88px' }} />

                    {/* Forward Button */}
                    <button
                        onClick={handleNextClick}
                        className="absolute -right-9 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer"
                        aria-label="Next image"
                    >
                        <svg width="25" height="43" viewBox="0 0 25 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L22 21.5L3 40" stroke="#757575" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex">
                        {imageUrls.map((_, index) => (
                            <span
                                key={index}
                                className={`h-5 w-5 mx-1 bg-gray-400 rounded-full ${currentImageIndex === index ? 'bg-gray-800' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Right side - User Info and Details */}
                <div className="flex-grow ml-10">
                    {/* User Info Container */}
                    <div className="flex items-center space-x-4 mb-4" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '428px', height: '133px', border: '2px solid #BBCAFE'}}>
                        <img src="https://via.placeholder.com/150" alt="User Profile" className="rounded-full" style={{ width: '101px', height: '99.15px', borderRadius: '11px' }} />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold" style={{ color: '#282828' }}>Example of long name ...</h2>
                            <p className="text-sm text-gray-500">@alicetran_35</p>
                            <div className='flex flex-row justify-center items-center'>
                                <button className="mt-2 px-4 py-2 bg-gray-300 rounded-full flex flex-row gap-2 w-60 justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                    <span className="font-bold">All Services</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <br></br>

                    {/* Service Details */}
                    <div className="grid grid-cols-4 gap-2">
                        {/* Service details column */}
                        <div className="col-span-1">
                            <h3 style={{ color: '#757575', fontWeight: 'bold' }}>Service Type:</h3>
                            <br />
                            <h3 style={{ color: '#757575', fontWeight: 'bold' }}>Price:</h3>
                            <br />
                            <h3 style={{ color: '#757575', fontWeight: 'bold' }}>Duration:</h3>
                            <br />
                            <h3 style={{ color: '#757575', fontWeight: 'bold' }}>Description:</h3>
                        </div>

                        {/* Service description column */}
                        <div className="col-span-3">
                            <p style={{ color: '#282828', fontWeight: 'bold' }}>{serviceDetails.serviceType}</p>
                            <br />
                            <p style={{ color: '#282828', fontWeight: 'bold' }}>{serviceDetails.price}</p>
                            <br />
                            <div className='flex flex-row gap-x-2'>
                                <p style={{ color: '#282828', fontWeight: 'bold' }}>{serviceDetails.duration}</p>
                                <svg className='relative -bottom-1.5' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7ZM7 4.375C6.84626 4.37485 6.6952 4.41521 6.56202 4.49201C6.42884 4.56882 6.31824 4.67936 6.24138 4.8125C6.18587 4.91564 6.11022 5.00659 6.01892 5.07995C5.92761 5.15332 5.8225 5.2076 5.70983 5.23959C5.59715 5.27158 5.4792 5.28062 5.36297 5.26618C5.24673 5.25173 5.13458 5.2141 5.03316 5.15551C4.93174 5.09692 4.84312 5.01856 4.77254 4.92508C4.70196 4.83161 4.65088 4.72491 4.6223 4.61132C4.59372 4.49773 4.58825 4.37956 4.60619 4.26382C4.62413 4.14807 4.66513 4.03711 4.72675 3.9375C5.01569 3.4371 5.46167 3.04602 5.99552 2.8249C6.52937 2.60379 7.12127 2.56501 7.67941 2.71456C8.23755 2.86412 8.73075 3.19366 9.08252 3.65207C9.43429 4.11049 9.62497 4.67217 9.625 5.25C9.62516 5.79304 9.45695 6.32277 9.14354 6.76625C8.83013 7.20972 8.38694 7.54512 7.875 7.72625V7.875C7.875 8.10706 7.78281 8.32962 7.61872 8.49372C7.45462 8.65781 7.23206 8.75 7 8.75C6.76794 8.75 6.54538 8.65781 6.38128 8.49372C6.21719 8.32962 6.125 8.10706 6.125 7.875V7C6.125 6.76794 6.21719 6.54538 6.38128 6.38128C6.54538 6.21719 6.76794 6.125 7 6.125C7.23206 6.125 7.45462 6.03281 7.61872 5.86872C7.78281 5.70462 7.875 5.48206 7.875 5.25C7.875 5.01794 7.78281 4.79538 7.61872 4.63128C7.45462 4.46719 7.23206 4.375 7 4.375ZM7 11.375C7.23206 11.375 7.45462 11.2828 7.61872 11.1187C7.78281 10.9546 7.875 10.7321 7.875 10.5C7.875 10.2679 7.78281 10.0454 7.61872 9.88128C7.45462 9.71719 7.23206 9.625 7 9.625C6.76794 9.625 6.54538 9.71719 6.38128 9.88128C6.21719 10.0454 6.125 10.2679 6.125 10.5C6.125 10.7321 6.21719 10.9546 6.38128 11.1187C6.54538 11.2828 6.76794 11.375 7 11.375Z" fill="#875EB5"/>
                                </svg>
                            </div>
                                <br />
                                <p style={{ color: '#282828', fontWeight: 'bold' }}>{serviceDetails.description}</p>
                        </div>
                    </div>

                    <br></br>
                    <br></br>

                    <Button className="flex flex-row gap-x-2 justify-center items-center w-4/5 md:w-1/2 min-w-40
                        bg-secondary-purple hover:bg-secondary-purple-hover transition duration-500"
                                onClick={() => navigateTo('/service/' + serviceId)}>
                            <CalendarDaysIcon className="h-6 w-6 min-h-6 min-w-6"/>
                            Request Booking
                    </Button>
                </div>
            </div>
        </WhiteBackground>
    );
};

export default SpecificServicePage;
