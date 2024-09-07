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

// interface Messages {
//   messages: Message[];
// }

// const API_URL = 'localhost:8000/chat';

// export const useGetMessages = (): Messages => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         console.log('Data:', data);
//         setMessages(data.messages);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   return { messages.data };
// };
