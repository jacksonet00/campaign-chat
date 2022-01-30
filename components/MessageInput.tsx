import { NextPage } from "next";
import styles from "../styles/Home.module.css";

const MessageInput: NextPage<{
  value: string;
  onChange: (arg: string) => void;
  onSubmit: () => void;
}> = ({ value, onChange, onSubmit }) => {
  return (
    <section className={styles.inputContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          placeholder="..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input type="submit" />
      </form>
    </section>
  );
};

export default MessageInput;
