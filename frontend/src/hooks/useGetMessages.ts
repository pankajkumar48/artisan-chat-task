import { useEffect, useState } from "react";
import { messages } from "../data";
import { MessagesModel, MessagesResponse } from "./messages-transform.types";

/** This is where we should consume the data
 * from an API
 */
export const useGetMessages = (): MessagesModel => {
  return {
    messages: new MessagesResponse(messages)
  };
};

// export interface Message {
//   chatId?: number;
//   message: string;
//   user: string;
//   timestamp: Date;
//   deleted?: boolean;
//   isChatOwner?: boolean;
// }

export interface Message{
  chat_id?: number;
  message: string;
  user: string;
  timestamp?: Date;
  deleted?: boolean;
  is_chat_owner?: boolean;
}

interface Messages {
  messages: Message[];
}

const API_URL = 'http://localhost:8000/chat';

export const useFetchMessages = (): Messages => {
  try {
    // Ftech the messages from the API and return them use then chaining
    const messages = fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data fetched:', data);
        return data;
      });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};
