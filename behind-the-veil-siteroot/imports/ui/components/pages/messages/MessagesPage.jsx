/**
 * File Description: Messages page
 * File version: 1.0
 * Contributors: Vicky
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"
import {resetDatabase} from 'meteor/xolvio:cleaner';
import { Meteor } from 'meteor/meteor';

import ChatCollection from "/imports/api/collections/chat";
import MessageCollection from "/imports/api/collections/message";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Conversation from '../../message/Conversation';
import MessagesPreview from '../../message/MessagesPreview';

/**
 * Messages page with all users they've chatted with
 */

const users = [
    {
        name: "Annie",
        profilePic: "url/to/profile/pic",
        messages: [
            { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ducimus perferendis velit placeat expedita blanditiis est, quae officiis aperiam excepturi quis architecto ullam earum dolore unde incidunt corporis qui amet!", sender: "other", read: true},
            { text: "Hello", sender: "other", read: true },
            { text: "Hi", sender: "me", read: true },
            { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ducimus perferendis velit placeat expedita blanditiis est, quae officiis aperiam excepturi quis architecto ullam earum dolore unde incidunt corporis qui amet!", sender: "me", read: true },
            { text: "Hi, I was wondering if you were the amazing artist that he recommended?", sender: "other", read: true },

        ],
        userName: 'titan1'
    },
    {
        name: "Mikasa",
        profilePic: "url/to/profile/pic",
        messages: [
            { text: "Hi Alice, I was wondering if you have experience with bridesmaid makeup?", sender: "other", read: false}
        ],
        userName: 'ackmn'
    },
]

export const MessagesPage = () => {
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);  // track the conversation selected, initially 0
    const handlePreviewClick = (index) => {
        setSelectedConversationIndex(index);
        console.log("hello from the messages page");
    };
    const newMsgPreviewsComponents = users.map((user, index) => <MessagesPreview key = {index} data = {user} onClick={() => handlePreviewClick(index)}></MessagesPreview>);

    // Working with the database for messages and chats
    // Get the logged in user's username
    // const user = Meteor.users.findOne(this.userId);
    // if (!user) {
    //     return this.ready();
    // }
    // const username = user.username;

    const loggedInUser = "loggedIn"
    const chat1User = "annie"
    const chat2User = "mikasa"
    resetDatabase(); // Clear the collection before each test
    const handleAddChat = (brideUser, artistUser, chatId) => {
        Meteor.call('add_chat', brideUser, artistUser, chatId, (error, result) => {
            if (error) {
                console.error('Error adding chat:', error);
            } else {
                console.log('Chat added with ID:', result);
                // Handle successful chat creation (e.g., updating the UI or state)
                console.log('Chat with user: ', brideUser);
            }
        });
    };
    handleAddChat(chat1User, loggedInUser, '1');
    handleAddChat(chat1User, loggedInUser, '2');




    // set up subscription (publication is in the "publication" folder)
    const isLoadingChats = useSubscribe('all_user_chats', 'dummyUserName');
    // get chat data associated with the user from db
    let chatsData = useTracker(() => {return ChatCollection.find().fetch();});
    // for each chat, subscribe to the messages
    for (let i = 0; i < chatsData.length; i++) {
        useSubscribe('all_chat_messages', chatsData[i].chatId);
    }
    // get the message data associated with each chat
    let messagesData = useTracker(() => {return MessageCollection.find().fetch();});
    console.log(chatsData);

    return (
        // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
        // then have the contacts/list of people on separate screens than the conversation
        <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
            {/*you MUST keep this div and put everything on the left side inside of it*/}
            <div className="flex flex-col gap-3">
                {newMsgPreviewsComponents}
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div>
                <Conversation user={users[selectedConversationIndex]}/>
            </div>
        </WhiteBackground>
    );
};

export default MessagesPage;