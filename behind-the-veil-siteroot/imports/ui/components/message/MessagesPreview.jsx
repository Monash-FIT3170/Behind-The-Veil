/**
 * File Description: Messages Preview
 * File version: 1.2
 * Contributors: Vicky
 */
import React from "react";
import Card from "../card/Card";
import ProfilePhoto from '../profilePhoto/ProfilePhoto';

import {useUserInfo} from "../util"

// TODO: add pass the chat data profile photo/image here to work with

const MessagesPreview = (props) => {
    const {brideUsername, artistUsername, chatUpdatedDate, chatLastMessage, otherUserImage} = props.data;
    
    // get current user information
    const userInfo = useUserInfo();
    // find the other user's username
    const otherUser = brideUsername != userInfo.username ? brideUsername : artistUsername;

    const onClick = props.onClick;
    // TODO: change this so that it reflects the chat status (chat might need new prop for read or not)
    const read = true; // recentMessageObj.read;
    const recentMessage = chatLastMessage;
    return (
        <Card className="flex flex-row justify-center items-center w-full h-full border-none lg:flex-center cursor-pointer" onClick={onClick}>
            {/* Only show the profile photo on small screens */}
            <div className="lg:hidden">
                <ProfilePhoto className="min-w-[10%] h-auto"></ProfilePhoto>
            </div>
            <div className="hidden lg:flex lg:gap-1 lg:items-center">
                {/* Show profile photos and message preview on larger screens */}
                <ProfilePhoto className="min-win-[10%] shrink-0"></ProfilePhoto>
                <div className="hidden lg:flex lg:flex-col lg:gap-1 lg:w-3/4 ">
                    {read ? (
                        <div>
                            {/* TODO: add user alias here instead of username */}
                            <div className="message-name-read-text">{otherUser}</div>
                            <div className="message-read-text line-clamp-2 overflow-hidden">{recentMessage}</div>
                        </div>
                    ) : (
                        <div>
                            {/* TODO: add user alias here instead of username */}
                            <div className="message-name-unread-text">{otherUser}</div>
                            <div className="message-unread-text line-clamp-2 overflow-hidden">{recentMessage}</div>
                        </div>
                    )}
                    <div className="message-tag-text flex justify-end">@{otherUser}</div>
                </div>
            </div>
        </Card>
    )
}
export default MessagesPreview;