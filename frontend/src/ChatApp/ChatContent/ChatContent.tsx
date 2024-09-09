import React from "react";
import {} from "../../hooks/messages-transform.types";
import Avatar from "../Avatar/Avatar";
import { Message } from "../../hooks/useGetMessages";

import { useState } from 'react';

interface ChatContentProps {
  messages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContent: React.FC<ChatContentProps> = ({ messages, setChatMessages }) => {
  console.log("edited1", typeof setChatMessages, setChatMessages)

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');

  const handleEditClick = (index: number, currentMessage: string) => {
    setEditIndex(index);
    setEditedMessage(currentMessage);
  };

  const handleSaveClick = async (index: number) => {
    try {
      const API_URL = `http://localhost:8000/chat/${encodeURIComponent(index+1)}?chat_message=${encodeURIComponent(editedMessage)}`;
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
        },
        body: '', // No body content as per the curl command
      });

      if (response.ok) {
        console.log("edited12", typeof setChatMessages, setChatMessages)

        console.log("messages before edit", messages)

        // loop over messages and find the message which has index === chat_id
        // then update the message with the new message
        const editedMessages = messages.map((message: Message, i: number) => {
          if (i === index) {
            return {
              ...message,
              message: editedMessage,
            };
          }
          return message;
        });

        console.log("messages after edit", messages)

        setChatMessages(editedMessages);
        setEditIndex(null);
        setEditedMessage('');
      } else {
        console.error('Failed to update message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {messages && messages.length > 0 ? (
        <div className="max-h-screen px-6 py-1 overflow-auto">
          {messages.map((message: Message, index: number) => (
            <div
              key={index}
              className={`py-2 flex flex-row w-full ${
                message.is_chat_owner ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className={`${message.is_chat_owner ? 'order-2' : 'order-1'}`}>
                <Avatar />
              </div>
              <div
                className={`px-2 w-fit py-3 flex flex-col bg-purple-500 rounded-lg text-white ${
                  message.is_chat_owner ? 'order-1 mr-2' : 'order-2 ml-2'
                }`}
              >
                {editIndex === index ? (
                  <div>
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    className="bg-purple-500 text-white"
                  />
                  <button onClick={() => handleSaveClick(index)}>Save</button>
                </div>
                ) : (
                  <span className="text-md">{message.message}</span>
                )}
              </div>
              {message.is_chat_owner && editIndex !== index && (
                <button onClick={() => handleEditClick(index, message.message)}>
                  <i className="fas fa-ellipsis"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No messages available</div>
      )}
    </div>
  );
};

export default ChatContent;