from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

"""
Add test cases for all the APIs in main.py
"""

def test_get_chats():
    response = client.get("/chat/")
    assert response.status_code == 200
    assert response.json() == {"chats": []}


def test_post_chat():
    response = client.post("/chat/?chat_message=Hello")
    print(response.status_code)
    print(response.json())

    assert response.status_code == 200
    assert isinstance(response.json().get("bot_response"), str)
    assert isinstance(response.json().get("previous_chat_id"), int)

def test_update_chat():
    response = client.put("/chat/1?chat_message=update")
    assert response.status_code == 200
    assert isinstance(response.json().get("bot_response"), str)
    assert isinstance(response.json().get("previous_chat_id"), int)

def test_delete_chat():
    response = client.delete("/chat/1")
    assert response.status_code == 200
    assert response.json() == "success"

    response = client.delete("/chat/1")
    assert response.status_code == 200
    assert response.json() == "already_deleted"


# Add a function which calls all the test functions above
def test_all():
    test_get_chats()
    test_post_chat()
    test_update_chat()
    test_delete_chat()


if __name__ == "__main__":
    test_all()