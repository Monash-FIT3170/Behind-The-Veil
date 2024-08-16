/**
 * File Description: Direct Message Conversation Component of Messages Page
 * File version: 1.2
 * Contributors: Nishan, Vicky
 */

import React, {useRef, useState} from 'react';
import { Meteor } from 'meteor/meteor';
import {useSubscribe, useTracker } from 'meteor/react-meteor-data';

import MessageCollection from "/imports/api/collections/messages";
import ImageCollection from "/imports/api/collections/images";
import "/imports/api/methods/messages";
import {useUserInfo} from "../../../ui/components/util"

import Card from '../card/Card';
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import Input from "../input/Input";
import {PaperAirplaneIcon} from '@heroicons/react/24/outline';
import Button from "../button/Button";

export const Conversation = ({chat}) => {
     // get current user information
     const userInfo = useUserInfo();

    const [formValue, setFormValue] = useState('');
    // set up subscription to messages for the particular chat
    const isLoadingMessages = useSubscribe('all_chat_messages', chat._id);
    const isLoadingUserImages = useSubscribe('profile_images');
    const isLoading = isLoadingMessages() || isLoadingUserImages();

    // get data from db
    let messagesData = useTracker(() => {
        return MessageCollection.find({ chatId: chat._id }).fetch();
    });
    let usersImagesData = useTracker(() => {
        return ImageCollection.find().fetch;
    })

    console.log("messagesData", messagesData)

    // sort messages based on sent date (oldest to newest)
    messagesData.sort(function(chat1, chat2) {
       let keyOne = chat1.messageSentTime;
       let keyTwo = chat2.messageSentTime;

       // Compare the 2 dates
       if (keyOne < keyTwo) return -1;
       if (keyOne > keyTwo) return 1;
       return 0;
    });

    // get the other user's username
    // TODO: user this to get the other user's alias
    const otherUser = chat.artistUsername === userInfo.username ? chat.brideUsername : chat.artistUsername;

    const conversationRef = useRef(null);

    const sendMessage = (event) => {
        event.preventDefault();
        if (formValue.trim() === '') return;
        
        // insert the message using the Message database method
        try {
            const messageSentTime = new Date();
            const messageContent = formValue;
            const messageRead = false; // TODO: figure out how to set message to read when the other user is on the app at the same time
            const photoId = userInfo.username; // TODO: check if its the user's username for the image or if its the actual id in the db
            const chatId = chat._id;

            // wrap meteor.call in a promise
            new Promise((resolve, reject) => {
                // asynchronous operation
                Meteor.call('add_message', messageSentTime, messageContent, messageRead, photoId, userInfo.username, chatId, (error, result) => {
                    if (error) {
                        reject(error); // if there's an error, go to the catch block
                    } else {
                        resolve(result); // if there's no error, continue with the rest of the block
                    }
                });
            })

            setFormValue('');
            let heightToScroll = conversationRef?.current.scrollHeight + 50 // TODO: check, might have to adjust the value or code
            setTimeout(() => {
                conversationRef?.current.scrollTo({left: 0, top: heightToScroll, behaviour: "smooth"})
            }, 5)
        } catch (error) {
            console.log("Error adding message. Returned with error:" + error.message)
        }
        
    };

    return (
        <div className="flex flex-col fixed top-0 bottom-0 left-0 right-0">
            <div
                className='ml-4 w-11/12 message-receiver-name-text border-b-2 pt-3 pb-1 mb-8 pl-6 border-main-blue'>{otherUser}
            </div>
            <div className="flex-1 overflow-y-auto p-4" ref={conversationRef}>
                <div>
                    {/* The other user's mesages */}
                    {
                        messagesData.map((message, index) => ( message.userUsername == userInfo.username ? 
                            (<div key={index} className="flex justify-end">
                            <Card className={`my-2 rounded-3xl max-w-[80%] h-auto overflow-hidden ${message.userUsername === userInfo.username ? ' bg-main-blue' : 'bg-light-grey'}`}>
                                <div>{message.messageContent}</div>
                            </Card>
                            </div>)
                        :
                            (<div key={index}>
                                <div className={`${message.userUsername === userInfo.username ? 'flex  justify-end' : 'flex'}`}>
                                    {message.userUsername !== userInfo.username  && (
                                        <ProfilePhoto
                                            className={`${message.userUsername === userInfo.username ? 'order-last flex' : ''} min-win-[10%] shrink-0`}></ProfilePhoto>
                                    )}
                                    <Card
                                        className={`my-2 rounded-3xl max-w-[80%] border-transparent ${message.userUsername === userInfo.username ? ' bg-main-blue' : 'bg-light-grey'} `}>
                                        {message.messageContent}
                                    </Card>
                                </div>
                            </div>)

                        ))
                    }

                    {/* User's OWN mesages */}
                    {/* {
                        messagesData.map((message, index) => (
                            <div key={index} className="flex justify-end">
                                <Card className={`my-2 rounded-3xl max-w-[80%] h-auto overflow-hidden ${message.userUsername === userInfo.username ? ' bg-main-blue' : 'bg-light-grey'}`}>
                                    <div>{message.messageContent}</div>
                                </Card>
                            </div>
                        ))
                    } */}
                </div>
            </div>

            <form className="w-full px-8 py-6 " onSubmit={sendMessage}>
                <div className='relative w-full flex'>
                    <Input
                        value={formValue}
                        onChange={(event) => setFormValue(event.target.value)}
                        placeholder="Type a message..."
                        className="w-full rounded-3xl pr-40"
                    />
                    <Button type="submit" disabled={!formValue}
                            className="bg-secondary-purple hover:bg-secondary-purple-hover focus:outline-none cursor-pointer
                            flex absolute right-1 top-1/2 transform -translate-y-1/2">
                        <PaperAirplaneIcon className='icon-base'/>
                        <span className='hidden sm:inline px-2'>Send</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Conversation;
