import React from "react";
import {} from "../../hooks/messages-transform.types";
import Avatar from "../Avatar/Avatar";
import { Message } from "../../hooks/useGetMessages";

import { useState } from 'react';

interface ChatContentProps {
  messages: Message[];
  updateMessage: (index: number, newMessage: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({ messages, updateMessage }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');

  const handleEditClick = (index: number, currentMessage: string) => {
    setEditIndex(index);
    setEditedMessage(currentMessage);
  };

  const handleSaveClick = async (index: number) => {
    try {
      const API_URL = `http://localhost:8000/chat/?chat_message=${encodeURIComponent(editedMessage)}`;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: '', // No body content as per the curl command
      });

      if (response.ok) {
        // updateMessage(index, editedMessage);
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
                <button onClick={() => handleEditClick(index, message.message)}>edit</button>
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