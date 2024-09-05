import React from "react";
import ChatContent from "./ChatContent/ChatContent";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import { useGetMessages } from "../hooks/useGetMessages";
import { Message } from "../data";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ChatHeader from "./ChatHeader/ChatHeader";

const Chat = () => {
  /** Simulate a hook fetching the data */
  const {
    messages: { data }
  } = useGetMessages();

  /** State to control new messages */
  const [chatMessages, setChatMessages] = React.useState<Message[]>(data);

  /**
   *
   * @param message
   * "Create" a new message
   */
  const sendANewMessage = (message: Message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  /**
   * Reset chat to the default messages
   */
  const resetChat = () => {
    setChatMessages(data);
  };

  return (
    // <div className="max-w-sm mx-auto my-auto">
    //   <div className="bg-white border border-gray-200 rounded-lg shadow relative">
    //     <ChatContent messages={chatMessages} />
    //     <ChatInputBox sendANewMessage={sendANewMessage} />
    //   </div>
    // </div>


<div className="h-screen flex items-center justify-center">
  <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow relative">
    <ChatHeader name={"devlazar"} numberOfMessages={chatMessages.length} />
    <ChatContent messages={chatMessages} />
    <ChatInputBox sendANewMessage={sendANewMessage} />
  </div>
</div>

  );
};

export default Chat;
