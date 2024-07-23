/**
 * File Description: Messages page
 * File version: 1.1
 * Contributors: Vicky
 */

import React, {useState} from 'react';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"

import ChatCollection from "/imports/api/collections/chats";
import MessageCollection from "/imports/api/collections/messages";

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
    // get current user information
    const [userInfo, setUserInfo] = useState(
        {"username": null, "type": null}
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const username = user.username;
            const type = user.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (userInfo.username !== username, userInfo.type !== type) {
                setUserInfo(
                    {
                        "username": user.username,
                        "type": user.profile.type
                    }
                )
            }
        }
    })


    // set up subscription (publication is in the "publication" folder)
    const isLoadingChats = useSubscribe('all_user_chats');
    
     // get data from db
     let chatsData = useTracker(() => {
        return ChatCollection.find({
            "$or": [
            { "brideUsername": userInfo.username },
            { "artistUsername": userInfo.username }
        ]}).fetch();
    });

    // TODO: subscribe to all users and then do a for loop to aggregate chat data with other user data (photos, username, etc.)

    // TODO: this might not sort ascending (check with UI later)
    chatsData.sort(function(dateOne, dateTwo) {
        let keyOne = new Date(dateOne.chatUpdatedDate);
        let keyTwo = new Date(dateTwo.chatUpdatedDate);
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

    // TODO: if statement to check if chats have been loaded yet (do the below inside the if statement)
    // note: chats has a chatLastMessage attribute that can be used to display a message preview on the left side
    // TODO: double check that the chats are listed in order of the dates
    const newMsgPreviewsComponents = users.map((user, index) => <MessagesPreview key = {index} data = {user} onClick={() => handlePreviewClick(index)}></MessagesPreview>);

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
                {/* TODO: change user= to chat=, selectedConversationIndex to chatId */}
                <Conversation user={users[selectedConversationIndex]}/> 
            </div>
        </WhiteBackground>
    );
};

export default MessagesPage;