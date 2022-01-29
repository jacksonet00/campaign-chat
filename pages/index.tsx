import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type Chat = {
  message: string;
  sender: boolean;
  id: string;
};

const Home: NextPage = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  function addChat(chat: Chat) {
    setLoading(true);
    setChatHistory([chat, ...chatHistory]);
    setLoading(false);
  }

  function initializeGame() {
    setLoading(true);
    addChat({
      message: "welcome to your campaign",
      sender: false,
      id: "1",
    });
    setLoading(false);
  }

  function resetGame() {
    setLoading(true);
    localStorage.removeItem("campaignChatHistory");
    setChatHistory([]);
    setLoading(false);
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
              {chatHistory.map((chat) => (
                <article
                  className={
                    chat.sender ? styles.chatMessageTo : styles.chatMessageFrom
                  }
                  key={chat.id}
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
            addChat({
              message: input,
              sender: true,
              id: "2",
            });
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
            className={chatHistory.length > 0 ? styles.end : styles.start}
            onClick={chatHistory.length > 0 ? resetGame : initializeGame}
          >
            {chatHistory.length > 0 ? "End Game" : "Start Game"}
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
