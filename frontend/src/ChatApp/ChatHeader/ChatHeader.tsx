import React from "react";
import { PhoneIcon, CameraIcon } from "@heroicons/react/24/outline";
import Avatar from "../Avatar/Avatar";

interface ChatHeaderProps {
  name: string;
  numberOfMessages: number;
}

const ChatHeader = ({ name, numberOfMessages = 0 }: ChatHeaderProps) => {
  return (
    <div className="border-b-gray-200 py-3 px-6 flex flex-col justify-between items-center">
      <Avatar />
      <div className="font-semibold">Hi👋, I am Ava</div>
      <div className="font-thin">Ask me anything or pick a place to start</div>
    </div>
  );
};

export default ChatHeader;
