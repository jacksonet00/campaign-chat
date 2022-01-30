import { NextPage } from "next";
import { useAppSelector } from "../data/store";
import styles from "../styles/Home.module.css";

const Chats: NextPage = () => {
  const { chats } = useAppSelector((state) => state.chatHistory);

  function _getChatClassName(sender: boolean) {
    if (sender) {
      return styles.chatMessageTo;
    } else {
      return styles.chatMessageFrom;
    }
  }

  return (
    <>
      {chats.length > 3 &&
        chats.slice(0, chats.length - 3).map((chat) => (
          <article className={_getChatClassName(chat.sender)} key={chat.id}>
            <p>{chat.message}</p>
          </article>
        ))}
    </>
  );
};

export default Chats;
