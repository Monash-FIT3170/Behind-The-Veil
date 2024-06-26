/**
 * File Description: Direct Message Conversation Component of Messages Page
 * File version: 1.1
 * Contributors: Nishan
 */

import React, {useRef, useState} from 'react';
import Card from '../card/Card';
import ProfilePhoto from '../profilePhoto/ProfilePhoto';
import Input from "../input/Input";
import {PaperAirplaneIcon} from '@heroicons/react/24/outline';
import Button from "../button/Button";

export const Conversation = ({user}) => {

    const [formValue, setFormValue] = useState('');
    const [messages, setMessages] = useState([]);
    const conversationRef = useRef(null);

    const sendMessage = (event) => {
        event.preventDefault();
        if (formValue.trim() === '') return;
        setMessages(prevMessages => [...prevMessages, {text: formValue, sender: 'me'}]);
        setFormValue('');
        let heightToScroll = conversationRef?.current.scrollHeight + 50
        setTimeout(() => {
            conversationRef?.current.scrollTo({left: 0, top: heightToScroll, behaviour: "smooth"})
        }, 5)
    };

    return (
        <div className="flex flex-col fixed top-0 bottom-0 left-0 right-0">
            <div
                className='ml-4 w-11/12 message-receiver-name-text border-b-2 pt-3 pb-1 mb-8 pl-6 border-main-blue'>{user.name}
            </div>
            <div className="flex-1 overflow-y-auto p-4" ref={conversationRef}>
                <div>
                    {user.messages.map((message, index) => (
                        <div key={index}>
                            <div className={`${message.sender === 'me' ? 'flex  justify-end' : 'flex'}`}>
                                {message.sender !== 'me' && (
                                    <ProfilePhoto
                                        className={`${message.sender === 'me' ? 'order-last flex' : ''} min-win-[10%] shrink-0`}></ProfilePhoto>
                                )}
                                <Card
                                    className={`my-2 rounded-3xl max-w-[80%] border-transparent ${message.sender === 'me' ? ' bg-main-blue' : 'bg-light-grey'} `}>
                                    {message.text}
                                </Card>
                            </div>
                        </div>

                    ))}

                    {messages.map((message, index) => (
                        <div key={index} className="flex justify-end">
                            <Card className={`my-2 rounded-3xl max-w-[80%] h-auto overflow-hidden ${message.sender === 'me' ? ' bg-main-blue' : 'bg-light-grey'}`}>
                                <div>{message.text}</div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <form className="w-full px-8 py-6 " onSubmit={sendMessage}>
                <div className='relative w-full flex'>
                    <Input
                        value={formValue}
                        onChange={(event) => setFormValue(event.target.value)}
                        placeholder="Type a message..."
                        className="w-full rounded-3xl pr-40"
                    />
                    <Button type="submit" disabled={!formValue}
                            className="bg-secondary-purple hover:bg-secondary-purple-hover focus:outline-none cursor-pointer
                            flex absolute right-1 top-1/2 transform -translate-y-1/2">
                        <PaperAirplaneIcon className='icon-base'/>
                        <span className='hidden sm:inline px-2'>Send</span>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Conversation;
