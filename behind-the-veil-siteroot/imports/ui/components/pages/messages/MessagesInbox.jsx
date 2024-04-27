/**
 * File Description: Messages Inbox
 * File version: 1.0
 * Contributors: Vicky
 */

import React from "react";
import Card from "../../card/Card";
import Button from "../../button/Button";
import MessagesPreview from "./MessagesPreview";

const messagePreviews = [
    {
        userName: 'titan1',
        name: 'Annie',
        recentMessage: 'Hi, I was wondering if you were the amazing artist that he recommended?',
        image: '',
        date: new Date(2024, 4, 20),
        read: true
    },
    {
        userName: 'ackmn',
        name: 'Mikasa',
        recentMessage: 'Hi Alice, I was wondering if you have experience with bridesmaid makeup?',
        image: '',
        date: new Date(2024, 3, 15),
        read: false
    }
]

const MessagesInbox = () => {
    const messagePreviewsComponents = messagePreviews.map((messagePreview, index) => <MessagesPreview key = {index} data = {messagePreview}></MessagesPreview>);
    return (
        <div className="flex flex-col gap-3 bg-light-grey">
            {messagePreviewsComponents}
        </div>
    )
}

export default MessagesInbox;