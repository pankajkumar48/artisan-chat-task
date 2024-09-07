import time
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_history = []


class Chat:
    def __init__(self, chat_id: int, message: str = None, user: str = None, is_chat_owner: bool = False):
        self.chat_id = chat_id
        self.message = message
        self.user = user
        self.timestamp = Chat.get_current_time()
        self.deleted = False
        self.is_chat_owner = is_chat_owner

    @staticmethod
    def get_current_time():
        # This function will return the current timestamp in string format using system time.
        time_stamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        return time_stamp

    def get_dict(self):
        return {
            "chat_id": self.chat_id,
            "message": self.message,
            "user": self.user,
            "timestamp": self.timestamp,
            "deleted": self.deleted,
            "is_chat_owner": self.is_chat_owner
        }


@app.get("/")
def health():
    return {"status": "ok"}


# API for getting all chats
@app.get("/chat/")
def get_chats():
    return {"chats": [a_chat.get_dict() for a_chat in chat_history]}


# API for posting a new chat
def get_bot_response():
    sample_response_strings = (
        "I am a bot",
        "I am a bot, what can I do for you?",
        "I am a bot, how can I help you?",
        "I am a bot, how can I assist you?",
        "I am a bot, how can I support you?",
        "I am a bot, how can I be of service?",
        "I am a bot, how can I be of assistance?",
        "I am a bot, how can I be of help?",
        "I am a bot, how can I be of aid?",
        "I am a bot, how can I be of use?",
    )

    return sample_response_strings[len(chat_history) % len(sample_response_strings)]


def add_new_chat(chat_message: str, sender: str):
    is_chat_owner = sender == "me"
    new_chat = Chat(len(chat_history)+1,  chat_message, sender, is_chat_owner)
    chat_history.append(new_chat)
    return True


@app.post("/chat/")
def post_chat(chat_message: str):
    add_new_chat(chat_message, "me")

    bot_response = get_bot_response()
    add_new_chat(bot_response, "bot")
    return {
        "bot_response": bot_response,
        "previous_chat_id": len(chat_history)
    }


# API for updating a chat when chat_id is known
@app.put("/chat/{chat_id}")
def update_chat(chat_id: int, chat_message: str):
    for a_chat in chat_history:
        if a_chat.chat_id == chat_id:
            a_chat.message = chat_message

            bot_response = get_bot_response()
            add_new_chat(bot_response, "bot")
            return {
                "bot_response": bot_response,
                "previous_chat_id": a_chat.chat_id
            }
    return "failed"


# API for deleting a chat when chat_id is known
@app.delete("/chat/{chat_id}")
def delete_chat(chat_id: int):
    # Mark deleted == True for the chat with chat_id
    for a_chat in chat_history:
        if a_chat.chat_id == chat_id:
            if a_chat.deleted:
                return "already_deleted"
            a_chat.deleted = True
            return "success"
    return "failed"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

    # chat = Chat("Hello, World!", "Alice")
    # print(chat.get_dict())