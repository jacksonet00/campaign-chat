import { NextPage } from "next";
import { Head } from "next/document";
import { useState } from "react";
import { clearHistory, addChat } from "../data/chatSlice";
import { useAppSelector, useAppDispatch } from "../data/store";
import { Chat } from "../types/Chat";
import ActionButton from "./ActionButton";
import ChatBox from "./ChatBox";
import MessageInput from "./MessageInput";
import styles from "../styles/Home.module.css";
import { FOLLOW_UP_MESSAGE, SEED_MESSAGE } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { Data } from "../pages/api/chat";

const Game: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { apiKey } = useAppSelector((state) => state.apiKey);
  const { chats } = useAppSelector((state) => state.chatHistory);
  const dispatch = useAppDispatch();

  function _getBufferString(message: string) {
    let bufferString = "";
    chats.forEach((chat) => {
      bufferString += chat.message + "\n";
    });
    bufferString += message;
    return bufferString;
  }

  function _getButtonTitle() {
    if (inProgress) {
      return "End Game";
    } else {
      return "Start Game";
    }
  }

  function _getButtonClassName() {
    if (inProgress) {
      return styles.end;
    } else {
      return styles.start;
    }
  }

  async function _initializeGame() {
    await _handleSendChat({
      message: SEED_MESSAGE,
      id: uuidv4(),
      sender: true,
    });
    setTimeout(() => {
      _handleSendChat({
        message: _getBufferString(FOLLOW_UP_MESSAGE),
        id: uuidv4(),
        sender: true,
      }).then(() => setInProgress(true));
    }, 3000);
  }

  async function _endGame() {
    dispatch(clearHistory());
    setInProgress(false);
  }

  async function _handleActionButton() {
    if (inProgress) {
      _endGame();
    } else {
      await _initializeGame();
    }
  }

  async function _handleSendChat(chat: Chat) {
    dispatch(addChat(chat));
    setInputValue("");
    const requestBody = {
      chat: _getBufferString(chat.message),
    };
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey!,
      },
    });
    const responseJson: Data = await response.json();
    if (responseJson.error || !responseJson.data) {
      console.error(responseJson.error?.message || "No data");
    } else {
      dispatch(
        addChat({
          message: responseJson.data.message,
          id: uuidv4(),
          sender: false,
        })
      );
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Campaign Chat</h1>
        <ChatBox loading={loading} />
        <MessageInput
          onChange={(arg) => setInputValue(arg)}
          value={inputValue}
          onSubmit={() =>
            _handleSendChat({
              message: inputValue,
              id: uuidv4(),
              sender: true,
            })
          }
        />
        <section className={styles.buttonContainer}>
          <ActionButton
            className={_getButtonClassName()}
            title={_getButtonTitle()}
            onClick={_handleActionButton}
          />
        </section>
      </main>
    </div>
  );
};

export default Game;
