/**
 * File Description: Direct Message Conversation Component of Messages Page
 * File version: 1.0
 * Contributors: Nishan
 */

import React, { useRef, useState } from 'react';
import Card from '../card/Card';

export const Conversation = ({ user }) => {

    const [formValue, setFormValue] = useState('');
    const [messages, setMessages] = useState([]);
    const conversationRef = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();
        if (formValue.trim() === '') return;
        setMessages(prevMessages => [...prevMessages, { text: formValue, sender: 'me' }]);
        setFormValue('');
    };

    return (
        <div className="flex flex-col fixed top-0 bottom-0 left-0 right-0">
            <div className="flex-1 overflow-y-auto p-4" ref={conversationRef}>
                <div className='message-receiver-name-text border-b-2 border-main-blue py-2 mb-8 pl-8'>{user.name}</div>
                <div>
                    {user.messages.map((message, index) => (
                        <div key={index} className={message.sender === 'me' ? ' text-red-700' : 'text-blue-700'}>
                            <Card className="py-2 my-2">{message.text}</Card>
                        </div>
                    ))}

                    {messages.map((message, index) => (
                        <div key={index} className="text-red-700">
                            <Card className="py-2 my-2">{message.text}</Card>
                        </div>
                    ))}
                </div>
            </div>

            <form className="w-full px-8 py-6" onSubmit={sendMessage}>
                <div className=' relative inline-block w-full'>
                    <input
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        placeholder="Type a message..."
                        className=" w-11/12 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" disabled={!formValue} className="absolute px-6 py-2 text-bold bg-secondary-purple hover:bg-secondary-purple-hover rounded-lg focus:outline-none">
                        Sent
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Conversation;
