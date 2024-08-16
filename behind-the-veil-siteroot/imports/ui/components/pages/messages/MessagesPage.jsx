/**
 * File Description: Messages page
 * File version: 1.2
 * Contributors: Vicky
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
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

/**
 * Messages page with all users they've chatted with
 */
export const MessagesPage = () => {
    // get current user information
    const userInfo = useUserInfo();

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
        const otherUser = chatsData.brideUsername != userInfo.username ? chatsData.brideUsername : chatsData.artistUsername;

        for (let j = 0; j < usersImagesData.length; j++) {
            // find the other user's image and add their image to the chat data
            if (usersImagesData[j].targetId == otherUser) {
                chatsData[i].otherUserImage = usersImagesData[j].imageData;
                break;
            }
        }
    }

    // TODO: this might not sort ascending (check with UI later)
    chatsData.sort(function(dateOne, dateTwo) {
        let keyOne = dateOne.chatUpdatedDate;
        let keyTwo = dateTwo.chatUpdatedDate;
        // Compare the 2 dates
        if (keyOne < keyTwo) return -1;
        if (keyOne > keyTwo) return 1;
        return 0;
      });


    // TODO: first check if the url has already selected a conversation with someone (from clicking the 
    // send message button on booking details page), show the conversation with that particular user. if not, default to 
    // 0 which is latest conversation. [THERE MIGHT BE ANOTHER PAGE THAT ALREADY LOOKS FOR INFO FROM THE URL - LOOK FOR IT]
    // - write a for loop and check for the other user's username to see if it matches the username in the url
    // and then set that conversation/chat as the selectedConversationIndex
    // AND in this for loop, check that the current user's type is not the same as the other user's type. if it is, give them
    // some kind of pop up warning [REFERENCE NETH'S CODE FOR THE POP UP FOR PAYMENT] to tell them that they can't message the other
    // user and then just bring them back to general messages page
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);  // track the conversation selected, initially 0
    const handlePreviewClick = (index) => {
        setSelectedConversationIndex(index);
    };

    const handleButtonClick = () => {
        //insert the message using the Message database method
        try {
            const brideUsername = "bride123";
            const artistUsername = "hello";
            const chatUpdatedDate = new Date(); 
            const chatLastMessage = "dummy data first message"; 

            // wrap meteor.call in a promise
            new Promise((resolve, reject) => {
                // asynchronous operation
                Meteor.call('create_chat', brideUsername, artistUsername, chatUpdatedDate, chatLastMessage, (error, result) => {
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
    }

    // TODO: if statement to check if chats have been loaded yet (do the below inside the if statement)
    // note: chats has a chatLastMessage attribute that can be used to display a message preview on the left side
    // TODO: double check that the chats are listed in order of the dates
    //const newMsgPreviewsComponents = users.map((user, index) => <MessagesPreview key = {index} data = {user} onClick={() => handlePreviewClick(index)}></MessagesPreview>);
    const newMsgPreviewsComponents = chatsData.map((chat, index) => <MessagesPreview key = {index} data = {chat} onClick={() => handlePreviewClick(index)}></MessagesPreview>);

    if (!isLoading) {
    console.log("Database chats data: ", chatsData);
    }

    // TODO: place this in an if statement that checks if the page is ready or not
    return (
        // <div>hello from the first one</div>
        // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
        // then have the contacts/list of people on separate screens than the conversation
        <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
            {/*you MUST keep this div and put everything on the left side inside of it*/}
            <div className="flex flex-col gap-3">
                {newMsgPreviewsComponents}
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div>
                {/* TODO: selectedConversationIndex to chatId */}
                {chatsData.length > 0 ? (
                    <Conversation chat={chatsData[selectedConversationIndex]} />) : 
                    (<Button onClick={handleButtonClick}>Start a new conversation</Button>)
                    }
            </div>
        </WhiteBackground>
    );
    // TODO: check why the following statement never returns true
    // // checks if the page and data has loaded
    // if (document.readyState === "complete" && !isLoading) {
    //     return (
    //         // <div>hello from the first one</div>
    //         // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
    //         // then have the contacts/list of people on separate screens than the conversation
    //         <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
    //             {/*you MUST keep this div and put everything on the left side inside of it*/}
    //             <div className="flex flex-col gap-3">
    //                 {newMsgPreviewsComponents}
    //             </div>
    //             {/*you MUST keep this div and put everything on the right side inside of it*/}
    //             <div>
    //                 {/* TODO: selectedConversationIndex to chatId */}
    //                 <Conversation chat={chatsData[selectedConversationIndex]}/> 
    //             </div>
    //         </WhiteBackground>
    //     );
    // } else {
    //     // is loading, display loader
    //     return (
    //         <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
    //             <Loader
    //                 loadingText={"Messages are loading . . ."}
    //                 isLoading={isLoading}
    //                 size={100}
    //                 speed={1.5}
    //             />
    //         </WhiteBackground>
    //     );
    // }
};

export default MessagesPage;