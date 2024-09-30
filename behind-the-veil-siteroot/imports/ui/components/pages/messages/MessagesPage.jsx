/**
 * File Description: Messages page
 * File version: 1.3
 * Contributors: Vicky, Nikki
 */

import React, {useEffect, useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
import {useNavigate} from "react-router-dom";
import {Meteor} from "meteor/meteor";
import {Modal} from 'react-responsive-modal';

import ChatCollection from "/imports/api/collections/chats";
import ImageCollection from '../../../../api/collections/images.js';
import "../../../../api/methods/chats.js"

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Conversation from '../../message/Conversation';
import MessagesPreview from '../../message/MessagesPreview';
import Loader from "/imports/ui/components/loader/Loader";
import Button from "../../button/Button.jsx";
import Input from '../../input/Input.jsx';
import {CheckIcon, PlusIcon} from '@heroicons/react/24/outline'

import {useUserInfo} from "../../util.jsx"
import UrlBasePath from "../../../enums/UrlBasePath";

/**
 * Messages page with all users they've chatted with
 */
export const MessagesPage = () => {
    const navigate = useNavigate();

    // get current user information
    const userInfo = useUserInfo();

    // given a username and chat, return the username of the other user
    const getOtherUsername = (username, chat) => {
        return chat.brideUsername !== username ? chat.brideUsername : chat.artistUsername;
    };

    // handler for modal displaying that user cannot message another user
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        routeToDefaultChat();
    }

    // handler for modal displaying for creating chat
    const [openCreateChat, setOpenCreateChat] = useState(false);
    const onOpenCreateChatModal = () => setOpen(true);
    const onCloseCreateChatModal = () => {
        setOpen(false);
        setErrors({chatUsername: "", chatCreation: ""})
        setSuccessMessage("");
    }

    // State for input values and errors
    const [chatUsername, setChatUsername] = useState("")
    const [errors, setErrors] = useState({
        chatUsername: "",
        chatCreation: "",
    });
    const [successMessage, setSuccessMessage] = useState("");


    const handleCreateChat = (event) => {
        event.preventDefault();
        setSuccessMessage('');

        const chatUsername = document.getElementById('chatUsername').value.trim();
        console.log("other username", chatUsername)
        let newErrors = {};
        let isError = false;
        // first check to ensure all text fields have inputs
        if (!chatUsername) {
            newErrors.chatUsername = 'Please input a username'
            setErrors(newErrors);
        }
        else {
            const chatIndex = findChatIndex(chatUsername);
            // if chat is found, set it as the selected conversation
            if (chatIndex !== -1) {
                setErrors({chatCreation: "Chat already exists."})
            } else {
                setErrors(newErrors)
                createNewChat(chatUsername);
            }
        }
    }

    const handleInputChange = (event) => {
        setChatUsername(event.target.value);
        setErrors({})
    }

    // set up subscription (publication is in the "publication" folder)
    const isLoadingChats = useSubscribe('all_user_chats', userInfo.username);
    let chatsData = useTracker(() => {
        return ChatCollection.find({
            $or: [
                {brideUsername: userInfo.username},
                {artistUsername: userInfo.username}
            ]
        }).fetch();
    });
    const isLoadingUserImages = useSubscribe('profile_images');
    let usersImagesData = useTracker(() => {
        return ImageCollection.find().fetch();
    })

    const isLoading = isLoadingChats() || isLoadingUserImages();

    // manual aggregation into chatsData with the other user's images
    for (let i = 0; i < chatsData.length; i++) {
        // find the other user's username
        const otherUser = getOtherUsername(userInfo.username, chatsData[i]);

        for (let j = 0; j < usersImagesData.length; j++) {
            // find the other user's image and add their image to the chat data
            if (usersImagesData[j].target_id === otherUser) {
                chatsData[i].otherUserImage = usersImagesData[j].imageData;
                break;
            }
        }
    }

    // sort chats data in descending order for the dates
    chatsData.sort(function (dateOne, dateTwo) {
        let keyOne = dateOne.chatUpdatedDate;
        let keyTwo = dateTwo.chatUpdatedDate;
        // Compare the 2 dates
        if (keyOne > keyTwo) return -1;
        if (keyOne < keyTwo) return 1;
        return 0;
    });

    // set the default conversation to the conversation that was updated most recently
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);  // track the conversation selected, initially 0

    // helper function to find an existing chat
    const findChatIndex = (username) => {
        return chatsData.findIndex(chat =>
            username === chat.artistUsername || username === chat.brideUsername
        );
    };

    // if the user is already in a conversation with someone (based on the url), show the conversation with 
    // that user. if it doesn't exist, create a new chat with that user.
    useEffect(() => {
        const otherUsername = window.location.hash.slice(1);

        if (isLoading) return; // return if chats are still loading

        // for the default message url, route to default chat
        if (otherUsername === "") {
            routeToDefaultChat();
            return;
        }

        const chatIndex = findChatIndex(otherUsername);
        // if chat is found, set it as the selected conversation
        if (chatIndex !== -1) {
            setSelectedConversationIndex(chatIndex);
            // set the read status of the conversation to true
            chatRead(chatIndex, true);

        } else {
            createNewChat(otherUsername);
        }
    }, [chatsData, window.location.hash.slice(1), isLoadingChats()]);


    // create a new chat with the provided username, returns a boolean indicating if a chat has
    // been successfully created
    const createNewChat = (username) => {
        // get the other user
        Meteor.call('get_user', username, (error, result) => {
            if (error) {
                console.error('Error fetching alias:', error);
                return;
            }
            if (!result) {
                console.error('User not found:', username);
                setErrors({ chatUsername: "", chatCreation: "User does not exist." })
                return;
            }

            let otherUserType = result.profile.type;

            // check that the current user's type is not the same as the other user's type. if it is, give them
            // a popup warning and bring them back to general messages page (routing)
            if (userInfo.type === otherUserType) {
                // if the user types are the same, display a modal indicating an error
                onOpenModal();
                return;
            }

            try {
                const brideUsername = userInfo.type === "bride" ? userInfo.username : username;
                const artistUsername = userInfo.type === "artist" ? userInfo.username : username;
                const chatUpdatedDate = new Date();
                const chatLastMessage = "";
                const readByBride = true;
                const readByArtist = true;

                // wrap meteor.call in a promise
                new Promise((resolve, reject) => {
                    // asynchronous operation
                    Meteor.call('create_chat',
                        brideUsername,
                        artistUsername,
                        chatUpdatedDate,
                        chatLastMessage,
                        readByBride,
                        readByArtist,
                        (error, result) => {
                            if (error) {
                                reject(error); // if there's an error, go to the catch block
                            } else {
                                resolve(result); // if there's no error, continue with the rest of the block
                            }
                        });
                }).then(() => {
                    console.log("Chat successfully added");
                    setSuccessMessage("Chat successfully created!")
                    return;
                });
            } catch (error) {
                console.log("Error adding message. Returned with error:" + error.message);
                return;
            }
        });
    }

    // helper function to route to the default chat (most recent chat)
    const routeToDefaultChat = () => {
        const otherUsername = window.location.hash.slice(1);
        if (chatsData.length > 0) {
            routeToChat(0);
        } else if (otherUsername !== "") {
            navigate('/' + UrlBasePath.MESSAGES)
        }
    };

    // function to route to a chat given an index
    const routeToChat = (index) => {
        setSelectedConversationIndex(index);
        // get the username of the user selected in the message preview click
        const urlUsername = getOtherUsername(userInfo.username, chatsData[index]);
        // navigate to the new page
        navigate('/' + UrlBasePath.MESSAGES + '#' + urlUsername);
        // set the chat's read status to true
        chatRead(index, true);
    };

    // function to set a chat's read attribute
    const chatRead = (index, read) => {
        const chat = chatsData[index];
        try {
            new Promise((resolve, reject) => {
                Meteor.call('update_chat_read', chat._id, userInfo.username, read, (error, result) => {
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
    }




    // mobile/small view variables
    const [inContactList, setInContactList] = React.useState(true);

    const newMsgPreviewsComponents = chatsData.map((chat, index) =>
        <MessagesPreview key={chat._id} data={chat} onClick={() => routeToChat(index)} isLeftHandler={setInContactList} />);

    if (isLoading) {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"Chats is loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        )
    } else {
        return (
            <div>
                {/* this is the format SMALLER (mobile) screens */}
                <WhiteBackground className={"flex lg:hidden"} pageLayout={PageLayout.LARGE_CENTER}>
                    {/* only display when inContactList is true */}

                    <span className={"title-text text-center " + (inContactList ? "" : "hidden")}>Chats</span>
                    {/* If there are chats, display a message indicating there are no chats to display*/}
                    {chatsData.length > 0 ?
                        <div className={"flex flex-col gap-3 " + (inContactList ? "" : "hidden")}> 
                            <div className="flex flex-col items-center justify-center gap-y-3">
                                <Button
                                    className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center bg-secondary-purple hover:bg-secondary-purple-hover"
                                    onClick={onOpenCreateChatModal}>
                                    <PlusIcon className="icon-base"/> Create Chat
                                </Button>
                            </div>
                            {newMsgPreviewsComponents} 
                        </div> :
                        (<div className="flex flex-col items-center justify-center gap-y-3">
                            <Button
                                className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center bg-secondary-purple hover:bg-secondary-purple-hover"
                                onClick={onOpenCreateChatModal}>
                                <PlusIcon className="icon-base"/> Create Chat
                            </Button>
                            <div className={"main-text text-dark-grey"}>No messages to display</div>
                            <Button onClick={() => isLeftHandler(false)}>Back</Button>
                        </div>)
                    }

                    {/* only display when inContactList is false */}
                    <div className={inContactList ? "hidden" : ""}>

                        {/* display conversations if any */}
                        {chatsData.length &&
                                <Conversation chat={chatsData[selectedConversationIndex]} isLeftHandler={setInContactList} />}
                    </div>
                </WhiteBackground>

                {/* this is the format for LARGE screens */}
                <WhiteBackground className={"hidden lg:flex"} pageLayout={PageLayout.MESSAGES_PAGE}>
                    {/*you MUST keep this div and put everything on the left side inside of it*/}
                    <div className="flex flex-col gap-3 w-full">
                        <div className='flex items-center justify-center gap-y-3'>
                            <Button
                                className="flex flex-row gap-x-1.5 min-w-48 items-center justify-center bg-secondary-purple hover:bg-secondary-purple-hover"
                                onClick={onOpenCreateChatModal}>
                                <PlusIcon className="icon-base"/> Create Chat
                            </Button>
                        </div>
                        {newMsgPreviewsComponents}
                    </div>

                    {/*you MUST keep this div and put everything on the right side inside of it*/}
                    <div>
                        {/* If there are chats, display a message indicating there are no chats to display*/}
                        {chatsData.length > 0 ? (
                                <Conversation chat={chatsData[selectedConversationIndex]}/>) :
                            (<div className="flex justify-center">
                                <div className={"main-text text-dark-grey"}>No messages to display</div>
                            </div>)
                        }
                    </div>

                </WhiteBackground>


                <Modal
                    classNames={{modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue"}}
                    open={open} onClose={onCloseModal} center showCloseIcon={false}>
                    <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col">
                            <h2 className="text-center title-text">
                                Cannot message
                            </h2>
                            <p className="text-center medium-text">You cannot message users of the same type (bride/artist).</p>
                            <p className="text-center medium-text">You will now be redirected to the messages page.</p>
                            <div className="flex justify-center space-x-6 mt-5">
                                <Button
                                    className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1"
                                    onClick={onCloseModal}>
                                    <CheckIcon className="icon-base"/> Confirm
                                </Button>

                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    classNames={{modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue"}}
                    open={open} onClose={onCloseCreateChatModal} center showCloseIcon={false}>
                    <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col">
                            <h2 className="text-center title-text">
                                Create Chat
                            </h2>
                            {/* INSERT SEARCH BAR HERE */}
                            <Input 
                                id="chatUsername" 
                                type="search" 
                                placeholder={"Enter username"} 
                                onChange={handleInputChange}/>
                            <div className="flex justify-center space-x-6 mt-5">
                                <Button
                                    className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1"
                                    onClick={handleCreateChat}>
                                    <PlusIcon className="icon-base"/> Create Chat
                                </Button>
                            </div>
                            {!chatUsername && errors.chatUsername && <div className="text-cancelled-colour text-center">{errors.chatUsername}</div>}
                            {chatUsername && errors.chatCreation && !errors.chatUsername && <div className="text-cancelled-colour text-center">{errors.chatCreation}</div>}
                            {successMessage && <div className="text-confirmed-colour text-center">{successMessage}</div>}
                        </div>
                    </div>
                </Modal>
            </div>

        );
    }
};

export default MessagesPage;