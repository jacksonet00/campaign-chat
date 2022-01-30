import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";

const ActivityIndicator: NextPage = () => {
  return (
    <div className={styles.center}>
      <CircularProgress />
    </div>
  );
};

export default ActivityIndicator;
