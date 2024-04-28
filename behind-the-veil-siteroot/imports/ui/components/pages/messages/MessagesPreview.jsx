/**
 * File Description: Messages Preview
 * File version: 1.0
 * Contributors: Vicky
 */

import React from "react";
import Card from "../../card/Card";
import Button from "../../button/Button";

const MessagesPreview = (props) => {
    const {userName, name, recentMessage, image, date, read} = props.data;
    return (
        <Card className="flex flex-row gap-2 w-full h-full border-none">
            <div className="bg-light-grey w-1/4 p-2 rounded">Img</div>
            <div className="flex flex-col gap-1 w-3/4">
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
        </Card>
    )
}

export default MessagesPreview;