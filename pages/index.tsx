import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Campaign Chat</title>
        <meta
          name="description"
          content="A chat based medieval roleplaying game."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Campaign Chat</h1>
        <section className={styles.chatBox}>
          <article className={styles.chat}>
            <p className={styles.chatMessage}>chat message</p>
          </article>
        </section>
      </main>
      <footer className={styles.footer}>
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
      </footer>
    </div>
  );
};

export default Home;
