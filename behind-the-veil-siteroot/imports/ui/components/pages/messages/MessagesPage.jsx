/**
 * File Description: Messages page
 * File version: 1.2
 * Contributors: Vicky
 */

import React, {useState, useEffect} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
import {useNavigate, useParams} from "react-router-dom";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";

import ChatCollection from "/imports/api/collections/chats";
import ImageCollection from '../../../../api/collections/images.js';
import "../../../../api/methods/chats.js"

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Conversation from '../../message/Conversation';
import MessagesPreview from '../../message/MessagesPreview';
import Loader from "/imports/ui/components/loader/Loader";
import Button from "../../button/Button.jsx";

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
        return chat.brideUsername != username ? chat.brideUsername : chat.artistUsername;
    };

    // set up subscription (publication is in the "publication" folder)
    const isLoadingChats = useSubscribe('all_user_chats', userInfo.username);
    const isLoadingUserImages = useSubscribe('profile_images');
    const isLoading = isLoadingChats() || isLoadingUserImages();
    
    // get data from db
    let chatsData = useTracker(() => {
        return ChatCollection.find({
            $or: [
                { brideUsername: userInfo.username },
                { artistUsername: userInfo.username }
            ]
        }).fetch();
    });

    let usersImagesData = useTracker(() => {
        return ImageCollection.find().fetch;
    })
    
    // manual aggregation into chatsData with the other user's images
    for (let i = 0; i < chatsData.length; i++) {
        // find the other user's username
        const otherUser = getOtherUsername(userInfo.username, chatsData[i]);

        for (let j = 0; j < usersImagesData.length; j++) {
            // find the other user's image and add their image to the chat data
            if (usersImagesData[j].targetId == otherUser) {
                chatsData[i].otherUserImage = usersImagesData[j].imageData;
                break;
            }
        }
    }

    // sort chats data in descending order for the dates
    chatsData.sort(function(dateOne, dateTwo) {
        let keyOne = dateOne.chatUpdatedDate;
        let keyTwo = dateTwo.chatUpdatedDate;
        // Compare the 2 dates
        if (keyOne > keyTwo) return -1;
        if (keyOne < keyTwo) return 1;
        return 0;
    });

    // set the default conversation to the conversation that was updated most recently
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);  // track the conversation selected, initially 0
    
    // if the user is already in a conversation with someone (based on the url), show the conversation with 
    // that user. if it doesn't exist, create a new chat with that user.
    useEffect(() => {
        const otherUsername = window.location.hash.slice(1);

        // helper function to find an existing chat
        const findChatIndex = (username) => {
            return chatsData.findIndex(chat => 
                username === chat.artistUsername || username === chat.brideUsername
            );
        };

        // helper function to route to the default chat (most recent chat)
        const routeToDefaultChat = () => {
            if (chatsData.length > 0) {
                routeToChat(0);
            }
        };

        if (isLoadingChats()) return; // return if chats are still loading

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

    
    // create a new chat with the provided username
    const createNewChat = (username) => {
        // get the other user
        Meteor.call('get_user', username, (error, result) => {
            if (error) {
              console.error('Error fetching alias:', error);
              return;
            }
            otherUserType = result.profile.type;

            // TODO: check that the current user's type is not the same as the other user's type. if it is, give them
            // some kind of pop up warning [REFERENCE NETH'S CODE FOR THE POP UP FOR PAYMENT] to tell them that they can't message the other
            // user and then just bring them back to general messages page (routing)
            // maybe: make a helper function - need to do a check of this in the below code as well
            if (userInfo.type === otherUserType) {
                // TODO: show error pop up here - refer to neth's code for payement pop up then
                // route them to the default messages page
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
                    Meteor.call('create_chat', brideUsername, artistUsername, chatUpdatedDate, chatLastMessage, readByBride, readByArtist, (error, result) => {
                        if (error) {
                            reject(error); // if there's an error, go to the catch block
                        } else {
                            resolve(result); // if there's no error, continue with the rest of the block
                        }
                    });
                }).then(() => {
                    console.log("Chat successfully added");
                });
            } catch (error) {
                console.log("Error adding message. Returned with error:" + error.message);
            }
            
          });
    }

    // function to route to a chat given an index
    const routeToChat = (index) => {
        setSelectedConversationIndex(index);
        // get the username of the user selected in the message preview click
        const urlUsername = getOtherUsername(userInfo.username, chatsData[index]);
        // navigate to the new page
        navigate('/' + UrlBasePath.MESSAGES +'#' + urlUsername);
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

    const newMsgPreviewsComponents = chatsData.map((chat, index) => <MessagesPreview key = {index} data = {chat} onClick={() => routeToChat(index)}></MessagesPreview>);

    return (
        // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
        // then have the contacts/list of people on separate screens than the conversation
        <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
            {/*you MUST keep this div and put everything on the left side inside of it*/}
            <div className="flex flex-col gap-3">
                {newMsgPreviewsComponents}
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div >
                {/* If there are chats, display a message indicating there are no chats to display*/}
                {chatsData.length > 0 ? (
                    <Conversation chat={chatsData[selectedConversationIndex]} />) : 
                    (<div className="flex justify-center">
                        <div className={"main-text"}>No messages to display</div>
                    </div>)
                    }
            </div>
        </WhiteBackground>
        );
};

export default MessagesPage;