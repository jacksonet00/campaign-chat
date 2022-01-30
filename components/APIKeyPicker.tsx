import { NextPage } from "next";
import { Head } from "next/document";
import { useState } from "react";
import { set } from "../data/apiKeySlice";
import { useAppDispatch } from "../data/store";
import styles from "../styles/Home.module.css";

const APIKeyPicker: NextPage = () => {
  const [key, setKey] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className={styles.picker}>
      <h1>Play Campaign Chat</h1>
      <a href="https://beta.openai.com/account/api-keys" target="_blank">
        1. Navigate to OpenAI
      </a>
      <p>2. Login, click profile {">"} API Keys, and copy your API key.</p>
      <p>3. Submit your key</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(set(key));
          localStorage.setItem("openai-key", key);
        }}
      >
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default APIKeyPicker;
