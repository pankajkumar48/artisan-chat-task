import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { Message } from '../../hooks/useGetMessages';

interface ChatContentProps {
  messages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatContent: React.FC<ChatContentProps> = ({ messages, setChatMessages }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');

  const handleEditClick = (index: number, currentMessage: string) => {
    setEditIndex(index);
    setEditedMessage(currentMessage);
  };

  const handleSaveClick = async (index: number) => {
    try {
      const API_URL = `http://localhost:8000/chat/${encodeURIComponent(index + 1)}?chat_message=${encodeURIComponent(editedMessage)}`;
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
        },
        body: '', // No body content as per the curl command
      });

      if (response.ok) {
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[index] = { ...updatedMessages[index], message: editedMessage };
          return updatedMessages;
        });
        setEditIndex(null);
        setEditedMessage('');
      } else {
        console.error('Failed to update message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = async (index: number) => {
    try {
      const API_URL = `http://localhost:8000/chat/${encodeURIComponent(index + 1)}`;
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
        },
      });

      if (response.ok) {
        setChatMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
        console.log('Message deleted successfully');
      } else {
        console.error('Failed to delete message');
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
                <Avatar size={5} is_chat_owner={message.is_chat_owner} />
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
                  <span className={`text-md ${message.deleted ? 'text-sm italic' : ''}`}>
                    {message.deleted ? 'deleted' : message.message}
                  </span>
                )}
              </div>
              {message.is_chat_owner && editIndex !== index && (
                <div className="flex items-center">
                  <button onClick={() => handleEditClick(index, message.message)}>
                    <i className="fas fa-edit pr-2"></i>
                  </button>
                  <button onClick={() => handleDeleteClick(index)}>
                    <i className="fas fa-trash-alt pr-2"></i>
                  </button>
                </div>
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