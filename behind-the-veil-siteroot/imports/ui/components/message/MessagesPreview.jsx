/**
 * File Description: Messages Preview
 * File version: 1.3
 * Contributors: Vicky, Nikki
 */

import React, {useState} from "react";
import Card from "../card/Card";
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import {useUserInfo} from "../util"

const MessagesPreview = ({data, onClick, isLeftHandler}) => {
    const {
        brideUsername,
        artistUsername,
        chatUpdatedDate,
        chatLastMessage,
        readByBride,
        readByArtist,
        otherUserImage
    } = data;

    // get current user information
    const userInfo = useUserInfo();

    // find the other user's username
    const otherUser = brideUsername !== userInfo.username ? brideUsername : artistUsername;

    // get the other user's username and alias
    const [otherUserAlias, setOtherUserAlias] = useState('');
    Meteor.call('get_alias', otherUser, (error, result) => {
        if (error) {
            console.error('Error fetching alias:', error);
            return;
        }
        setOtherUserAlias(result);
    });


    // check whether the current user has read the message
    const read = userInfo.username === brideUsername ? readByBride : readByArtist;

    // this view changes depending on screen sizes.
    return (

        <Card className="flex flex-row items-center w-full h-fit flex-center cursor-pointer
         lg:border-none border-solid border-light-grey border-2 hover:bg-white-hover transition duration-500 ease-in-out"
              onClick={() => {
                  isLeftHandler(false);
                  onClick()
              }}>

            <div className="flex gap-1.5 items-center w-full">
                {/* Show profile photos and message preview */}
                <ProfilePhoto className="min-w-[10%] shrink-0 h-[7vh] w-[7vh]" userPhotoData={otherUserImage} hoverEffect={false}/>

                <div className="flex flex-col gap-1 w-3/4 ">
                    <div>
                        <div className={read ? "message-name-read-text" : "message-name-unread-text"}>{otherUserAlias}</div>
                        <div className={"line-clamp-2 overflow-hidden " + (read ? "message-read-text" : "message-unread-text")}>{chatLastMessage}</div>
                    </div>
                    {/* Red dot for unread messages */}
                    {!read && (
                        <div className="w-3 h-3 bg-red-600 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2"/>
                    )}
                    <div className="message-tag-text flex justify-end">@{otherUser}</div>
                </div>
            </div>
        </Card>
    )
}
export default MessagesPreview;