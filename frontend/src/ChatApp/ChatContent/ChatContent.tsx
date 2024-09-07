import React from "react";
import {} from "../../hooks/messages-transform.types";
import Avatar from "../Avatar/Avatar";
import { Message } from "../../hooks/useGetMessages";

interface ChatContentProps {
  messages: Message[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
  return (
    <div>
      {console.log("chat content", messages)}
      {messages ? (
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
                <span className="text-md">{message.message}</span>
              </div>
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
