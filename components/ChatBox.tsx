import { NextPage } from "next";
import ActivityIndicator from "./ActivityIndicator";
import Chats from "./Chats";
import styles from "../styles/Home.module.css";

const ChatBox: NextPage<{ loading: boolean }> = ({ loading }) => {
  return (
    <section className={styles.chatBox}>
      {loading ? <ActivityIndicator /> : <Chats />}
    </section>
  );
};

export default ChatBox;
