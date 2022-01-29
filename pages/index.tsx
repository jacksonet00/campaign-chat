import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../data/store";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { addChat, clearHistory } from "../data/chatSlice";

export type Chat = {
  message: string;
  sender: boolean;
  id: string;
};

const Home: NextPage = () => {
  const { chats } = useAppSelector((state) => state.chatHistory);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [buffer, setBuffer] = useState("");
  const dispatch = useAppDispatch();

  function _getChatBuffer(message: string) {
    let bufferString = buffer + "\n";
    chats.forEach((chat) => {
      bufferString += chat.message + "\n";
    });
    bufferString += message;
    return bufferString;
  }

  async function _handleSendChat(message: string) {
    setLoading(true);
    dispatch(
      addChat({
        message,
        sender: true,
        id: uuidv4(),
      })
    );
    const myBody = {
      chat: _getChatBuffer(message),
    };
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(myBody), // string or object
      headers: {
        "Content-Type": "application/json",
      },
    });
    const myJson: string = await response.json();
    dispatch(
      addChat({
        message: myJson,
        id: uuidv4(),
        sender: false,
      })
    );
    setLoading(false);
  }

  async function initializeGame() {
    const seedMessage =
      "You are a medeival man taking me on a series of quests, in a kingdom based chat role playing game";
    let myBody = {
      chat: seedMessage,
    };
    let response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(myBody), // string or object
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    const newMessage = "Where am I? What do I see in the kingdom?";
    const newBody = { chat: `${seedMessage}\n${responseJson}\n${newMessage}` };
    response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(newBody), // string or object
      headers: {
        "Content-Type": "application/json",
      },
    });
    const myJson: string = await response.json();
    dispatch(
      addChat({
        message: myJson,
        id: uuidv4(),
        sender: false,
      })
    );
    setBuffer(newMessage);
    setLoading(false);
  }

  function resetGame() {
    setLoading(true);
    dispatch(clearHistory());
    setLoading(false);
  }

  function _handleEndGame() {
    dispatch(clearHistory);
  }

  function _handleStartGame() {
    initializeGame();
  }

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Campaign Chat</title>
        <meta
          name="description"
          content="A chat-based medieval roleplaying game."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Campaign Chat</h1>
        <section className={styles.chatBox}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {chats.map((chat: Chat, i) => (
                <article
                  className={
                    chat.sender ? styles.chatMessageTo : styles.chatMessageFrom
                  }
                  key={i}
                >
                  <p>{chat.message}</p>
                  <article className= {chat.sender ? styles.profileTo: styles.profileFrom}> 
                  </article>
                </article>
              ))}
            </>
          )}
        </section>

        <section
          className={styles.inputContainer}
          onSubmit={(e) => {
            e.preventDefault();
            _handleSendChat(input);
            setInput("");
          }}
        >
          <form>
            <input
              type="text"
              placeholder="..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input type="submit" />
          </form>
          <button
            className={chats.length > 0 ? styles.end : styles.start}
            onClick={chats.length > 0 ? _handleEndGame : _handleStartGame}
          >
            {chats.length > 0 ? "End Game" : "Start Game"}
          </button>
        </section>
      </main>
      {/* <footer className={styles.footer}>
        <a
          href="https://github.com/jacksonet00/campaign-chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          made with{" "}
          <span className={styles.logo}>
            <Image src="/heart.png" alt="Heart emoji" width={30} height={30} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
