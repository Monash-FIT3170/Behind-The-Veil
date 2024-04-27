/**
 * File Description: Messages page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import MessagesPreview from './MessagesPreview.jsx';
import Conversation from '../../message/Conversation';

/**
 * Messages page with all users they've chatted with
 */

const user = {
    name: "Annie",
    profilePic: "url/to/profile/pic",
    messages: [
        { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ducimus perferendis velit placeat expedita blanditiis est, quae officiis aperiam excepturi quis architecto ullam earum dolore unde incidunt corporis qui amet!", sender: "other" },
        { text: "Hello", sender: "other" },
        { text: "Hi", sender: "me" },
        { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ducimus perferendis velit placeat expedita blanditiis est, quae officiis aperiam excepturi quis architecto ullam earum dolore unde incidunt corporis qui amet!", sender: "me" },
    ]
}

export const MessagesPage = () => {
    return (
        // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
        // then have the contacts/list of people on separate screens than the conversation
        <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
            {/*you MUST keep this div and put everything on the left side inside of it*/}
            <div>
                <span>Messages Left Page to be done!!</span>
                <MessagesPreview></MessagesPreview>
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div>
                <Conversation user={user}/>
            </div>
        </WhiteBackground>
    );
};

export default MessagesPage;