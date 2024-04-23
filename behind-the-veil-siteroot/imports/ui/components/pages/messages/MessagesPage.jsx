/**
 * File Description: Messages page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Messages page with all users they've chatted with
 */
export const MessagesPage = () => {
    return (
        // if window size is SMALLER than a medium screen (default variable for medium in tailwind sm:768px),
        // then have the contacts/list of people on separate screens than the conversation
        <WhiteBackground pageLayout={window.innerWidth <= 768 ? PageLayout.SMALL_CENTER : PageLayout.MESSAGES_PAGE}>
            {/*you MUST keep this div and put everything on the left side inside of it*/}
            <div>
                <span>Messages Left Page to be done!!</span>
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div>
                <span>Messages Right Page to be done!!</span>
            </div>
        </WhiteBackground>
    );
};

export default MessagesPage;