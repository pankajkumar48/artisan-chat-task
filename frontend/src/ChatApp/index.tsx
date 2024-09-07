import { useState, useEffect } from "react";
import ChatContent from "./ChatContent/ChatContent";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import { useFetchMessages, useGetMessages } from "../hooks/useGetMessages";
import { Message } from "../data";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ChatHeader from "./ChatHeader/ChatHeader";

const Chat = () => {
  /** State to control new messages */
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  // Add a hook on load to fetch messages and set the state
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const API_URL = 'http://localhost:8000/chat';
        const response = await fetch(API_URL);
        const data = await response.json();
        const fetchedChats = data.chats;
        setChatMessages(fetchedChats);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendANewMessage = (message: Message) => {
    console.log("This message to send", message)
    setChatMessages((prevMessages) => [...prevMessages, message]);

    // Send this message to the server via a post api
    const API_URL = `http://localhost:8000/chat/?chat_message=${encodeURIComponent(message.message)}`;
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      body: '', // No body content as per the curl command
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatHeader name={"me"} />
        <ChatContent messages={chatMessages} />
        <ChatInputBox sendANewMessage={sendANewMessage} />
      </div>
    </div>
  );
};

export default Chat;
