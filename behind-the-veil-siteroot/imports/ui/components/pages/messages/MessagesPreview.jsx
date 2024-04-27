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
        <Card className="flex flex-row gap-2">
            <div className="bg-light-grey w-fit p-2 rounded">Image Placeholder</div>
            <div className="flex flex-col gap-2">
            {read ? (
                <div>
                    <div className="message-name-read-text">{name}</div>
                    <div className="message-read-text">{recentMessage}</div>
                </div>
            ) : (
                <div>
                    <div className="message-name-unread-text">{name}</div>
                    <div className="message-unread-text">{recentMessage}</div>
                </div>
            )}
            </div>
        </Card>
    )
}

export default MessagesPreview;