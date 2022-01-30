import type { NextPage } from "next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../data/store";
import { set } from "../data/apiKeySlice";
import APIKeyPicker from "../components/APIKeyPicker";
import Game from "../components/Game";

const Root: NextPage = () => {
  const { apiKey } = useAppSelector((state) => state.apiKey);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const persistedApiKey = localStorage.getItem("openai-key");
    if (persistedApiKey) {
      dispatch(set(persistedApiKey));
    }
  }, [dispatch]);

  if (!apiKey) {
    return <APIKeyPicker />;
  } else {
    return <Game />;
  }
};

export default Root;
