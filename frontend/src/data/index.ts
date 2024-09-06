interface Message {
  chatId?: number;
  message: string;
  user: string;
  timestamp: Date;
  deleted?: boolean;
  isChatOwner?: boolean;
}

const messages: Message[] = [
  {
    chatId: 1,
    message: "Hello, how are you?",
    user: "me",
    timestamp: new Date(),
    deleted: false,
    isChatOwner: true
  },
  {
    chatId: 2,
    message: "I am fine, thank you.",
    user: "bot",
    timestamp: new Date(),
    deleted: false,
    isChatOwner: false
  }
];

export { messages, Message };
