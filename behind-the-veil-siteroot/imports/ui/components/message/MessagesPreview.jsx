/**
 * File Description: Messages Preview
 * File version: 1.1
 * Contributors: Vicky
 */
import React from "react";
import Card from "../card/Card";
import ProfilePhoto from '../profilePhoto/ProfilePhoto';

const MessagesPreview = (props) => {
    const {name, profilePic, messages, userName} = props.data;
    const onClick = props.onClick;
    const recentMessageObj = messages[messages.length - 1];
    const read = recentMessageObj.read;
    const recentMessage = recentMessageObj.text;
    console.log(onClick);
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
                            <div className="message-name-read-text">{name}</div>
                            <div className="message-read-text line-clamp-2 overflow-hidden">{recentMessage}</div>
                        </div>
                    ) : (
                        <div>
                            <div className="message-name-unread-text">{name}</div>
                            <div className="message-unread-text line-clamp-2 overflow-hidden">{recentMessage}</div>
                        </div>
                    )}
                    <div className="message-tag-text flex justify-end">@{userName}</div>
                </div>
            </div>
        </Card>
    )
}
export default MessagesPreview;