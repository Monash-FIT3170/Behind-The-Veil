/**
 * File Description: Direct Message Conversation Component of Messages Page
 * File version: 1.3
 * Contributors: Nishan, Vicky, Nikki
 */

import React, {useRef, useState} from 'react';
import { Meteor } from 'meteor/meteor';
import {useSubscribe, useTracker } from 'meteor/react-meteor-data';

import MessageCollection from "/imports/api/collections/messages";
import ImageCollection from "/imports/api/collections/images";
import "/imports/api/methods/messages";
import {useUserInfo} from "../util"

import Card from '../card/Card';
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import Input from "../input/Input";
import Button from "../button/Button";
import Loader from "/imports/ui/components/loader/Loader";
import {ChevronLeftIcon, PaperAirplaneIcon} from '@heroicons/react/24/outline';
import BackButton from "../button/BackButton";

export const Conversation = ({chat, isLeftHandler}) => {
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

    // sort messages based on sent date (oldest to newest)
    messagesData.sort(function(chat1, chat2) {
       let keyOne = chat1.messageSentTime;
       let keyTwo = chat2.messageSentTime;
       // Compare the 2 dates
       if (keyOne < keyTwo) return -1;
       if (keyOne > keyTwo) return 1;
       return 0;
    });

    // get the other user's username and alias
    const otherUser = chat.artistUsername === userInfo.username ? chat.brideUsername : chat.artistUsername;
    const [otherUserAlias, setOtherUserAlias] = useState('');
    
    Meteor.call('get_alias', otherUser, (error, result) => {
        if (error) {
          console.error('Error fetching alias:', error);
          return;
        }
        setOtherUserAlias(result);
      });

    const conversationRef = useRef(null);

    const sendMessage = (event) => {
        event.preventDefault();
        if (formValue.trim() === '') return;
        
        // insert the message using the Message database method and update the chat date
        try {
            const messageSentTime = new Date();
            const messageContent = formValue;
            const messageRead = false; // TODO: figure out how to set message to read when the other user is on the app at the same time
            const chatId = chat._id;

            // wrap meteor.call in a promise
            new Promise((resolve, reject) => {
                // asynchronous operation
                Meteor.call('add_message', messageSentTime, messageContent, messageRead, userInfo.username, chatId, (error, result) => {
                    if (error) {
                        reject(error); // if there's an error, go to the catch block
                    } else {
                        resolve(result); // if there's no error, continue with the rest of the block
                    }
                });
            })

            // update the chat's message sent time and content
            new Promise((resolve, reject) => {
                Meteor.call('update_chat', chatId, messageSentTime, messageContent, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })

            // update the read status of the chat so that the other user's read status is false
            try {
                new Promise((resolve, reject) => {
                    Meteor.call('update_chat_read', chatId, otherUser, false, (error, result) => {
                        if (error) {
                            reject(error); // if there's an error, go to the catch block
                        } else {
                            resolve(result); // if there's no error, continue with the rest of the block
                        }
                    })
                }).then(() => {
                    console.log("Chat read status successfully updated.");
                })
            } catch (error) {
                console.log("Error adding message. Returned with error:" + error.message);
            }

            setFormValue('');
            let heightToScroll = conversationRef?.current.scrollHeight + 50; // TODO: check, might have to adjust the value or code
            setTimeout(() => {
                conversationRef?.current.scrollTo({left: 0, top: heightToScroll, behaviour: "smooth"})
            }, 5)
        } catch (error) {
            console.log("Error adding message. Returned with error:" + error.message)
        }
        
    };

    return (
        <div className="flex flex-col fixed top-0 bottom-0 left-0 right-0">
            <div className={'w-11/12 border-b-2 mb-8 ml-4 pt-3 pb-1 pl-2 pr-6 lg:px-6 border-main-blue line-clamp-1 ' +
                'break-all flex flex-row gap-x-2 items-center'}>
                <ChevronLeftIcon onClick={() => isLeftHandler(true)}
                                 className={"size-8 min-w-8 min-h-8 stroke-2 cursor-pointer text-dark-grey rounded-full px-1 " +
                                     "hover:bg-white-hover hover:text-our-black transition duration-500 lg:hidden"}/>
                <span className={"message-receiver-name-text break-all line-clamp-1"}>{otherUserAlias}</span>
                <span className={"text-dark-grey large-text break-all mt-1 line-clamp-1"}>(@{otherUser})</span>
            </div>
            {document.readyState === "complete" && !isLoading ? (
                <div className="flex-1 overflow-y-auto p-4" ref={conversationRef}>
                <div>
                    {/* User's chat messages */}
                    {
                        messagesData.map((message, index) => ( message.userUsername === userInfo.username ?
                            (<div key={index} className="flex justify-end">
                            <Card className={`my-2 rounded-3xl p-3 max-w-[80%] h-auto overflow-hidden ${message.userUsername === userInfo.username ? ' bg-main-blue' : 'bg-light-grey'}`}>
                                <div>{message.messageContent}</div>
                            </Card>
                            </div>)
                        :
                            (<div key={index}>
                                <div className={`flex flex-row gap-x-2 items-center ${message.userUsername === userInfo.username ? 'justify-end' : ''}`}>
                                    {message.userUsername !== userInfo.username  && (
                                        <ProfilePhoto
                                            hoverEffect={false}
                                            userPhotoData={chat.otherUserImage}
                                            className={`${message.userUsername === userInfo.username ? 'order-last flex' : ''} min-win-[10%] shrink-0  h-[5vh] w-[5vh]`} />
                                    )}
                                    <Card
                                        className={`my-2 rounded-3xl p-3 max-w-[80%] border-transparent ${message.userUsername === userInfo.username ? ' bg-main-blue' : 'bg-light-grey'} `}>
                                        {message.messageContent}
                                    </Card>
                                </div>
                            </div>)

                        ))
                    }
                </div>
            </div>
            )
        :
            (<Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />)}
            
            {/* Input form only shown when messages have been loaded */}
            {document.readyState === "complete" && !isLoading && (
            <form className="w-full px-8 py-6 " onSubmit={sendMessage}>
                <div className='relative w-full flex'>
                    <Input
                        value={formValue}
                        onChange={(event) => setFormValue(event.target.value)}
                        placeholder="Type a message..."
                        className="w-full rounded-3xl pl-8 pr-40"
                    />
                    <Button type="submit" disabled={!formValue}
                            className="bg-secondary-purple hover:bg-secondary-purple-hover focus:outline-none cursor-pointer
                            flex absolute right-1 top-1/2 transform -translate-y-1/2">
                        <PaperAirplaneIcon className='icon-base'/>
                        <span className='hidden sm:inline px-2'>Send</span>
                    </Button>
                </div>
            </form>)
        }
        </div>
    );}

export default Conversation;
